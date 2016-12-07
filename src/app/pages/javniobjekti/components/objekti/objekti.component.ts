import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';

import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {CrudService} from "../../../services/crud.service";

@Component({
  selector: 'isem-objekti',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'objekti.component.html'
})

export class ObjektiComponent implements OnInit{

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

  constructor(private crudService: CrudService){

  }

  getDataTab() {
    this.crudService.getDataTab("objekat").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => console.log(error)
    );
  }
  ukljuciGrejanje(){
    this.isGrejanje = true;
    this.isHladjenje = false;
    this.isRasveta = false;
  }
  ukljuciHladjenje(){
    this.isGrejanje = false;
    this.isHladjenje = true;
    this.isRasveta = false;
  }
  ukljuciRasvetu(){
    this.isGrejanje = false;
    this.isHladjenje = false;
    this.isRasveta = true;
  }
  ngOnInit(){
    this.getDataTab();
  }
}
