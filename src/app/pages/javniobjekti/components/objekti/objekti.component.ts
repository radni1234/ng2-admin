import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import { Ng2MapComponent } from 'ng2-map';
import {Marker} from "ng2-map";

import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {CrudService} from "../../../services/crud.service";

@Component({
  selector: 'isem-objekti',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'objekti.component.html'
})

export class ObjektiComponent implements OnInit{

  @ViewChild(Ng2MapComponent) ng2MapComponent: Ng2MapComponent;
  @ViewChild(Marker) marker: Marker;
  markeri: Marker[];
  objekti: any[];
  objekat: any;
  loaded: boolean = false;
  myForm: FormGroup;

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

  constructor(private crudService: CrudService, private fb: FormBuilder){
    Ng2MapComponent['apiUrl'] = 'https://maps.google.com/maps/api/js?key=AIzaSyD_jj5skmtWusk6XhSu_wXoSeo_7bvuwlQ';
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
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
  // getObjekti() {
  //   this.crudService.getData("objekat").subscribe(
  //     data => {this.source.load(data); console.log(data);},
  //     error => console.log(error)
  //   );
  //
  // }
  prikazi_info($event, id){
    console.log("ID OBJEKTA JE: " + id);
    this.crudService.getSingle("objekat", id)
      .subscribe(
        data => {
          console.log(data);
          this.objekat = data;
          this.loaded = true;
        },
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
    
    // this.ng2MapComponent.mapReady$.subscribe(map => {
    //   console.log('all markers', map.markers);
    //   this.markeri = map.markers;
    //   console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"+this.markeri);
    // })
  }
}
