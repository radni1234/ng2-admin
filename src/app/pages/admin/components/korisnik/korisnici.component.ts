import {Component, ViewEncapsulation, EventEmitter, Output, OnInit, ViewChild} from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { Router} from '@angular/router';
import {ModalDirective, TabsModule} from "ng2-bootstrap/ng2-bootstrap";
import {CrudService} from "../../../services/crud.service";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Korisnik, Authority} from "./korisnikdata";
import {Mesto} from "../../../javniobjekti/components/objekti/objekatdata";
import {Opstina} from "../opstina/opstinadata";
import {CompleterItem, CompleterData, CompleterService} from "ng2-completer";



@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./korisnici.scss'),require('./modals.scss')],
  template: require('./korisnici.html')
})
export class Korisnici implements OnInit{
  @ViewChild('childModal') childModal: ModalDirective;

  private korisnik: Korisnik;
  private IDKorisnikaBrisanje: number;
  private isKorisniciLoaded: boolean =false;
  private isKorisnikLoaded: boolean =false;

  private uloge: Authority[];
  private uloga: Authority;
  private ulogaId: number;
  public isUlogeLoaded:boolean = false;

  private opstina: Opstina;
  private opstine: Opstina[];
  private selectedOpstina: string;
  public isOpstineLoaded:boolean = false;
  private dataServiceOpstine: CompleterData;

  private mesta: Mesto[];
  private mesto: Mesto;
  private selectedMesto: string;
  public isMestaLoaded:boolean = false;
  private dataServiceMesta: CompleterData;

  source: LocalDataSource = new LocalDataSource();

  izbor: boolean = false;

  myForm: FormGroup;

  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

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
        title: 'Ime i prezime',
        type: 'string'
      },
      uloga: {
        title: 'Uloga',
        type: 'string'
      },
      mesto: {
        title: 'Mesto',
        type: 'string'
      },
      opstina: {
        title: 'Opština',
        type: 'string'
      },
      username: {
        title: 'Username',
        type: 'string'
      },
      mail: {
        title: 'E-mail',
        type: 'string'
      },
      tel: {
        title: 'Telefon',
        type: 'number'
      }
      // alarmRacun: {
      //   title: 'Alarm Racun',
      //   // valuePrepareFunction: (value)=> {
      //   //   if(value){return "DA"}else {return "NE"}
      //   //
      //   // },
      //   type: 'string'
      // }
    }
  };

  constructor(protected crudService: CrudService, private fb: FormBuilder, private router: Router,
    private completerService: CompleterService) {

   this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      authorities: [''],
      mesto: [''],
      opstina: [''],
      username: [''],
      password: [''],
      mail: [''],
      tel: [''],
      fax: [''],
      mob: [''],
      alarmRacunStart: [''],
      alarmTrendStart: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
    this.getUloge();
    this.getOpstine();
  }

  getData() {
    this.crudService.getData("korisnik/tab").subscribe(
      data => {this.source.load(data); console.log(data); this.isKorisniciLoaded = true;},
      error => {console.log(error); }
    );
  }

  getUloge() {
    this.crudService.getData("uloga/sve").subscribe(
      data => {this.uloge = data; console.log(data); this.isUlogeLoaded = true;},
      error => {console.log(error); }
    );
  }

  public onUlogaSelected(selectedId: number) {
    console.log(selectedId);
    if (this.isUlogeLoaded) {
      for (var item of this.uloge) {
        if (item.id == selectedId) {
          console.log("Selektovana uloga" + item.name);
          this.korisnik.authorities[0].id = item.id;
          this.korisnik.authorities[0].version = item.version;
          // console.log("Upisana uloga" + this.korisnik.authorities.name);
         }
      }
    }
  }

  public getOpstine (){
     this.crudService.getData("opstina/sve")
      .subscribe(
        data => {
        this.opstine = data;
        console.log(this.opstine);
        this.dataServiceOpstine = this.completerService.local(this.opstine, 'naziv', 'naziv');
        this.isOpstineLoaded = true;
      },
      error => {console.log(error);});
  }

  public onOpstinaSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      console.log(selected.originalObject.id);
      this.getMesta(selected.originalObject.id);
      this.selectedOpstina=selected.originalObject;
      this.selectedMesto = "Biraj mesto";
    }
  }


  public getMesta (id: number){
    this.crudService.getData("mesto/sve?ops_id=" + id)
      .subscribe(
        listaMesta => {
          this.mesta = listaMesta;
          console.log(this.mesta);
          this.dataServiceMesta = this.completerService.local(this.mesta, 'naziv', 'naziv');
          this.isMestaLoaded = true;
        },
        error => {console.log(error); }
      );
  }


  public onMestoSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      this.korisnik.mesto=selected.originalObject;
      // this.korisnik.mesto.opstina=this.selectedOpstina;
      console.log(this.korisnik);
    }
  }

  public onChangeRacun(event:any){
    console.log(event);
    var d = new Date();
    var curr_date = d.getDate();
    var curr_date_string;
    if (curr_date < 10 ){
      curr_date_string = "0" + curr_date;
      console.log(curr_date_string);
    }
    else{
      curr_date_string = curr_date;
    }
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_month_string;
    if (curr_month < 10 ){
      curr_month_string = "0" + curr_month;
    }
    else{
      curr_month_string = curr_month;
    }
    var curr_year = d.getFullYear();
    var date = curr_date_string + "." + curr_month_string + "." + curr_year;
    if(event == true){
      this.korisnik.alarmRacunStart = date;
       }
  }

  onChangeTrend(event:any){
    console.log(event);
    var d = new Date();
    var curr_date = d.getDate();
    var curr_date_string;
    if (curr_date < 10 ){
      curr_date_string = "0" + curr_date;
      console.log(curr_date_string);
    }
    else{
      curr_date_string = curr_date;
    }
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_month_string;
    if (curr_month < 10 ){
      curr_month_string = "0" + curr_month;
    }
    else{
      curr_month_string = curr_month;
    }
    var curr_year = d.getFullYear();
    var date = curr_date_string + "." + curr_month_string + "." + curr_year;
    if(event == true){
      this.korisnik.alarmTrendStart = date;
    }
  }

  onDateChangedRacun(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.korisnik.alarmRacunStart = event.formatted;
  }

  onDateChangedTrend(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.korisnik.alarmTrendStart = event.formatted;
  }

  onCreate(event): void{
    this.korisnik = new Korisnik();
    this.korisnik.mesto = new Mesto();
    this.korisnik.mesto.opstina = new Opstina();
    this.korisnik.authorities = [new Authority()];

    this.selectedOpstina = "-- Opština --";
    this.selectedMesto = "-- Mesto --";

    this.izbor = true;
  }

  onEdit(event): void{

    this.korisnik = new Korisnik();
    this.crudService.getSingle("korisnik/jedan?id="+event.data.id).subscribe(
      data => {this.korisnik = data;
              console.log(data);
              this.izbor = true;
              this.isKorisnikLoaded = true;
              this.selectedMesto = this.korisnik.mesto.naziv;
              this.selectedOpstina = this.korisnik.mesto.opstina.naziv;
              this.ulogaId = this.korisnik.authorities[0].id},
      error => {console.log(error); });

    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {

    this.crudService.sendData("korisnik", this.korisnik)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.korisnik = new Korisnik();
  }

  onDelete(event){
    this.IDKorisnikaBrisanje = event.data.id;
    console.log(event.data.username);
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("korisnik", this.IDKorisnikaBrisanje)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.hideChildModal();
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

}
