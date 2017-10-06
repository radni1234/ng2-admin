import {Component, ViewEncapsulation, ViewChild} from "@angular/core";

import { LocalDataSource } from 'ng2-smart-table';
import { Router} from '@angular/router';
// import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import {CrudService} from "../../../services/crud.service";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Korisnik, Authority} from "./korisnikdata";
import {Mesto} from "../../../javniobjekti/components/objekti/objekatdata";
import {Opstina} from "../opstina/opstinadata";
import {CompleterItem, CompleterData, CompleterService} from "ng2-completer";
import {JavnoPreduzece} from "../javno_preduzece/javno_preduzece.data";
import {ModalDirective} from "ng2-bootstrap";



@Component({
  selector: 'korisnik',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../styles/table.component.scss'],
  templateUrl: './korisnici.html'
})
export class Korisnici {
  @ViewChild('childModal') childModal: ModalDirective;

  private korisnik: Korisnik;
  private brisanjeId: number;
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

  javnoPreduzeceSve: JavnoPreduzece[];
  javnoPreduzeceId: number;
  isJavnoPreduzeceLoaded: boolean = false;

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
      javnoPreduzece: [''],
      username: [''],
      password: [''],
      mail: [''],
      tel: [''],
      fax: [''],
      mob: [''],
      alarmRacunStart: [''],
      alarmTrendStart: [''],
      psAdmin: [''],
      psObjekti: [''],
      psVozila: [''],
      psRasveta: [''],
      psVodosnabdevanje: [''],
      psGrejanje: [''],
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
      data => {this.source.load(data);
              console.log(data);
              this.isKorisniciLoaded = true;},
      error => {console.log(error); }
    );
  }

  getUloge() {
    this.crudService.getData("uloga/sve").subscribe(
      data => {this.uloge = data;
                console.log(data);
                this.isUlogeLoaded = true;},
      error => {console.log(error); }
    );
  }

  public onUlogaSelected(selectedId: number) {
    console.log(selectedId);
    if (this.isUlogeLoaded) {
      for (var item of this.uloge) {
        if (item.id == selectedId) {
          console.log("Selektovana uloga" + item.name);
          this.korisnik.authorities[0] = item;
          // this.korisnik.authorities[0].version = item.version;
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
      this.getDataJavnoPreduzece(selected.originalObject.id);
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

  getDataJavnoPreduzece(ops_id: number) {
    this.crudService.getData("javno_pred/sve?ops_id="+ops_id).subscribe(
      data => {
        this.javnoPreduzeceSve = data;
        this.isJavnoPreduzeceLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onDateChangedRacun(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.korisnik.alarmRacunStart = event.formatted;
  }

  onDateChangedTrend(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.korisnik.alarmTrendStart = event.formatted;
  }

  onCreate(): void{
    this.korisnik = new Korisnik();
    this.korisnik.mesto = new Mesto();
    this.korisnik.mesto.opstina = new Opstina();
    this.korisnik.authorities = [new Authority()];
    this.korisnik.javnoPreduzece = new JavnoPreduzece();

    this.javnoPreduzeceId = null;
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
              this.ulogaId = this.korisnik.authorities[0].id;

              if (!this.korisnik.javnoPreduzece){
                this.javnoPreduzeceId = null;
              } else {
                this.javnoPreduzeceId = this.korisnik.javnoPreduzece.id;
              }

              this.getDataJavnoPreduzece(this.korisnik.mesto.opstina.id);

      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {
    if (this.isJavnoPreduzeceLoaded) {
      if (!this.javnoPreduzeceId || this.javnoPreduzeceId.toString() == "0: null") {
        this.korisnik.javnoPreduzece = null;
      } else {
        for (let item of this.javnoPreduzeceSve) {
          if (item.id == this.javnoPreduzeceId) {
            this.korisnik.javnoPreduzece = item;
          }
        }
      }
    }

    this.crudService.sendData("korisnik", this.korisnik)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.korisnik = new Korisnik();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("korisnik", this.brisanjeId)
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
