import {Component, OnInit, ViewEncapsulation} from "@angular/core";

import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import { Ng2MapComponent } from 'ng2-map';
import {Marker} from "ng2-map";

import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {CrudService} from "../../../services/crud.service";
import {Objekat, Mesto, Opstina, Grupa, Podgrupa, NacinFinansiranja} from "./objekatdata";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';

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

  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService){
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
  onCreate(): void{
    this.selektovanaOpstina = new Opstina();
    this.selektovanaOpstina.naziv = "Ada";
    this.opstina = new Opstina();
    this.opstina = this.opstine[0];
    this.napuniMesta(this.opstina.id);
    this.mesto = new Mesto();
    this.mesto = this.mesta[0];

    this.grupa = new Grupa();
    this.grupa = this.grupe[0];
    this.napuniPodgrupe(this.grupa.id);
    this.podgrupa = new Podgrupa();
    this.podgrupa = this.podgrupe[0];

    this.nacinFinansiranja = new NacinFinansiranja();
    this.nacinFinansiranja = this.naciniFinansiranja[0];

    this.objekat = new Objekat();
    this.objekat.podgrupa = this.podgrupa;
    this.objekat.mesto = this.mesto;
    this.objekat.nacinFinansiranja = this.nacinFinansiranja;

    this.loadedForm = true;
    console.log(this.objekat);
    //
    // this.objekat.mesto = this.mesta[0];
    // this.selectedMesto = "Biraj mesto";
    //this.dobavljac = null;
    //this.isKreiranjeNovogEnergenta = true;
    this.source.setFilter([{ field: 'naziv', search: '' },{ field: 'mesto', search: '' }]);
    this.izbor = true;
  }
  onEdit(event): void{
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

    this.crudService.getSingle("objekat", event.data.id)
      .subscribe(
        data => {
          console.log(data);
         // this.objekat = new Objekat();
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
          // this.selectedMesto = this.dobavljac.mesto.naziv;
        },
        error => console.log(error)
      );

    console.log(this.objekat);
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
    //this.objekat = null;
  }

  onCancel() {
    this.getDataTab();
    this.izbor = false;
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

    // this.ng2MapComponent.mapReady$.subscribe(map => {
    //   console.log('all markers', map.markers);
    //   this.markeri = map.markers;
    //   console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"+this.markeri);
    // })
  }
  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }
}
