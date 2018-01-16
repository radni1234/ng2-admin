
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {CompleterService, CompleterData, CompleterItem} from "ng2-completer";
import {Opstina, Mesto} from "../../../admin/components/opstina/opstinadata";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

let template = require('./rasveta_selection_tool.component.html');

@Component({
  selector: 'rasveta-selection-tool',
  template: template
})
export class RasvetaSelectionTool implements OnInit{

  @Output() onIzvrsiSelectionTool = new EventEmitter<number[]>();

  private dataServiceOpstine: CompleterData;
  private dataServiceMesta: CompleterData;

  public isOpstineLoaded:boolean = false;
  public isMestaLoaded:boolean = false;

  private opstine: Opstina[];
  private mesta: Mesto[];

  private opstinaId: number = 0;
  private mestoId: number = 0;

  isTrafoLoaded: boolean = false;

  trafoi: IMultiSelectOption[] = new Array<IMultiSelectOption>();
  selTrafoi: IMultiSelectOption[] = new Array<IMultiSelectOption>();

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
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: 'Izaberite trafo',
  };

  errorMessage:string;

  constructor(private crudService: CrudService, private completerService: CompleterService) {

  }

  ngOnInit(){
    this.getOpstine();
    this.getTrafoeSve();
  }

  getTrafoe() {
    this.crudService.getData("trafo/lov?ops_id="+this.opstinaId+"&mes_id="+this.mestoId).subscribe(
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
        this.trafoSvi= data;
        console.log(data);
      },
      error => console.log(error)
    );
  }

  getOpstine(){
    this.crudService.getData("opstina/sve")
      .subscribe(
        listaOpstina => {
          this.opstine = listaOpstina;
          console.log(this.opstine);
          this.dataServiceOpstine = this.completerService.local(this.opstine, 'naziv', 'naziv');
          this.isOpstineLoaded = true;
        },
        error => this.errorMessage = <any>error);
  }

  getMesta (id: number){
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

  onOpstinaSelected(selected: CompleterItem) {
    console.log('izabrana opstina: ' + selected);

    if(selected!==null){
      this.opstinaId = selected.originalObject.id;
      this.getMesta(selected.originalObject.id);
    } else {
      this.opstinaId = 0;
    }

    this.getTrafoe();
  }

  onMestoSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      this.mestoId = selected.originalObject.id;
      console.log(selected.originalObject);
    } else {
      this.mestoId = 0;
    }
    console.log('mestoId ' + this.mestoId);
    this.getTrafoe();
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

  proveriTrafoKrajnjiIzbor(trafoId: any){

    for (var i = 0; i < this.trafoKrajnjiIzbor.length; i++) {
      if( this.trafoKrajnjiIzbor[i] === trafoId ) {
        return true;
      }
    }

    return false;
  }

  izvrsiSelectionTool(){
    console.log(this.trafoKrajnjiIzbor);
    this.onIzvrsiSelectionTool.emit(this.trafoKrajnjiIzbor);

  }

  obrisiTrafoKrajnjiIzbor(objId: any){

    for (var i = 0; i < this.trafoKrajnjiIzbor.length; i++) {
      if( this.trafoKrajnjiIzbor[i] === objId ) {
        this.trafoKrajnjiIzbor.splice(i, 1);
        break;
      }
    }

    for (var i = 0; i < this.trafoKrajnjiIzborPrikaz.length; i++) {
      if( this.trafoKrajnjiIzborPrikaz[i].id === objId ) {
        this.trafoKrajnjiIzborPrikaz.splice(i, 1);
        break;
      }
    }
  }

  obrisiTrafoKrajnjiIzborSve(){

    this.trafoKrajnjiIzbor = [];
    this.trafoKrajnjiIzborPrikaz = [];

  }


}
