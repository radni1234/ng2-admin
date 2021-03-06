import {Component, OnInit, ViewEncapsulation, EventEmitter} from "@angular/core";

import {FormGroup, FormBuilder, FormArray, Validators, FormControl} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {Marker} from "ng2-map";

import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {CrudService} from "../../../services/crud.service";
import {DatumService} from "../../../services/datum.service";
import {Objekat, Mesto, Opstina, Grupa, Podgrupa, NacinFinansiranja} from "./objekatdata";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {Racun, Brojilo, MesecLista, RnStavke, BrojiloTip, RezimMerenja} from "../racuni/racundata";
import {Energent} from "../../../admin/components/energent/energentdata";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {BrojiloVrsta} from "../../../admin/components/brojilo_vrsta/brojilo_vrstadata";
import {PregledRacunaComponent} from "../pregled_racuna/pregled_racuna.component";
import {DomSanitizer} from '@angular/platform-browser';
import {TranslateService, LangChangeEvent} from "ng2-translate";
import {ObjekatDokumentComponent} from "../objekat_dokument/objekat_dokument.component";

@Component({
  selector: 'isem-objekti',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'objekti.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class ObjektiComponent implements OnInit{
  private dataService: CompleterData;
  private dataServiceMesta: CompleterData;

  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild(PregledRacunaComponent) pregledRacuna: PregledRacunaComponent;
  @ViewChild(ObjekatDokumentComponent) objekatDokument: ObjekatDokumentComponent;


  @ViewChild(Marker) marker: Marker;
  markeri: Marker[];
  objekti: Objekat[];
  private mesta: Mesto[];
  private mesto: Mesto;
  private opstina: Opstina;
  private opstine: Opstina[];
  private grupe: Grupa[];
  private grupa: Grupa;
  private podgrupa: Podgrupa;
  private nacinFinansiranja: NacinFinansiranja;
  private grupaID: number;
  private podgrupaID: number;
  podgrupe: Podgrupa[] = new Array<Podgrupa>();
  private naciniFinansiranja: NacinFinansiranja[];
  selectedMesto: string;
  selectedOpstina: string;
  selektovanaOpstina: Opstina;
  selektovanaGrupa: Grupa;
  objekat: Objekat = new Objekat();
  loaded: boolean = false;
  loadedForm: boolean = false;
  mapaUkljucena = false;
  izbor: boolean = false;
  nazivObjekta: string = "PPPPPPP";
  myForm: FormGroup;
  public isMestaLoaded:boolean = false;
  public isObjekatLoaded:boolean = false;
  public isOpstineLoaded:boolean = false;
  public isGrupeLoaded: boolean = false;
  public isPodgrupeLoaded: boolean = false;
  public isNaciniFinansiranjaLoaded: boolean = false;
  public dozvoliPrikazPodgrupa: boolean = false;
  public IDObjektaBrisanje: number;
  public temperatura: any;
  public celzijus: number;
  errorMessage:string;
  proveraUloga: boolean = false;

  source: LocalDataSource = new LocalDataSource();

  settings = {};

  settingsAdmin = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>'
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>'
    },
    mode: 'external',
    actions: {
      columnTitle: ''
    },
    noDataMessage: 'Podaci nisu pronađeni',
    columns: {
      naziv: {
        title: 'Naziv',
        type: 'string'
      },
      opstina: {
        title: 'Opstina',
        type: 'string'
      },
      mesto: {
        title: 'Mesto',
        type: 'string'
      },
      grupa: {
        title: 'Grupa',
        type: 'string'
      },
      podgrupa: {
        title: 'Podgrupa',
        type: 'string'
      },
      nacinFinansiranja: {
        title: 'Finansiranje',
        type: 'string'
      }

    }
  };

  settingsKorisnik = {
    add: {
      addButtonContent: ''
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>'
    },
    delete: {
      deleteButtonContent: ''
    },
    mode: 'external',
    actions: {
      columnTitle: ''
    },
    noDataMessage: 'Podaci nisu pronađeni',
    columns: {
      naziv: {
        title: 'Naziv',
        type: 'string'
      },
      opstina: {
        title: 'Opstina',
        type: 'string'
      },
      mesto: {
        title: 'Mesto',
        type: 'string'
      },
      grupa: {
        title: 'Grupa',
        type: 'string'
      },
      podgrupa: {
        title: 'Podgrupa',
        type: 'string'
      },
      nacinFinansiranja: {
        title: 'Finansiranje',
        type: 'string'
      }

    }
  };

  isGrejanje: boolean = true;
  isRasveta: boolean = false;
  isHladjenje: boolean = false;

  slika: any;

  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService,
              private ds: DatumService, private router: Router, public sanitizer: DomSanitizer, private translate: TranslateService){



    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      adresa: [''],
      mesto: [''],
      opstina: [''],
      grupa: [''],
      podgrupa: [''],
      nacinFinansiranja: [''],
      godIzgr: [''],
      lon: [''],
      lat: [''],
      opBrEtaza: [''],
      opBrRdNed: [''],
      opBrRdGod: [''],
      opPbrRsDan: [''],
      opBrNrdZima: [''],
      opBrNrdLeto: [''],
      opBrStalnoZap: [''],
      opBrKor: [''],
      projektanFirma: [''],
      izvodjacIzg: [''],
      godRekon: [''],
      izvodjacRekon: [''],
      tipRek: [''],
      koIme: [''],
      koPrezime: [''],
      koZanimanje: [''],
      koTel: [''],
      koFaks: [''],
      koMob: [''],
      koMail: [''],
      grejUkSnaga: [''],
      grejUkSnagaTela: [''],
      elSnagaGrejalica: [''],
      grejOpis: [''],
      grejZa: [''],
      grejPoKorisna: [''],
      hlaOpis: [''],
      hlaPo: [''],
      hlaZa: [''],
      hlaUkSnaga: [''],
      toplOpis: [''],
      toplTemp: [''],
      toplUkSnaga: [''],
      ventOpis: [''],
      ventZa: [''],
      ventUkSnaga: [''],
      elOpis: [''],
      elSnagaPotrosaca: [''],
      elSnagaRasveta: [''],
      vodaOpis: [''],
      version: ['']
    });

    // this.myFormRn1 = this.fb.group({
    //   id: [''],
    //   objekat: [''],
    //   brojilo: [''],
    //   version: [''],
    //   energent: [''],
    //   godina: [''],
    //   mesec: [''],
    //   dobavljac: [''],
    //   rnTip: [''],
    //   brojRn: [''],
    //   datumr: [''],
    //   napomena: [''],
    // });
    //
    // this.myFormRn2 = this.fb.group({
    //   polja: fb.array([
    //   ])
    // });

    // this.myFormBrojilo = this.fb.group({
    //   id: [''],
    //   naziv: [''],
    //   opis: [''],
    //   brojiloTip: [''],
    //   brojiloVrsta: [''],
    //   objekat: [''],
    //   rezimMerenja: [''],
    //   vodeceBrojilo: [''],
    //   procenat: [''],
    //   obracunskiPeriod: [''],
    //   automatski: [''],
    //   version: ['']
    // });

  }



  getDataTab() {
    this.crudService.getData("objekat/tab").subscribe(
      data => {
        this.source.load(data);
        console.log(data);
        this.objekti = data;
        for(var item of this.objekti){
          if(item.lon==null){
            item.lon = 19;
          }
          if(item.lat==null){
            item.lat = 45;
          }
        }
        console.log(this.objekti);

      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onPrikaziTemperaturu(){

    console.log("TEMPERATURAAAAAAAAAAAAAAAAAAAAAAA");

    this.crudService.getDataTemp()
      .subscribe(
        data => {
          this.temperatura = data;
          this.celzijus = this.temperatura.Tspv.value;
          console.log(this.temperatura);
        },
        error => {console.log(error); }
      );


  }

  napuniMesta (id: number){

    this.crudService.getData("mesto/sve?ops_id=" + id)
      .subscribe(
        listaMesta => {
          this.mesta = listaMesta;
          console.log(this.mesta);
          this.dataServiceMesta = this.completerService.local(this.mesta, 'naziv', 'naziv');
          this.isMestaLoaded = true;
        },
        error => {console.log(error); this.router.navigate(['/login']);}
      );
  }

  public onOpstinaSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      console.log(selected.originalObject.id);
      this.napuniMesta(selected.originalObject.id);
      this.selektovanaOpstina=selected.originalObject;
      this.selectedMesto = "Biraj mesto";
      console.log(this.objekat);
    }
  }
  public onMestoSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      this.objekat.mesto=selected.originalObject;
      this.objekat.mesto.opstina=this.selektovanaOpstina;
      console.log(this.objekat);
    }
  }
  public onGrupaSelected(selectedId: number){
    console.log("ID selektovane grupe je: " + selectedId);
    //this.isPodgrupeLoaded = false;

    while(this.podgrupe.length > 0) {
      this.podgrupe.pop();
    }
    if(this.isGrupeLoaded) {
      for (var item of this.grupe) {

        console.log("ID grupe je: " + item.id + " a njen naziv :" + item.naziv);
        if (item.id == selectedId) {
//          console.log("Selektovana grupa"+item.naziv);
          console.log("POZIV U ON GRUPA SELECTED");
          this.napuniPodgrupe(item.id);
          this.selektovanaGrupa = item;
          this.objekat.podgrupa.grupa = item;
//          console.log("Upisana grupa"+this.objekat.podgrupa.grupa.naziv);
        }
      }
    }
  }

  public onPodgrupaSelected(selectedId: number){
    console.log(selectedId);
    if(this.isPodgrupeLoaded) {
      for (var item of this.podgrupe) {

        if (item.id == selectedId) {

          console.log("Selektovana podgrupa"+item.naziv);
          this.objekat.podgrupa = item;
          console.log("Upisana podgrupa"+this.objekat.podgrupa.naziv);
          console.log("Upisana grupa"+this.objekat.podgrupa.grupa.naziv);
        }
      }
    }
  }
  onNacinFinansiranjaSelected(selectedId: number){
    console.log(selectedId);
    if(this.isNaciniFinansiranjaLoaded) {
      for (var item of this.naciniFinansiranja) {
        if (item.id == selectedId) {
          console.log("Selektovani nacin finansiranja"+item.naziv);
          this.objekat.nacinFinansiranja = item;
          console.log("Upisan nacin finansiranja"+this.objekat.nacinFinansiranja.naziv);
        }
      }
    }
  }
  napuniNacinFinansiranja(){
    this.crudService.getData("nac_fin/sve").subscribe(
      data => {
        this.naciniFinansiranja = data;
        console.log(data);
        this.isNaciniFinansiranjaLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }
  napuniGrupe() {
    this.crudService.getData("grupa/sve").subscribe(
      data => {
        this.grupe = data;
        console.log("UCITANE GRUPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        console.log(this.grupe);
        this.isGrupeLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  napuniPodgrupe (id: number){

    this.crudService.getData("podgrupa/sve?gru_id="+id)
      .subscribe(
        data => {
          this.podgrupe = data;
          console.log("UCITANE PODGRUPEEEEEEEEEEEEEEEEEEEEEEEEEEE");
          console.log(this.podgrupe);
          this.isPodgrupeLoaded = true;
        },
        error => {console.log(error); this.router.navigate(['/login']);});
  }


  prikazi_formu($event, id){
    console.log("ID OBJEKTA JE: " + id);
    this.crudService.getSingle('objekat/jedan?id=' + id)
      .subscribe(
        data => {
          console.log(data);
          this.objekat = data;
          this.loadedForm = true;
          this.izbor = true;
        },
        error => {console.log(error); this.router.navigate(['/login']);}
      );
}
  // prikazi_modal($event, id){
  //   console.log("ID OBJEKTA JE: " + id);
  //   this.crudService.getSingle("objekat", id)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.objekat = data;
  //         this.nazivObjekta = this.objekat.naziv;
  //
  //         console.log("NAZIV OBJEKTA : " + this.nazivObjekta);
  //         this.showChildModal();
  //       },
  //       error => console.log(error)
  //     );
  // }

  onDelete(event){
    this.IDObjektaBrisanje = event.data.id;
    console.log(event.data.username);
    this.showChildModal();

  }

  brisiKorisnika(){
    //brisi korisnika
    this.loadedForm = false;
    this.crudService.delete("objekat",this.IDObjektaBrisanje)
      .subscribe(
        data => {
          console.log("USAO U BRISANJE KORISNIKA");
          console.log(data);
          this.crudService.getData("objekat/tab")
            .subscribe(
              listaObjekata => {
                this.source.load(listaObjekata);
                console.log(listaObjekata);
                this.objekti = listaObjekata;
                for(var item of this.objekti){
                  if(item.lon==null){
                    item.lon = 19;
                  }
                  if(item.lat==null){
                    item.lat = 45;
                  }
                }
                console.log(this.objekti);
                this.loadedForm = true;
              },
              error => {console.log(error); this.router.navigate(['/login']);});

        },
        error => {console.log(error); this.router.navigate(['/login']);}
      );

    //azuriraj listu korisnika

    this.hideChildModal();
  }

  onCreate(): void{
    this.selektovanaOpstina = new Opstina();
    this.selektovanaOpstina.naziv = "Ada";
    this.opstina = new Opstina();
    this.opstina.naziv = "Ada";
    this.mesto = new Mesto();
    this.mesto.naziv = "Ada";

    this.mesto.opstina = this.opstina;

    this.grupa = new Grupa();
    this.podgrupa = new Podgrupa();
    this.podgrupa.grupa = this.grupa;


    this.nacinFinansiranja = new NacinFinansiranja();
    this.nacinFinansiranja = this.naciniFinansiranja[0];

    this.objekat = new Objekat();

    this.objekat.podgrupa = this.podgrupa;
    this.objekat.mesto = this.mesto;
    this.objekat.nacinFinansiranja = this.nacinFinansiranja;
    this.objekat.lat = 45;
    this.objekat.lon = 45;

    this.isObjekatLoaded = true;
    this.loadedForm = true;
    console.log(this.objekat);

    this.source.setFilter([{ field: 'naziv', search: '' },{ field: 'mesto', search: '' }]);
    this.izbor = true;
  }

  onEdit(id): void{
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    this.loadedForm = false;
    this.crudService.getSingle('objekat/jedan?id=' + id)
      .subscribe(
        data => {
          console.log(data);
          this.objekat = new Objekat();
          this.objekat = data;
          this.grupaID = this.objekat.podgrupa.grupa.id;
          this.podgrupaID = this.objekat.podgrupa.id;
          this.selektovanaOpstina = this.objekat.mesto.opstina;
          this.selektovanaGrupa = this.objekat.podgrupa.grupa;
          this.napuniMesta(this.objekat.mesto.opstina.id);
          console.log("POZIV U GET SINGLE");
          this.napuniPodgrupe(this.objekat.podgrupa.grupa.id);
          this.isObjekatLoaded = true;
          this.loadedForm = true;
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          console.log(this.objekat);
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          console.log(this.mesta);
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          console.log(this.podgrupe);
          // this.selectedMesto = this.dobavljac.mesto.naziv;

          if (this.objekat.slikaNaziv){
            this.onUcitajSliku();
          } else {
            this.onUcitajSlikuDefault();
          }

        },
        error => {console.log(error); this.router.navigate(['/login']);}
      );


    //this.energentTipId = this.dobavljac.energentTip.id;
    //this.jedinicaMereId = this.dobavljac.jedMere.id;
    this.izbor = true;
    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onUcitajSliku(): void {
    this.crudService.getSlika('upload/files/slika/' + this.objekat.slikaNaziv)
      .subscribe(
        data => {
          this.createImageFromBlob(data);
        },
        error => {
          console.log(error);
        }
      );
    }

  onUcitajSlikuDefault(): void {
    this.crudService.getSlika('upload/files/slika/objekat.jpg')
      .subscribe(
        data => {
          this.createImageFromBlob(data);
        },
        error => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.slika = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onSubmit() {

    console.log(this.objekat);

    this.crudService.sendData("objekat", this.objekat)
      .subscribe(
        data => {
          console.log(data);
          this.getDataTab();
        },
        error => {console.log(error); this.router.navigate(['/login']);}
      );

    this.izbor = false;
    this.objekat = null;
  }

  onCancel() {
    this.getDataTab();
    this.izbor = false;
    this.objekat = null;
  }

  ngOnInit(){
    this.proveraUloga = (JSON.parse(localStorage.getItem('currentUser')).uloga === 'Manager' || JSON.parse(localStorage.getItem('currentUser')).uloga === 'Admin');
    this.settingsAdmin.columns.naziv.title = this.translate.instant('general.name');
    this.settingsKorisnik.columns.naziv.title = this.translate.instant('general.name');
    this.settingsAdmin.columns.opstina.title = this.translate.instant('general.municipality');
    this.settingsKorisnik.columns.opstina.title = this.translate.instant('general.municipality');
    this.settingsAdmin.columns.mesto.title = this.translate.instant('general.place');
    this.settingsKorisnik.columns.mesto.title = this.translate.instant('general.place');
    this.settingsAdmin.columns.grupa.title = this.translate.instant('general.group');
    this.settingsKorisnik.columns.grupa.title = this.translate.instant('general.group');
    this.settingsAdmin.columns.podgrupa.title = this.translate.instant('general.subgroup');
    this.settingsKorisnik.columns.podgrupa.title = this.translate.instant('general.subgroup');
    this.settingsAdmin.columns.nacinFinansiranja.title = this.translate.instant('general.financing');
    this.settingsKorisnik.columns.nacinFinansiranja.title = this.translate.instant('general.financing');
    if(this.proveraUloga){
      this.settings = Object.assign({}, this.settingsAdmin);
    } else {
      this.settings = Object.assign({}, this.settingsKorisnik);
    }
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.settingsAdmin.columns.naziv.title = this.translate.instant('general.name');
      this.settingsAdmin.columns.opstina.title = this.translate.instant('general.municipality');
      this.settingsAdmin.columns.mesto.title = this.translate.instant('general.place');
      this.settingsAdmin.columns.grupa.title = this.translate.instant('general.group');
      this.settingsAdmin.columns.podgrupa.title = this.translate.instant('general.subgroup');
      this.settingsAdmin.columns.nacinFinansiranja.title = this.translate.instant('general.financing');
      this.settings = Object.assign({}, this.settingsAdmin);
    });


    this.getDataTab();

    this.napuniGrupe();

    this.napuniNacinFinansiranja();

    this.crudService.getData("opstina/sve")
      .subscribe(
        listaOpstina => {
          this.opstine = listaOpstina;
          console.log(this.opstine);
          this.dataService = this.completerService.local(this.opstine, 'naziv', 'naziv');
          this.isOpstineLoaded = true;
        },
        error => {console.log(error); this.router.navigate(['/login']);});

  }
  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  onTabRacuniSelect(){
    this.pregledRacuna.getBrojila(this.objekat.id);
  }

  // ngAfterViewInit(){
  //   this.onTabRacuniSelect();
  // }

  // --------------------- B R O J I L A ---------------------------- //

  // @ViewChild('childModalBrojilo') childModalBrojilo: ModalDirective;
  // sourceBrojila: LocalDataSource = new LocalDataSource();
  //
  // brojilo: Brojilo;
  //
  // brojiloVrstaSve: BrojiloVrsta[];
  // brojiloVrstaId: number;
  // isBrojiloVrstaLoaded: boolean = false;
  //
  // brojiloTipSve: BrojiloTip[];
  // brojiloTipId: number;
  // isBrojiloTipLoaded: boolean = false;
  //
  // rezimMerenjaSve: RezimMerenja[];
  // rezimMerenjaId: number;
  // isRezimMerenjaLoaded: boolean = false;
  //
  // brojiloVodeceSve: Brojilo[];
  // brojiloVodeceId: number;
  // isBrojiloVodeceLoaded: boolean = false;
  //
  // brisanjeBrojiloId: number;
  //
  // prikaziBrojiloUnos: boolean = false;
  //
  // myFormBrojilo: FormGroup;
  //
  // // objIzbor: number[] = []; // Default selection
  //
  // settings_brojila = {
  //   add: {
  //     addButtonContent: '<i class="ion-ios-plus-outline"></i>'
  //   },
  //   edit: {
  //     editButtonContent: '<i class="ion-edit"></i>'
  //   },
  //   delete: {
  //     deleteButtonContent: '<i class="ion-trash-a"></i>'
  //   },
  //   mode: 'external',
  //   actions: {
  //     columnTitle: ''
  //   },
  //   noDataMessage: 'Podaci nisu pronađeni',
  //   columns: {
  //     sifra_brojila: {
  //       title: 'Naziv brojila',
  //       type: 'string'
  //     },
  //     opis: {
  //       title: 'Opis',
  //       type: 'string'
  //     },
  //     brojilo_vrsta: {
  //       title: 'Vrsta brojila',
  //       type: 'string'
  //     },
  //     brojilo_tip: {
  //       title: 'Tip brojila',
  //       type: 'string'
  //     },
  //     rezim_merenja: {
  //       title: 'Režim merenja',
  //       type: 'string'
  //     },
  //     vodece_brojilo: {
  //       title: 'Vodeće brojilo',
  //       type: 'string'
  //     },
  //     procenat: {
  //       title: 'Procenat',
  //       type: 'string'
  //     }
  //
  //   }
  // };
  //
  // getDataBrojila() {
  //   this.crudService.getData("brojilo/tab?obj_id="+this.objekat.id).subscribe(
  //     data => {
  //       this.sourceBrojila.load(data);
  //     },
  //     error => {console.log(error); this.router.navigate(['/login']);}
  //   );
  // }
  //
  // getDataBrojiloVrsta() {
  //   this.crudService.getData("brojilo_vrsta/sve").subscribe(
  //     data => {
  //       this.brojiloVrstaSve = data;
  //       this.isBrojiloVrstaLoaded = true;
  //     },
  //     error => {console.log(error); this.router.navigate(['/login']);}
  //   );
  // }
  //
  // getDataBrojiloTip() {
  //   this.crudService.getData("brojilo_tip/sve").subscribe(
  //     data => {
  //       this.brojiloTipSve = data;
  //       this.isBrojiloTipLoaded = true;
  //     },
  //     error => {console.log(error); this.router.navigate(['/login']);}
  //   );
  // }
  //
  // onBrojiloTipSelected(brojiloTip) {
  //   if (brojiloTip != 3) {
  //     this.brojilo.procenat = null;
  //     this.brojiloVodeceId = null;
  //   }
  // }
  //
  // getDataRezimMerenja() {
  //   this.crudService.getData("rezim_merenja/sve").subscribe(
  //     data => {
  //       this.rezimMerenjaSve = data;
  //       this.isRezimMerenjaLoaded = true;
  //     },
  //     error => {console.log(error); this.router.navigate(['/login']);}
  //   );
  // }
  //
  // getDataBrojiloVodece(obj_id: number) {
  //   this.crudService.getData("brojilo/sve?obj_id="+obj_id).subscribe(
  //     data => {
  //       this.brojiloVodeceSve = data;
  //       this.isBrojiloVodeceLoaded = true;
  //     },
  //     error => {console.log(error); this.router.navigate(['/login']);}
  //   );
  // }
  //
  // onCreateBrojilo() {
  //   this.crudService.getData("brojilo_vrsta/sve").subscribe(
  //     data => {
  //       this.brojiloVrstaSve = data;
  //       this.isBrojiloVrstaLoaded = true;
  //       this.brojiloVrstaId = this.brojiloVrstaSve[0].id;
  //     },
  //     error => {console.log(error); this.router.navigate(['/login']);}
  //   );
  //
  //   this.crudService.getData("brojilo_tip/sve").subscribe(
  //     data => {
  //       this.brojiloTipSve = data;
  //       this.isBrojiloTipLoaded = true;
  //       this.brojiloTipId = this.brojiloTipSve[0].id;
  //     },
  //     error => {console.log(error); this.router.navigate(['/login']);}
  //   );
  //
  //   this.getDataRezimMerenja();
  //   // this.getDataBrojiloVodece();
  //
  //   this.brojilo = new Brojilo();
  //   this.brojilo.objekat = this.objekat;
  //   this.rezimMerenjaId = null;
  //   this.brojiloVodeceId = null;
  //
  //   this.prikaziBrojiloUnos = true;
  //
  // }
  //
  // onEditBrojilo(event){
  //   this.brojilo = new Brojilo();
  //
  //   this.getDataBrojiloVrsta();
  //   this.getDataBrojiloTip();
  //   this.getDataRezimMerenja();
  //   // this.getDataBrojiloVodece();
  //
  //   this.crudService.getSingle("brojilo/jedan?id="+event.data.id).subscribe(
  //     data => {this.brojilo = data;
  //       console.log(data);
  //       this.prikaziBrojiloUnos = true;
  //
  //       if (!this.brojilo.brojiloTip){
  //         this.brojiloTipId = null;
  //       } else {
  //         this.brojiloTipId = this.brojilo.brojiloTip.id;
  //       }
  //
  //       if (!this.brojilo.brojiloVrsta){
  //         this.brojiloVrstaId = null;
  //       } else {
  //         this.brojiloVrstaId = this.brojilo.brojiloVrsta.id;
  //       }
  //
  //       if (!this.brojilo.rezimMerenja){
  //         this.rezimMerenjaId = null;
  //       } else {
  //         this.rezimMerenjaId = this.brojilo.rezimMerenja.id;
  //       }
  //
  //       if (!this.brojilo.vodeceBrojilo){
  //         this.brojiloVodeceId = null;
  //       } else {
  //         this.brojiloVodeceId = this.brojilo.vodeceBrojilo.id;
  //       }
  //     },
  //     error => {console.log(error); });
  //
  //   // this.source.setFilter([{ field: 'naziv', search: '' }]);
  //   // this.brisiFilterRacuni();
  // }
  //
  // onSubmitBrojilo() {
  //   if (String(this.brojiloTipId) == "0: null") {
  //     this.brojilo.brojiloTip = null;
  //   } else {
  //     for (let item of this.brojiloTipSve) {
  //       if (item.id == this.brojiloTipId) {
  //         this.brojilo.brojiloTip = item;
  //       }
  //     }
  //   }
  //
  //   if (String(this.brojiloVrstaId) == "0: null") {
  //     this.brojilo.brojiloVrsta = null;
  //   } else {
  //     for (let item of this.brojiloVrstaSve) {
  //       if (item.id == this.brojiloVrstaId) {
  //         this.brojilo.brojiloVrsta = item;
  //       }
  //     }
  //   }
  //
  //   if (String(this.rezimMerenjaId) == "0: null") {
  //     this.brojilo.rezimMerenja = null;
  //   } else {
  //     for (let item of this.rezimMerenjaSve) {
  //       if (item.id == this.rezimMerenjaId) {
  //         this.brojilo.rezimMerenja = item;
  //       }
  //     }
  //   }
  //
  //   this.crudService.sendData("brojilo", this.brojilo)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.getDataBrojila();
  //       },
  //       error => console.log(error)
  //     );
  //
  //
  //   this.prikaziBrojiloUnos = false;
  //
  //   this.brojilo = null;
  // }
  //
  // onCancelBrojilo() {
  //   this.brojilo = null;
  //   this.prikaziBrojiloUnos = false;
  // }
  //
  // onDeleteBrojilo(event){
  //   this.brisanjeBrojiloId = event.data.id;
  //   this.showChildModalBrojilo();
  // }
  //
  // onDeleteConfirmBrojilo() {
  //   this.crudService.delete("brojilo", this.brisanjeBrojiloId)
  //     .subscribe(
  //       data => {console.log(data); this.getDataBrojila();},
  //       error => {console.log(error); this.router.navigate(['/login']);}
  //     );
  //
  //   this.hideChildModalBrojilo();
  // }
  //
  //
  //
  // showChildModalBrojilo(): void {
  //   this.childModalBrojilo.show();
  // }
  //
  // hideChildModalBrojilo(): void {
  //   this.childModalBrojilo.hide();
  // }

  // --------------------- R A C U N I ---------------------------- //

  // @ViewChild('childModalRn') childModalRn: ModalDirective;
  // sourceRacuni: LocalDataSource = new LocalDataSource();
  // brisanjeRnId: number;
  //
  // settings_racuni = {
  //   add: {
  //     addButtonContent: '<i class="ion-ios-plus-outline"></i>'
  //   },
  //   edit: {
  //     editButtonContent: '<i class="ion-edit"></i>'
  //   },
  //   delete: {
  //     deleteButtonContent: '<i class="ion-trash-a"></i>'
  //   },
  //   mode: 'external',
  //   actions: {
  //     columnTitle: ''
  //   },
  //   noDataMessage: 'Podaci nisu pronađeni',
  //   columns: {
  //     brojilo: {
  //       title: 'Brojilo',
  //       type: 'string'
  //     },
  //     godina: {
  //       title: 'Godina',
  //       type: 'string'
  //     },
  //     mesec: {
  //       title: 'Mesec',
  //       type: 'string'
  //     },
  //     brojRn: {
  //       title: 'Broj računa',
  //       type: 'string'
  //     },
  //     datumr: {
  //       title: 'Datum',
  //       type: 'string'
  //     },
  //     uneo: {
  //       title: 'Uneo',
  //       type: 'string'
  //     },
  //     datumu: {
  //       title: 'Datum unosa',
  //       type: 'string'
  //     }
  //
  //   }
  // };
  //
  // brisiFilterRacuni(){
  //   this.sourceRacuni.setFilter([{ field: 'brojilo', search: '' }]);
  //   this.sourceRacuni.setFilter([{ field: 'godina', search: '' }]);
  //   this.sourceRacuni.setFilter([{ field: 'mesec', search: '' }]);
  //   this.sourceRacuni.setFilter([{ field: 'brojRn', search: '' }]);
  //   this.sourceRacuni.setFilter([{ field: 'datumr', search: '' }]);
  //   this.sourceRacuni.setFilter([{ field: 'uneo', search: '' }]);
  //   this.sourceRacuni.setFilter([{ field: 'datumu', search: '' }]);
  // }
  //
  // getDataRacuni() {
  //   this.crudService.getData("rn/tab?obj_id="+this.objekat.id).subscribe(
  //     data => {
  //         this.sourceRacuni.load(data);
  //       },
  //     error => {console.log(error); this.router.navigate(['/login']);}
  //   );
  // }
  //
  // onDeleteRacuni(event){
  //   this.brisanjeRnId = event.data.id
  //   this.showChildModalRn();
  // }
  //
  // onDeleteConfirmRacuni() {
  //   this.crudService.delete("rn", this.brisanjeRnId)
  //     .subscribe(
  //       data => {console.log(data); this.getDataRacuni();},
  //       error => {console.log(error); this.router.navigate(['/login']);}
  //     );
  //
  //   this.hideChildModalRn();
  //   //this.brisiFilterRacuni();
  // }
  //
  // onEditRacuni(event){
  //   this.formirajRn(event.data.id);
  //   this.brisiFilterRacuni();
  // }
  //
  // showChildModalRn(): void {
  //   this.childModalRn.show();
  // }
  //
  // hideChildModalRn(): void {
  //   this.childModalRn.hide();
  // }
  //
  // // --------------------- R A C U N ---------------------------- //
  //
  // myFormRn1: FormGroup;
  // myFormRn2: FormGroup;
  //
  // prikaziRn: boolean = false;
  // prikaziBrojilo: boolean = false;
  // noviRn: boolean = false;
  // popunjenaPolja: boolean = false;
  //
  // rn: Racun = new Racun();
  // rnStavke: Array<RnStavke> = new Array<RnStavke>();
  //
  // godine: number [] = new Array <number>();
  // godina: number;
  // brojGodinaUMeniju: number = 10;
  //
  // mesec: MesecLista = new MesecLista();
  // meseci: Array<any> = [ {"id":0, "naz":"Januar"},
  //                       {"id":1, "naz":"Februar"},
  //                       {"id":2, "naz":"Mart"},
  //                       {"id":3, "naz":"April"},
  //                       {"id":4, "naz":"Maj"},
  //                       {"id":5, "naz":"Jun"},
  //                       {"id":6, "naz":"Jul"},
  //                       {"id":7, "naz":"Avgust"},
  //                       {"id":8, "naz":"Septembar"},
  //                       {"id":9, "naz":"Oktobar"},
  //                       {"id":10, "naz":"Novembar"},
  //                       {"id":11, "naz":"Decembar"}
  //                      ];
  //
  //
  //
  // datumRacuna: Date = new Date();
  //
  // brojila: Brojilo[];
  // isBrojilaLoaded: boolean = false;
  // energenti: Energent[];
  //
  // broVrsKol: Array<any>;
  // vrednosti: Array<any> = new Array<any>();
  //
  // nazivKolone: Array<String> = new Array<String>();
  //
  // formirajRn(id:number){
  //   this.proveraRn = 0;
  //   this.rn = new Racun();
  //
  //   this.crudService.getSingle("rn/jedan?id=" + id)
  //     .subscribe(
  //       data => {
  //         this.rn = data;
  //
  //         this.crudService.getData("bro_vrs_kol/sve?bro_vrs_id="+this.rn.brojilo.brojiloVrsta.id).subscribe(
  //           data => {
  //
  //             this.broVrsKol = data;
  //
  //             this.nazivKolone = new Array<String>();
  //
  //             const arrayControl = <FormArray>this.myFormRn2.controls['polja'];
  //
  //             for (var k = (<FormArray>this.myFormRn2.controls['polja']).length; k > 0; k--){
  //               arrayControl.removeAt(k-1);
  //             }
  //
  //             // console.log(this.broVrsKol);
  //             // console.log(this.rn.rnStavke);
  //
  //             for(var j = 0; j < this.broVrsKol.length; j++) {
  //               for (var i = 0; i < this.rn.rnStavke.length; i++) {
  //                 if(this.rn.rnStavke[i].brojiloVrstaKolone.id == this.broVrsKol[j].id) {
  //
  //                   (<FormArray>this.myFormRn2.controls['polja']).push(new FormControl(this.rn.rnStavke[i].vrednost, Validators.required));
  //                   this.nazivKolone.push(this.broVrsKol[j].opis);
  //                 }
  //               }
  //             }
  //
  //             // odredjivanje god i mes na osnovu datumar
  //             this.datumRacuna = this.ds.toDate(this.rn.datumr);
  //             this.popuniGodinaMesec(this.datumRacuna);
  //             this.popunjenaPolja = true;
  //
  //           },
  //           error => {console.log(error); this.router.navigate(['/login']);}
  //         );
  //       },
  //       error => {console.log(error); this.router.navigate(['/login']);}
  //     );
  //
  //   this.noviRn = false;
  //   this.prikaziRn = true;
  //   this.prikaziBrojilo = false;
  // }
  //
  // onCreateNoviRn(){
  //   this.proveraRn = 0;
  //   this.popunjenaPolja = false;
  //   this.rn = new Racun();
  //
  //   this.getBrojila(this.objekat.id);
  //
  //   this.popuniGodinaMesec(new Date());
  //
  //   this.noviRn = true;
  //   this.prikaziRn = true;
  //   this.prikaziBrojilo = true;
  //
  //   this.brisiFilterRacuni();
  // }
  //
  //
  // onSubmitRn(event) {
  //   this.vrednosti = ((<FormArray>this.myFormRn2.controls['polja']).getRawValue());
  //
  //   console.log(this.vrednosti);
  //
  //   this.rnStavke = new Array<RnStavke>();
  //
  //   if(this.noviRn){
  //     for(var i = 0; i < this.broVrsKol.length; i++) {
  //       var rnStav = new RnStavke();
  //       rnStav.brojiloVrstaKolone = this.broVrsKol[i];
  //       rnStav.vrednost = this.vrednosti[i];
  //       this.rnStavke.push(rnStav);
  //     }
  //   } else {
  //     for(var i = 0; i < this.rn.rnStavke.length; i++) {
  //       var rnStav = new RnStavke();
  //       rnStav.brojiloVrstaKolone = this.rn.rnStavke[i].brojiloVrstaKolone;
  //       rnStav.vrednost = this.vrednosti[i];
  //       this.rnStavke.push(rnStav);
  //     }
  //   }
  //
  //
  //   console.log(this.rnStavke);
  //
  //   var datePipe = new DatePipe();
  //   this.rn.datumr = datePipe.transform(this.datumRacuna, 'dd.MM.yyyy');
  //
  //   this.rn.rnStavke = this.rnStavke;
  //
  //   this.crudService.sendData("rn", this.rn)
  //     .subscribe(
  //       data => {console.log(data); this.getDataRacuni();},
  //       error => {console.log(error); this.router.navigate(['/login']);}
  //     );
  //
  //   this.prikaziRn = false;
  //   this.noviRn = false;
  //
  // }
  //
  // onCancelRn() {
  //   this.prikaziRn = false;
  //   this.popunjenaPolja = false;
  // }
  //
  //
  //
  //
  // getBrojila(id: number) {
  //   this.crudService.getData("brojilo/sve?obj_id="+id).subscribe(
  //     data => {
  //       this.brojila = data;
  //       console.log(data);
  //       this.rn.brojilo = this.brojila[0];
  //       this.isBrojilaLoaded = true;
  //     },
  //     error => {console.log(error); this.router.navigate(['/login']);}
  //   );
  // }
  //
  // public onBrojiloSelected(selectedId: number){
  //   if(this.isBrojilaLoaded) {
  //     for (var item of this.brojila) {
  //       if (item.id == selectedId) {
  //         this.rn.brojilo = item;
  //       }
  //     }
  //   }
  //
  //   this.getEnergente(this.rn.brojilo.brojiloVrsta.energentTip.id);
  //   this.getBrojiloVrstaKol(this.rn.brojilo.brojiloVrsta.id);
  // }
  //
  // getEnergente(id: number) {
  //   this.crudService.getData("energent/sve?en_tip_id="+id).subscribe(
  //     data => {
  //       this.energenti = data;
  //       this.rn.energent = this.energenti[0];
  //     },
  //     error => {console.log(error); this.router.navigate(['/login']);}
  //   );
  // }
  //
  // public onEnergentSelected(selectedId: number){
  //
  //     for (var item of this.energenti) {
  //       if (item.id == selectedId) {
  //         this.rn.energent = item;
  //       }
  //     }
  // }
  //
  //
  // getBrojiloVrstaKol(id: number) {
  //   this.crudService.getData("bro_vrs_kol/sve?bro_vrs_id="+id).subscribe(
  //     data => {
  //
  //       this.broVrsKol = data;
  //
  //       const arrayControl = <FormArray>this.myFormRn2.controls['polja'];
  //
  //       for (var k = (<FormArray>this.myFormRn2.controls['polja']).length; k > 0; k--){
  //         arrayControl.removeAt(k-1);
  //       }
  //
  //       for(var i = 0; i < this.broVrsKol.length; i++){
  //         (<FormArray>this.myFormRn2.controls['polja']).push(new FormControl('', Validators.required));
  //       }
  //
  //       this.popunjenaPolja = true;
  //
  //       console.log(this.broVrsKol);
  //     },
  //     error => {console.log(error); this.router.navigate(['/login']);}
  //   );
  // }
  //
  // napuniGodine(){
  //   let datum = new Date();
  //   let godina = datum.getFullYear();
  //   for(var i = 0; i < this.brojGodinaUMeniju; i++){
  //     this.godine.push(godina - i);
  //   }
  //
  // }
  //
  // public onGodinaSelected(selectedGodina: number){
  //   this.datumRacuna.setFullYear(selectedGodina);
  //
  //   if (this.rn.brojilo) {
  //     var datePipe = new DatePipe();
  //     this.proveriRacun("rn/provera?datumr="+datePipe.transform(this.datumRacuna, 'dd.MM.yyyy')+"&brojilo_id="+this.rn.brojilo.id);
  //   }
  //
  // }
  //
  // public onMesecSelected(selectedMesec: number){
  //   this.datumRacuna.setMonth(selectedMesec);
  //   this.datumRacuna.setDate(15);
  //
  //   if (this.rn.brojilo) {
  //     var datePipe = new DatePipe();
  //     this.proveriRacun("rn/provera?datumr="+datePipe.transform(this.datumRacuna, 'dd.MM.yyyy')+"&brojilo_id="+this.rn.brojilo.id);
  //   }
  //
  // }
  //
  // popuniGodinaMesec(datum: Date){
  //   if(this.godine.length==0) {
  //     this.napuniGodine();
  //   }
  //
  //   for (var item of this.godine) {
  //     if (item == datum.getFullYear()) {
  //       this.godina = item;
  //     }
  //   }
  //
  //   this.mesec.id = datum.getMonth();
  // }
  //
  // proveriRacun(url: string){
  //     this.crudService.getData(url).subscribe(
  //       data => {
  //         this.proveraRn = data;
  //       },
  //       error => console.log(error)
  //     );
  // }
  //
  // proveraRn: any = 0;

}
