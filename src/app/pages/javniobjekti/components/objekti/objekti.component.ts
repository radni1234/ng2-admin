import {Component, OnInit, ViewEncapsulation, EventEmitter} from "@angular/core";

import {FormGroup, FormBuilder, FormArray, Validators, FormControl} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import { Ng2MapComponent } from 'ng2-map';
import {Marker} from "ng2-map";

import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {CrudService} from "../../../services/crud.service";
import {DatumService} from "../../../services/datum.service";
import {Objekat, Mesto, Opstina, Grupa, Podgrupa, NacinFinansiranja} from "./objekatdata";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {Racun, Brojilo, MesecLista, RnStavke} from "../racuni/racundata";
import {Energent} from "../../../admin/components/energent/energentdata";
import {DatePipe} from "@angular/common";

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

  @ViewChild(Ng2MapComponent) ng2MapComponent: Ng2MapComponent;
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
  errorMessage:string;

  source: LocalDataSource = new LocalDataSource();

  settings = {
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


  isGrejanje: boolean = true;
  isRasveta: boolean = false;
  isHladjenje: boolean = false;

  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService,
              private ds: DatumService){
    Ng2MapComponent['apiUrl'] = 'https://maps.google.com/maps/api/js?key=AIzaSyD_jj5skmtWusk6XhSu_wXoSeo_7bvuwlQ';
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

    this.myFormRn1 = this.fb.group({
      id: [''],
      objekat: [''],
      brojilo: [''],
      version: [''],
      energent: [''],
      godina: [''],
      mesec: [''],
      dobavljac: [''],
      rnTip: [''],
      brojRn: [''],
      datumr: [''],
      napomena: [''],
    });

    this.myFormRn2 = this.fb.group({
      polja: fb.array([
      ])
    });
  }

  getDataTab() {
    this.crudService.getDataTab("objekat").subscribe(
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
      error => console.log(error)
    );
  }
  napuniMesta (id: number){
    this.crudService.getListaMesta(id)
      .subscribe(
        listaMesta => {
          this.mesta = listaMesta;
          console.log(this.mesta);
          this.dataServiceMesta = this.completerService.local(this.mesta, 'naziv', 'naziv');
          this.isMestaLoaded = true;
        },
        error => this.errorMessage = <any>error);

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
    this.crudService.getData("nac_fin").subscribe(
      data => {
        this.naciniFinansiranja = data;
        console.log(data);
        this.isNaciniFinansiranjaLoaded = true;
      },
      error => console.log(error)
    );
  }
  napuniGrupe() {
    this.crudService.getData("grupa").subscribe(
      data => {
        this.grupe = data;
        console.log("UCITANE GRUPEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        console.log(this.grupe);
        this.isGrupeLoaded = true;
      },
      error => console.log(error)
    );
  }

  napuniPodgrupe (id: number){

    this.crudService.getListaPodgrupa(id)
      .subscribe(
        data => {
          this.podgrupe = data;
          console.log("UCITANE PODGRUPEEEEEEEEEEEEEEEEEEEEEEEEEEE");
          console.log(this.podgrupe);
          this.isPodgrupeLoaded = true;
        },
        error => this.errorMessage = <any>error);

  }
  prikazi_formu($event, id){
    console.log("ID OBJEKTA JE: " + id);
    this.crudService.getSingle("objekat", id)
      .subscribe(
        data => {
          console.log(data);
          this.objekat = data;
          this.loadedForm = true;
          this.izbor = true;
        },
        error => console.log(error)
      );
}
  prikazi_modal($event, id){
    console.log("ID OBJEKTA JE: " + id);
    this.crudService.getSingle("objekat", id)
      .subscribe(
        data => {
          console.log(data);
          this.objekat = data;
          this.nazivObjekta = this.objekat.naziv;

          console.log("NAZIV OBJEKTA : " + this.nazivObjekta);
          this.showChildModal();
        },
        error => console.log(error)
      );
  }
  onDelete(event){
    this.IDObjektaBrisanje = event.data.id
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
          this.crudService.getDataTab("objekat")
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
              error => this.errorMessage = <any>error);

        },
        error => console.log(error)
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
  onEdit(event): void{
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    this.loadedForm = false;
    this.crudService.getSingle("objekat", event.data.id)
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
        },
        error => console.log(error)
      );


    //this.energentTipId = this.dobavljac.energentTip.id;
    //this.jedinicaMereId = this.dobavljac.jedMere.id;
    this.izbor = true;
    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }
  onSubmit() {

    console.log(this.objekat);

    this.crudService.sendData("objekat", this.objekat)
      .subscribe(
        data => {
          console.log(data);
          this.getDataTab();
        },
        error => console.log(error)
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
    this.getDataTab();

    this.napuniGrupe();

    this.napuniNacinFinansiranja();

    this.crudService.getData("opstina")
      .subscribe(
        listaOpstina => {
          this.opstine = listaOpstina;
          console.log(this.opstine);
          this.dataService = this.completerService.local(this.opstine, 'naziv', 'naziv');
          this.isOpstineLoaded = true;
        },
        error => this.errorMessage = <any>error);

  }
  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  // --------------------- R A C U N I ---------------------------- //

  @ViewChild('childModalRn') childModalRn: ModalDirective;
  sourceRacuni: LocalDataSource = new LocalDataSource();
  brisanjeRnId: number;

  settings_racuni = {
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
      brojilo: {
        title: 'Brojilo',
        type: 'string'
      },
      godina: {
        title: 'Godina',
        type: 'string'
      },
      mesec: {
        title: 'Mesec',
        type: 'string'
      },
      brojRn: {
        title: 'Broj računa',
        type: 'string'
      },
      datumr: {
        title: 'Datum',
        type: 'string'
      },
      uneo: {
        title: 'Uneo',
        type: 'string'
      },
      datumu: {
        title: 'Datum unosa',
        type: 'string'
      }

    }
  };

  getDataRacuni() {
    this.crudService.getUslovTab("rn","obj_id="+this.objekat.id).subscribe(
      data => {
          this.sourceRacuni.load(data);
        },
      error => console.log(error)
    );
  }

  onDeleteRacuni(event){
    this.brisanjeRnId = event.data.id
    this.showChildModalRn();
  }

  onDeleteConfirmRacuni() {
    this.crudService.delete("rn", this.brisanjeRnId)
      .subscribe(
        data => {console.log(data); this.getDataRacuni();},
        error => console.log(error)
      );

    this.hideChildModalRn();
  }

  onEditRacuni(event){
    this.formirajRn(event.data.id);
  }

  showChildModalRn(): void {
    this.childModalRn.show();
  }

  hideChildModalRn(): void {
    this.childModalRn.hide();
  }


  // --------------------- R A C U N ---------------------------- //

  prikaziRn: boolean = false;
  prikaziBrojilo: boolean = false;
  noviRn: boolean = false;
  rn: Racun = new Racun();
  obj: Objekat = new Objekat();

  // rnIznos: Array<RnIznos> = new Array<RnIznos>();
  // rnPotrosnja: Array<RnPotrosnja> = new Array<RnPotrosnja>();
  // rnOstalo: Array<RnOstalo> = new Array<RnOstalo>();

  rnStavke: Array<RnStavke> = new Array<RnStavke>();

  godine: number [] = new Array <number>();
  godina: number;
  brojGodinaUMeniju: number = 10;

  meseci: Array<any> = [ {"id":0, "naz":"Januar"},
                        {"id":1, "naz":"Februar"},
                        {"id":2, "naz":"Mart"},
                        {"id":3, "naz":"April"},
                        {"id":4, "naz":"Maj"},
                        {"id":5, "naz":"Jun"},
                        {"id":6, "naz":"Jul"},
                        {"id":7, "naz":"Avgust"},
                        {"id":8, "naz":"Septembar"},
                        {"id":9, "naz":"Oktobar"},
                        {"id":10, "naz":"Novembar"},
                        {"id":11, "naz":"Decembar"}
                       ];


   // meseci: string [] = ["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"];
  mesec: MesecLista;

  datumRacuna: Date = new Date();

 // objekti: Objekat[];
  isObjektiLoaded: boolean = false;
  objekatId: number;

  brojila: Brojilo[];
  isBrojilaLoaded: boolean = false;
  brojiloId: number;

  energenti: Energent[];
  isEnergentiLoaded: boolean = false;
  energentId: number;

  stavke: Array<any>;
  vrednosti: Array<any> = new Array<any>();
  isVrednostiPopunjeno: boolean = false;

  myFormRn1: FormGroup;
  myFormRn2: FormGroup;

  // vrednosti iz postojeceg racuna smesta u this.rn
  // na osnovu vrste brojila iz rn uzima koja su kolone (polja) predvidjena za tu vrstu brojila i smesta u this.stavke
  // prolazi se kroz svaku kolonu (polje) predvidjeno za tu vrstu brojila i ono se dodaje na formu
    // ako postoji id te kolone(polja) u racunu onda se vrednost iz racuna upisuje kao vrednost datog polja
    // ako ne pronadje id te kolone u racunu onda se dodaje polje sa vrednoscu ''
  formirajRn(id:number){

    this.rn = new Racun();
    this.mesec = new MesecLista();

    this.crudService.getSingle("rn", id)
      .subscribe(
        data => {

          this.rn = data;

          this.crudService.getUslov("bro_vrs_kol", "bro_vrs_id="+this.rn.brojilo.brojiloVrsta.id).subscribe(
            data => {

              this.stavke = data;

              // brise postojeca polja iz myFormRn2
              const arrayControl = <FormArray>this.myFormRn2.controls['polja'];

              for (var k = (<FormArray>this.myFormRn2.controls['polja']).length; k > 0; k--){
                arrayControl.removeAt(k-1);
              }

              // dodavanje novih polja u myFormRn2
              for(var i = 0; i < this.rn.rnStavke.length; i++)
              {
                (<FormArray>this.myFormRn2.controls['polja']).push(new FormControl(this.rn.rnStavke[i].vrednost, Validators.required));
              }

              //this.isVrednostiPopunjeno = true;

            },
            error => console.log(error)
          );

          // trenutno godinu i mesec uzima iz polja god i mes, a treba na osnovu datuma racuna
          this.napuniGodine();

          console.log(typeof(this.rn.datumr));
          this.datumRacuna = this.ds.toDate(this.rn.datumr);
          console.log(this.datumRacuna.getFullYear());
          console.log(this.datumRacuna.getMonth());
          console.log(typeof(this.rn.datumr));

          for (var item of this.godine) {
            if (item == this.datumRacuna.getFullYear()) {
              this.godina = item;
            }
          }
          this.mesec.id = this.datumRacuna.getMonth();

          // this.datumRacuna.setFullYear(this.rn.godina.god);
          // this.datumRacuna.setMonth(this.rn.mesec.id - 1);
          // this.datumRacuna.setDate(15);

        },
        error => console.log(error)
      );

    this.prikaziRn = true;
    this.prikaziBrojilo = false;
  }

  onCreateNoviRn(){
    console.log('obj '+this.objekat.id);
    this.noviRn = true;

    this.rn = new Racun();
    //this.rn.brojilo.id = 1;
    this.mesec = new MesecLista();

    this.napuniGodine();
    this.getBrojila("obj_id="+this.objekat.id);

    this.prikaziRn = true;
    this.prikaziBrojilo = true;

    var today = new Date();

    for (var item of this.godine) {
      if (item == today.getFullYear()) {
        this.godina = item;
      }
    }
    this.mesec.id = today.getMonth();
    console.log('kraj ');
  }

  // skuplja vrednosti koje se nalaza u formi iz (<FormArray>this.myFormRn2.controls['polja'] i smesta ih u this.vrednosti
  // FormArray je formiran na osnovu kolona(polja) iz this.stavke tako da je redosled isti
  // prolazi se kroz this.stavke i uparuje se svaku kolonu sa odgovarajucom vrednoscu i smesta i Iznos, Potrosnja ili Ostalo objekat
  // Iznos, Potrosnja, Ostalo objekati se upisuju u Rn objekat i salje se bazi
  onSubmitRn(event) {
    this.vrednosti = ((<FormArray>this.myFormRn2.controls['polja']).getRawValue());

    console.log(this.vrednosti);

    this.rnStavke = new Array<RnStavke>();

    if(this.noviRn){
      for(var i = 0; i < this.stavke.length; i++) {
        var rnStav = new RnStavke();
        rnStav.brojiloVrstaKolone = this.stavke[i].brojiloVrstaKolone;
        rnStav.vrednost = this.vrednosti[i];
        this.rnStavke.push(rnStav);
      }
    } else {
      for(var i = 0; i < this.rn.rnStavke.length; i++) {
        var rnStav = new RnStavke();
        rnStav.brojiloVrstaKolone = this.rn.rnStavke[i].brojiloVrstaKolone;
        rnStav.vrednost = this.vrednosti[i];
        this.rnStavke.push(rnStav);
      }
    }


    console.log(this.rnStavke);

    var datePipe = new DatePipe();
    this.rn.datumr = datePipe.transform(this.datumRacuna, 'dd.MM.yyyy');

    this.rn.rnStavke = this.rnStavke;

    this.crudService.sendData("rn", this.rn)
      .subscribe(
        data => {console.log(data); this.getDataRacuni();},
        error => console.log(error)
      );

    this.prikaziRn = false;
    this.noviRn = false;

  }

  onCancelRn() {
    this.prikaziRn = false;
  }




  // getObjekte() {
  //   this.crudService.getData("objekat").subscribe(
  //     data => {
  //       this.objekti = data;
  //       //this.obj = this.objekti[0];
  //       this.isObjektiLoaded = true;
  //     },
  //     error => console.log(error)
  //   );
  // }

  public onObjekatSelected(selectedId: number){
    if(this.isObjektiLoaded) {
      for (var item of this.objekti) {
        if (item.id == selectedId) {
          this.obj = item;
        }
      }
    }

    this.getBrojila("obj_id="+this.obj.id);
  }

  getBrojila(uslov: string) {
    this.crudService.getUslov("brojilo", uslov).subscribe(
      data => {
        this.brojila = data;
        console.log(data);
        this.rn.brojilo = this.brojila[0];
        console.log('BROJILO!!! '+this.rn.brojilo);
        this.isBrojilaLoaded = true;
      },
      error => console.log(error)
    );
  }

  public onBrojiloSelected(selectedId: number){
    if(this.isBrojilaLoaded) {
      for (var item of this.brojila) {
        if (item.id == selectedId) {
          this.rn.brojilo = item;
        }
      }
    }

    this.getEnergente("en_tip_id="+this.rn.brojilo.brojiloVrsta.energentTip.id);
    this.getBrojiloVrstaKol("bro_vrs_id="+this.rn.brojilo.brojiloVrsta.id);
  }

  getEnergente(uslov: string) {
    this.crudService.getUslov("energent", uslov).subscribe(
      data => {
        this.energenti = data;
        this.rn.energent = this.energenti[0];
        this.isEnergentiLoaded = true;
      },
      error => console.log(error)
    );
  }

  public onEnergentSelected(selectedId: number){
    if(this.isEnergentiLoaded) {
      for (var item of this.energenti) {
        if (item.id == selectedId) {
          this.rn.energent = item;
        }
      }
    }
  }

  getBrojiloVrstaKol(uslov: string) {
    this.crudService.getUslov("bro_vrs_kol", uslov).subscribe(
      data => {

        this.stavke = data;

        // brise postojeca polja iz myFormRn2
        const arrayControl = <FormArray>this.myFormRn2.controls['polja'];

        for (var k = (<FormArray>this.myFormRn2.controls['polja']).length; k > 0; k--){
          // this.obrisiPolje(k-1);

          arrayControl.removeAt(k-1);
        }

        // dodavanje novih polja u myFormRn2
        for(var i = 0; i < this.stavke.length; i++)
        {
          (<FormArray>this.myFormRn2.controls['polja']).push(new FormControl('', Validators.required));
        }

        console.log(this.stavke);
      },
      error => console.log(error)
    );
  }

  napuniGodine(){
    let datum = new Date();
    let godina = datum.getFullYear();
    for(var i = 0; i < this.brojGodinaUMeniju; i++){
      this.godine.push(godina - i);
    }

  }

  public onGodinaSelected(selectedGodina: number){
    console.log("Selektovana godina: " + selectedGodina);
    this.datumRacuna.setFullYear(selectedGodina);
    console.log("Izabrani datum je: " + this.datumRacuna);
  }

  public onMesecSelected(selectedMesec: number){
    console.log("Selektovani mesec: " + selectedMesec);
    this.datumRacuna.setMonth(selectedMesec);
    this.datumRacuna.setDate(15);
    console.log("Izabrani datum je: " + this.datumRacuna);
  }

}
