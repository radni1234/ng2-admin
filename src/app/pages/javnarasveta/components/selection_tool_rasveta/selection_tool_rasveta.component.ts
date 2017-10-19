import {Component, OnInit, ViewEncapsulation, Output, EventEmitter} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {CompleterService, CompleterData, CompleterItem} from "ng2-completer";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

let template = require('./selection_tool_rasveta.component.html');

@Component({
  selector: 'selection-tool-rasveta',
  template: template
})
export class SelectionToolRasveta implements OnInit{

  @Output() onIzvrsiSelectionTool = new EventEmitter<number[]>();

  private dataService: CompleterData;
  private dataServiceMesta: CompleterData;
  private isOpstineLoaded:boolean = false;
  private isMestaLoaded:boolean = false;
  private isTrafoLoaded: boolean = false;
  private opstine: any[];
  private mesta: any[];
  errorMessage:string;
  trafoi: IMultiSelectOption[] = new Array<IMultiSelectOption>();
  selTrafoi: IMultiSelectOption[] = new Array<IMultiSelectOption>();


  private opstinaID: number = 0;
  private mestoID: number = 0;


  trafoSvi: any[];
  trafoKrajnjiIzbor: number[] = [];
  trafoKrajnjiIzborPrikaz: any[] = [];

  trafoIzbor: number[] = []; // Default selection
  selTrafoIzbor: number[] = []; // Default selection

  trafoSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: true,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };

  trafoTexts: IMultiSelectTexts = {
    checkAll: 'Selektuj sve',
    uncheckAll: 'Deselektuj all',
    checked: 'selektovan',
    checkedPlural: 'selektovani',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: 'Izaberite trafoe',
  };

  constructor(private crudService: CrudService, private completerService: CompleterService) {

  }

  ngOnInit(){

    this.getTrafoe();
    this.getTrafoeSve();

    this.crudService.getData("opstina/sve")
      .subscribe(
        listaOpstina => {
          this.opstine = listaOpstina;
          console.log(this.opstine);
          this.dataService = this.completerService.local(this.opstine, 'naziv', 'naziv');
          this.isOpstineLoaded = true;
        },
        error => this.errorMessage = <any>error);

  }

  getTrafoe() {
    this.crudService.getData("trafo/lov?ops_id="+this.opstinaID+"&mes_id="+this.mestoID).subscribe(
      data => {
        this.trafoi = data;
        console.log(data);

        this.isTrafoLoaded = true;
      },
      error => console.log(error)
    );

  }

  getTrafoeSve() {
    this.crudService.getData("trafo/lov?ops_id=0&mes_id=0").subscribe(
      data => {
        this.trafoSvi = data;
      },
      error => console.log(error)
    );

  }

  izvrsiPrenosTrafo(){

    for (var i = 0; i < this.trafoIzbor.length; i++) {
      if(!this.proveriTrafoKrajnjiIzbor(this.trafoIzbor[i])){
        for (var j = 0; j < this.trafoSvi.length; j++) {
          if( this.trafoIzbor[i] === this.trafoSvi[j].id ) {
            this.trafoKrajnjiIzbor.push(this.trafoIzbor[i]);
            this.trafoKrajnjiIzborPrikaz.push(this.trafoSvi[j]);
            break;
          }
        }
      }
    }

    this.trafoIzbor = [];
  }

  proveriTrafoKrajnjiIzbor(id: any){

    for (var i = 0; i < this.trafoKrajnjiIzbor.length; i++) {
      if( this.trafoKrajnjiIzbor[i] === id ) {
        return true;
      }
    }

    return false;
  }


  obrisiTrafoKrajnjiIzbor(id: any){

    for (var i = 0; i < this.trafoKrajnjiIzbor.length; i++) {
      if( this.trafoKrajnjiIzbor[i] === id ) {
        this.trafoKrajnjiIzbor.splice(i, 1);
        break;
      }
    }

    for (var i = 0; i < this.trafoKrajnjiIzborPrikaz.length; i++) {
      if( this.trafoKrajnjiIzborPrikaz[i].id === id ) {
        this.trafoKrajnjiIzborPrikaz.splice(i, 1);
        break;
      }
    }
  }


  izvrsiSelectionTool(){

    this.onIzvrsiSelectionTool.emit(this.trafoKrajnjiIzbor);

  }


  obrisiTrafoKrajnjiIzborSve(){

    this.trafoKrajnjiIzbor = [];
    this.trafoKrajnjiIzborPrikaz = [];

  }

  public onOpstinaSelected(selected: CompleterItem) {
    console.log('izabrana opstina: ' + selected);

    if(selected!==null){
      console.log(selected.originalObject.id);
      this.opstinaID = selected.originalObject.id;
      this.napuniMesta(selected.originalObject.id);
      // this.selektovanaOpstina=selected.originalObject;
      // this.selectedMesto = "Biraj mesto";
      // console.log(this.objekat);
    } else {
      this.opstinaID = 0;
    }
    console.log('opstinaId ' + this.opstinaID);
    this.getTrafoe();
  }

  public onMestoSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      this.mestoID = selected.originalObject.id;
      //   this.objekat.mesto=selected.originalObject;
      //   this.objekat.mesto.opstina=this.selektovanaOpstina;
      console.log(selected.originalObject);
    } else {
      this.mestoID = 0;
    }
    console.log('mestoId ' + this.mestoID);
    this.getTrafoe();
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
        error => this.errorMessage = <any>error);

  }
  onChangeTrafo(event) {
    console.log(event);
    console.log(this.trafoIzbor);
  }
  onChangeSelTrafo(event) {
    console.log(event);
    console.log(this.selTrafoIzbor);
  }

}
