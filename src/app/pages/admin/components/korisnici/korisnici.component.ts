import {Component, ViewEncapsulation, EventEmitter, Output, OnInit, ViewChild} from '@angular/core';

import { KorisniciService } from './korisnici.services.ts';
import { LocalDataSource } from 'ng2-smart-table';
import { Router} from '@angular/router';
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";



@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./korisnici.scss'),require('./modals.scss')],
  template: require('./korisnici.html')
})
export class Korisnici implements OnInit{
  @ViewChild('childModal') childModal: ModalDirective;
  @Output() output = new EventEmitter<JSON>();
  query: string = '';
  private IDKorisnikaBrisanje: number;
  private isKorisnikObrisan: boolean =false;
  korisniciChanged = new EventEmitter<any[]>();

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    mode: 'external',
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
      naziv: {
        title: 'Ime i prezime',
        type: 'string'
      },
      uloga: {
        title: 'Uloga',
//        valuePrepareFunction: (value)=> {return value.naziv},
//        filterFunction: (value, par)=> {if (value.naziv.toLowerCase().search(par.toLowerCase())!==-1)return value},
        type: 'string'
      },
      mesto: {
        title: 'Mesto',
//        valuePrepareFunction: (value)=> {return value.naziv},
        type: 'string'
      },
      opstina: {
        title: 'Opština',
//        valuePrepareFunction: (value)=> {return value.opstina.naziv},
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
      },
      alarmRacun: {
        title: 'Alarm Racun',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  errorMessage: string;

  constructor(protected service: KorisniciService, private router: Router) {
//    this.service.getData().then((data) => {
//      this.source.load(data);
//    });

    // this.service.getListaKorisnika()
    //   .subscribe(
    //     listaKorisnika => {
    //       this.source.load(listaKorisnika);
    //       console.log(listaKorisnika);
    //     },
    //     error => this.errorMessage = <any>error);
  }



  onDeleteConfirm(event): void {
    console.log("wdkjqwkdjqdjwqkjdqjdfklas");
    if (window.confirm('Are you sure you want to delete?')) {
      console.log(event.data.id);
          this.service.obrisiKorisnika(event.data.id)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
      event.confirm.resolve();
      this.router.navigate(['/pages/admin/korisnici']);
    } else {
      event.confirm.reject();
    }
  }
  onDelete(event){
    this.IDKorisnikaBrisanje = event.data.id
    console.log(event.data.username);
    this.showChildModal();

  }
  brisiKorisnika(){
    //brisi korisnika
    this.service.obrisiKorisnika(this.IDKorisnikaBrisanje)
      .subscribe(
        data => {
          console.log("USAO U BRISANJE KORISNIKA");
          console.log(data);
          this.service.getListaKorisnikaTab()
            .subscribe(
              listaKorisnika => {
                //this.source.load(listaKorisnika);
                console.log("USAO U SKIDANJE NOVE LISTE KORISNIKA SA SERVERA");
                this.korisniciChanged.emit(listaKorisnika);
                console.log(listaKorisnika);
              },
              error => this.errorMessage = <any>error);

        },
        error => console.log(error)
      );

    //azuriraj listu korisnika

    this.hideChildModal();
    this.router.navigate(['/pages/admin/korisnici']);

  }
  onEdit(event): void{
    console.log("wdkjqwkdjqdjwqkjdqjdfklas");
//    this.output.emit(event.object);
    this.router.navigate(['/pages/admin/korisnik', event.data.id ]);
  }

  onCreate(event): void{
    console.log("On create Korisnik");
//    this.output.emit(event.object);
    this.router.navigate(['/pages/admin/korisnik']);
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  ngOnInit(){
    this.service.getListaKorisnikaTab()
      .subscribe(
        listaKorisnika => {
          this.source.load(listaKorisnika);
          console.log(listaKorisnika);
        },
        error => this.errorMessage = <any>error);

    this.korisniciChanged.subscribe(
      listaKorisnika => {
        this.source.load(listaKorisnika);
        console.log("USAO U AZURIRANJE KORISNIKA U NGONINIT");
        console.log(listaKorisnika);
      },
      error => this.errorMessage = <any>error);

}

}
