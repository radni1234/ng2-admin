import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {CompleterService, CompleterData, CompleterItem} from "ng2-completer";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

let template = require('./selection_tool.component.html');

@Component({
  selector: 'selection-tool',
  template: template
})
export class SelectionTool implements OnInit{

  private dataService: CompleterData;
  private dataServiceMesta: CompleterData;
  public isOpstineLoaded:boolean = false;
  public isMestaLoaded:boolean = false;
  public isGrupeLoaded:boolean = false;
  public isPodgrupeLoaded:boolean = false;
  isObjekatLoaded: boolean = false;
  private opstine: any[];
  private mesta: any[];
  errorMessage:string;
  objekti: IMultiSelectOption[] = new Array<IMultiSelectOption>();
  podgrupe: any[] = new Array<any>();
  private grupe: any[];
  private grupaID: number;
  private podgrupaID: number;

  objIzbor: number[] = []; // Default selection

  objSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: true,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };
  objTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: 'Izaberite objekat',
  };

  constructor(private crudService: CrudService, private completerService: CompleterService) {

  }
  ngOnInit(){

    this.napuniGrupe();

    this.getObjekte();

    this.crudService.getData("opstina")
      .subscribe(
        listaOpstina => {
          this.opstine = listaOpstina;
          console.log(this.opstine);
          this.dataService = this.completerService.local(this.opstine, 'naziv', 'naziv');
          this.isOpstineLoaded = true;
        },
        error => this.errorMessage = <any>error);

  }

   // napuniMesta (id: number){
   // this.crudService.getListaMesta(id)
   // .subscribe(
   // listaMesta => {
   // this.mesta = listaMesta;
   // console.log(this.mesta);
   // this.dataServiceMesta = this.completerService.local(this.mesta, 'naziv', 'naziv');
   // this.isMestaLoaded = true;
   // },
   // error => this.errorMessage = <any>error);
   //
   // }
  getObjekte() {
    this.crudService.getData("objekat").subscribe(
      data => {
        for (var i = 0; i < data.length; i++) {
          this.objekti.push({
            id: data[i].id,
            name: data[i].naziv,
         });
        }
//        this.objekti = data;
        console.log(data);

        this.isObjekatLoaded = true;
      },
      error => console.log(error)
    );
  }
  public onGrupaSelected(selectedId: number) {
    console.log("ID selektovane grupe je: " + selectedId);
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
        }
      }
    }
  }

  public onPodgrupaSelected(selectedId: number) {
    console.log("ID selektovane podgrupe je: " + selectedId);
  }

   public onOpstinaSelected(selected: CompleterItem) {
   console.log(selected);
   if(selected!==null){
   console.log(selected.originalObject.id);
    this.napuniMesta(selected.originalObject.id);
   // this.selektovanaOpstina=selected.originalObject;
   // this.selectedMesto = "Biraj mesto";
   // console.log(this.objekat);
   }
   }
   public onMestoSelected(selected: CompleterItem) {
   console.log(selected);
   if(selected!==null){
//   this.objekat.mesto=selected.originalObject;
//   this.objekat.mesto.opstina=this.selektovanaOpstina;
   console.log(selected.originalObject);
   }
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
  onChangeObjekat() {
    console.log(this.objIzbor);
  }
}
