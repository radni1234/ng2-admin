
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {CompleterData, CompleterService, CompleterItem} from "ng2-completer";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {CrudService} from "../../../services/crud.service";

let template = require('./selection_tool_dobavljac.component.html');

@Component({
  selector: 'selection-tool-dobavljac',
  template: template
})
export class SelectionToolDobavljac implements OnInit {

  @Output() onIzvrsiSelectionTool = new EventEmitter<number[]>();

  private dataService: CompleterData;
  private dataServiceMesta: CompleterData;
  private isOpstineLoaded:boolean = false;
  private isMestaLoaded:boolean = false;

  private isDobavljacLoaded: boolean = false;
  private opstine: any[];
  private mesta: any[];
  errorMessage:string;
  dobavljaci: IMultiSelectOption[] = new Array<IMultiSelectOption>();

  private opstinaId: number = 0;
  private mestoId: number = 0;

  dobSvi: any[];
  dobKrajnjiIzbor: number[] = [];
  dobKrajnjiIzborPrikaz: any[] = [];

  dobIzbor: number[] = []; // Default selection

  dobSettings: IMultiSelectSettings = {
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
  dobTexts: IMultiSelectTexts = {
    checkAll: 'Odaberi sve',
    uncheckAll: 'Poništi odabir',
    checked: 'Odabran',
    checkedPlural: 'Odabrani',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: 'Izaberite dobavljača',
  };

  constructor(private crudService: CrudService, private completerService: CompleterService) {

  }

  ngOnInit() {
    this.napuniOpstine();

    this.getDobavljace();
    this.getDobavljaceSve();
  }

  getDobavljace() {
    this.crudService.getData("dobavljac/lov?ops_id="+this.opstinaId+"&mes_id="+this.mestoId).subscribe(
      data => {
        this.dobavljaci = data;
        console.log(data);

        this.isDobavljacLoaded = true;
      },
      error => console.log(error)
    );
  }

  getDobavljaceSve() {
    this.crudService.getData("dobavljac/lov?ops_id=0&mes_id=0").subscribe(
      data => {
        this.dobSvi = data;
      },
      error => console.log(error)
    );
  }

  napuniOpstine (){
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

  izvrsiPrenosDob(){

    for (var i = 0; i < this.dobIzbor.length; i++) {
      if(!this.proveriDobKrajnjiIzbor(this.dobIzbor[i])){
        for (var j = 0; j < this.dobSvi.length; j++) {
          if( this.dobIzbor[i] === this.dobSvi[j].id ) {
            this.dobKrajnjiIzbor.push(this.dobIzbor[i]);
            this.dobKrajnjiIzborPrikaz.push(this.dobSvi[j]);
            break;
          }
        }
      }
    }

    this.dobIzbor = [];
  }

  proveriDobKrajnjiIzbor(id: any){

    for (var i = 0; i < this.dobKrajnjiIzbor.length; i++) {
      if( this.dobKrajnjiIzbor[i] === id ) {
        return true;
      }
    }

    return false;
  }

  obrisiDobKrajnjiIzbor(id: any){

    for (var i = 0; i < this.dobKrajnjiIzbor.length; i++) {
      if( this.dobKrajnjiIzbor[i] === id ) {
        this.dobKrajnjiIzbor.splice(i, 1);
        break;
      }
    }

    for (var i = 0; i < this.dobKrajnjiIzborPrikaz.length; i++) {
      if( this.dobKrajnjiIzborPrikaz[i].id === id ) {
        this.dobKrajnjiIzborPrikaz.splice(i, 1);
        break;
      }
    }
  }

  izvrsiSelectionTool(){

    this.onIzvrsiSelectionTool.emit(this.dobKrajnjiIzbor);

  }


  obrisiDobKrajnjiIzborSve(){

    this.dobKrajnjiIzbor = [];
    this.dobKrajnjiIzborPrikaz = [];

  }

  public onOpstinaSelected(selected: CompleterItem) {
    console.log('izabrana opstina: ' + selected);

    if(selected!==null){
      console.log(selected.originalObject.id);
      this.opstinaId = selected.originalObject.id;
      this.napuniMesta(selected.originalObject.id);
    } else {
      this.opstinaId = 0;
    }
    console.log('opstinaId ' + this.opstinaId);
    this.getDobavljace();
  }

  public onMestoSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      this.mestoId = selected.originalObject.id;

      console.log(selected.originalObject);
    } else {
      this.mestoId = 0;
    }
    console.log('mestoId ' + this.mestoId);
    this.getDobavljace();
  }

  onChangeObjekat(event) {
    console.log(event);
    console.log(this.dobIzbor);

  }

}
