import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import {JediniceMereService} from "./jedinice_mere.services";
import {ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import { Router} from '@angular/router';

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./jedinice_mere.scss'),require('./modals.scss')],
  template: require('./jedinice_mere.html')
})
export class JediniceMere implements OnInit{
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('childModalDelete') childModalDelete: ModalDirective;

  query: string = '';
  errorMessage: string;
  jedMere: any;
  jedMereBrisanje: any;

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true,
    },
    mode: 'inline',

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
        title: 'Jedinica mere',
        type: 'string'
      }

    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: JediniceMereService, private router: Router) {

  }

  onCreateConfirm(event): void {
    console.log(event.newData);
    this.service.sendJedinicaMere(event.newData).subscribe(
      data=> {
        console.log(data);
        console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
             }
    );


  }

  onDeleteConfirm(event): void {
    this.childModalDelete.show();
    this.jedMereBrisanje = event.data;
  }
  brisiJedinicuMere (){
    this.service.obrisiJedMere(this.jedMereBrisanje.id).subscribe(
      data=> {
        console.log(data);
        // this.router.navigate(['/pages/admin/korisnici']);
      }
    );
    this.source.remove(this.jedMereBrisanje);
    this.childModalDelete.hide();
  }

  onEditConfirm(event): void{
    this.showChildModal();
    this.jedMere = event.data;
    console.log(event.data);
  //  console.log(event.data);
  }

  snimiJedinicuMere(){

    this.service.sendJedinicaMere(this.jedMere).subscribe(
      data=> {
        console.log(data);
       // this.router.navigate(['/pages/admin/korisnici']);
      }
    );
    this.hideChildModal();


  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  showChildModalDelete(): void {
    this.childModalDelete.show();
  }

  hideChildModalDelete(): void {
    this.childModalDelete.hide();
  }
  ngOnInit(){
    this.service.getListaJedinicaMere()
      .subscribe(
        listaKorisnika => {
          this.source.load(listaKorisnika);

          console.log(listaKorisnika);
        },
        error => this.errorMessage = <any>error);

  }


}
