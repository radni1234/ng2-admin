import {Component, OnInit, ViewEncapsulation, Output, EventEmitter} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {CompleterService, CompleterData, CompleterItem} from "ng2-completer";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

let template = require('./virtuelno_brojilo.component.html');

@Component({
  selector: 'virtuelno-brojilo',
  template: template
})
export class VirtuelnoBrojilo implements OnInit{

  @Output() onIzvrsiSelectionTool = new EventEmitter<number[]>();

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
  selobjekti: IMultiSelectOption[] = new Array<IMultiSelectOption>();
  podgrupe: any[] = new Array<any>();
  private grupe: any[];

  private opstinaID: number = 0;
  private mestoID: number = 0;
  private grupaID: number = 0;
  private podgrupaID: number = 0;


  objSvi: any[];
  objKrajnjiIzbor: number[] = [];
  objKrajnjiIzborPrikaz: any[] = [];

  objIzbor: number[] = []; // Default selection
  selobjIzbor: number[] = []; // Default selection

  objSettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 1,
    closeOnSelect: true,
    showCheckAll: true,
    showUncheckAll: true,
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
    this.getObjekteSve();

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

  getObjekte() {
    this.crudService.getData("objekat/lov?ops_id="+this.opstinaID+"&mes_id="+this.mestoID+"&gru_id="+this.grupaID+"&podgru_id="+this.podgrupaID).subscribe(
      data => {
        this.objekti = data;
        console.log(data);

        this.isObjekatLoaded = true;
      },
      error => console.log(error)
    );

  }

  getObjekteSve() {
    this.crudService.getData("objekat/lov?ops_id=0&mes_id=0&gru_id=0&podgru_id=0").subscribe(
      data => {
        this.objSvi = data;
      },
      error => console.log(error)
    );

  }

  // izvrsiPrenosObj(){
  //
  //   for (var i = 0; i < this.objIzbor.length; i++) {
  //     if(!this.proveriObjKrajnjiIzbor(this.objIzbor[i])){
  //       for (var j = 0; j < this.objSvi.length; j++) {
  //         if( this.objIzbor[i] === this.objSvi[j].id ) {
  //           this.objKrajnjiIzbor.push(this.objIzbor[i]);
  //           this.objKrajnjiIzborPrikaz.push(this.objSvi[j]);
  //           break;
  //         }
  //       }
  //     }
  //   }
  //
  //   this.objIzbor = [];
  // }
  //
  // proveriObjKrajnjiIzbor(objId: any){
  //
  //   for (var i = 0; i < this.objKrajnjiIzbor.length; i++) {
  //     if( this.objKrajnjiIzbor[i] === objId ) {
  //       return true;
  //     }
  //   }
  //
  //   return false;
  // }
  //
  //
  // obrisiObjKrajnjiIzbor(objId: any){
  //
  //   for (var i = 0; i < this.objKrajnjiIzbor.length; i++) {
  //     if( this.objKrajnjiIzbor[i] === objId ) {
  //       this.objKrajnjiIzbor.splice(i, 1);
  //       break;
  //     }
  //   }
  //
  //   for (var i = 0; i < this.objKrajnjiIzborPrikaz.length; i++) {
  //     if( this.objKrajnjiIzborPrikaz[i].id === objId ) {
  //       this.objKrajnjiIzborPrikaz.splice(i, 1);
  //       break;
  //     }
  //   }
  // }


  izvrsiSelectionTool(){

    this.onIzvrsiSelectionTool.emit(this.objIzbor);

  }


  // obrisiObjKrajnjiIzborSve(){
  //
  //   this.objKrajnjiIzbor = [];
  //   this.objKrajnjiIzborPrikaz = [];
  //
  // }


  public onGrupaSelected(selectedId: number) {
    console.log("ID selektovane grupe je: " + selectedId);

    this.podgrupe = null;

    if(this.isGrupeLoaded) {
      if(selectedId !== 0) {
        this.napuniPodgrupe(selectedId);
      } else {
        this.podgrupaID = 0;
      }
    }

    this.getObjekte();
  }

  public onPodgrupaSelected(selectedId: number) {
    console.log("ID selektovane podgrupe je: " + selectedId);
    this.getObjekte();
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
    this.getObjekte();
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
    this.getObjekte();
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
  napuniGrupe() {
    this.crudService.getData("grupa/sve").subscribe(
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

    this.crudService.getData("podgrupa/sve?gru_id="+id)
      .subscribe(
        data => {
          this.podgrupe = data;
          console.log("UCITANE PODGRUPEEEEEEEEEEEEEEEEEEEEEEEEEEE");
          console.log(this.podgrupe);
          this.isPodgrupeLoaded = true;
        },
        error => this.errorMessage = <any>error);

  }
  onChangeObjekat(event) {
    console.log(event);
    console.log(this.objIzbor);

  }
  onChangeSelObjekat(event) {
    console.log(event);
    console.log(this.selobjIzbor);
  }

}
