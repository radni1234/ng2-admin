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

  private opstinaID: number = 0;
  private mestoID: number = 0;
  private grupaID: number = 0;
  private podgrupaID: number = 0;


  objSvi: any[];
  objKrajnjiIzbor: number[] = [];
  objKrajnjiIzborPrikaz: any[] = [];

  objIzbor: number[] = []; // Default selection

  objSettings: IMultiSelectSettings = {
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
//   getObjekte() {
//     this.crudService.getData("objekat").subscribe(
//       data => {
//         for (var i = 0; i < data.length; i++) {
//           this.objekti.push({
//             id: data[i].id,
//             name: data[i].naziv,
//          });
//         }
// //        this.objekti = data;
//         console.log(data);
//
//         this.isObjekatLoaded = true;
//       },
//       error => console.log(error)
//     );
//   }


  getObjekte() {
    this.crudService.getPodatke("objekat/lov?ops_id="+this.opstinaID+"&mes_id="+this.mestoID+"&gru_id="+this.grupaID+"&podgru_id="+this.podgrupaID).subscribe(
      data => {
        this.objekti = data;
        console.log(data);

        this.isObjekatLoaded = true;
      },
      error => console.log(error)
    );

  }

  getObjekteSve() {
    this.crudService.getPodatke("objekat/lov?ops_id=0&mes_id=0&gru_id=0&podgru_id=0").subscribe(
      data => {
        this.objSvi = data;
      },
      error => console.log(error)
    );

  }

  izvrsiPrenosObj(){

    this.objKrajnjiIzbor.push.apply(this.objKrajnjiIzbor, this.objIzbor);
    this.objIzbor = [];

    var izborArrayLength = this.objKrajnjiIzbor.length;
    var sviArrayLength = this.objSvi.length;

    for (var i = 0; i < izborArrayLength; i++) {
      for (var j = 0; j < sviArrayLength; j++) {
        if( this.objKrajnjiIzbor[i] === this.objSvi[j].id ) {
          this.objKrajnjiIzborPrikaz.push(this.objSvi[j]);
          break;
        }
      }
    }
  }


  obrisiObjKrajnjiIzbor(objId: any){

    var izborArrayLength = this.objKrajnjiIzbor.length;

    for (var i = 0; i < izborArrayLength; i++) {
        if( this.objKrajnjiIzbor[i] === objId ) {
          this.objKrajnjiIzbor.splice(i, 1);
          break;
        }
    }

    var izborPrikazArrayLength = this.objKrajnjiIzborPrikaz.length;

    for (var i = 0; i < izborPrikazArrayLength; i++) {
      if( this.objKrajnjiIzborPrikaz[i].id === objId ) {
        this.objKrajnjiIzborPrikaz.splice(i, 1);
        break;
      }
    }
  }


  obrisiObjKrajnjiIzborSve(){

    this.objKrajnjiIzbor = [];
    this.objKrajnjiIzborPrikaz = [];

  }

  public onGrupaSelected(selectedId: number) {
    console.log("ID selektovane grupe je: " + selectedId);
    // while(this.podgrupe.length > 0) {
    //   this.podgrupe.pop();
    // }

    this.podgrupe = null;

    if(this.isGrupeLoaded) {
      if(selectedId !== 0) {
        this.napuniPodgrupe(selectedId);
      } else {
        this.podgrupaID = 0;
      }

      // for (var item of this.grupe) {
//         console.log("ID grupe je: " + item.id + " a njen naziv :" + item.naziv);
//         if (item.id == selectedId) {
// //          console.log("Selektovana grupa"+item.naziv);
//           console.log("POZIV U ON GRUPA SELECTED");
//           this.napuniPodgrupe(item.id);
//         }
//       }
    }

    this.getObjekte();
  }

  public onPodgrupaSelected(selectedId: number) {
    console.log("ID selektovane podgrupe je: " + selectedId);
    this.getObjekte();
  }

   public onOpstinaSelected(selected: CompleterItem) {
     console.log(selected);

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
