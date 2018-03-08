
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {CompleterService, CompleterData, CompleterItem} from "ng2-completer";
import {Opstina, Mesto} from "../../../admin/components/opstina/opstinadata";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';


@Component({
  selector: 'voznipark-selection-tool',
  templateUrl: 'voznipark_selection_tool.component.html'
})
export class VozniparkSelectionTool implements OnInit{

  @Output() onIzvrsiSelectionTool = new EventEmitter<number[]>();

  private dataServiceOpstine: CompleterData;
  private dataServiceMesta: CompleterData;

  public isOpstineLoaded:boolean = false;
  public isMestaLoaded:boolean = false;

  private opstine: Opstina[];
  private mesta: Mesto[];

  private opstinaId: number = 0;
  private mestoId: number = 0;

  javnoPreduzeceSve: any[];
  javnoPreduzeceId: number = 0;
  isJavnoPreduzeceLoaded: boolean = false;

  isVoziloLoaded: boolean = false;

  vozila: IMultiSelectOption[] = new Array<IMultiSelectOption>();
  selVozila: IMultiSelectOption[] = new Array<IMultiSelectOption>();

  voziloSvi: any[];
  voziloKrajnjiIzbor: number[] = [];
  voziloKrajnjiIzborPrikaz: any[] = [];

  voziloIzbor: number[] = []; // Default selection
  selVoziloIzbor: number[] = []; // Default selection

  voziloSettings: IMultiSelectSettings = {
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

  voziloTexts: IMultiSelectTexts = {
    checkAll: 'Selektuj sve',
    uncheckAll: 'Deselektuj all',
    checked: 'selektovan',
    checkedPlural: 'selektovani',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: 'Izaberite vozila',
  };

  errorMessage:string;

  constructor(private crudService: CrudService, private completerService: CompleterService) {

  }

  ngOnInit(){
    this.getOpstine();
    this.getDataJavnoPreduzece();
    this.getVoziloSve();
  }

  getVozilo() {
    this.crudService.getData("vozilo/lov?ops_id="+this.opstinaId+"&mes_id="+this.mestoId+"&jav_pred_id="+this.javnoPreduzeceId).subscribe(
      data => {
        this.vozila = data;
        console.log(data);

        this.isVoziloLoaded = true;
      },
      error => console.log(error)
    );
  }

  getVoziloSve() {
    this.crudService.getData("vozilo/lov?ops_id=0&mes_id=0&jav_pred_id=0").subscribe(
      data => {
        this.voziloSvi= data;
        console.log(data);

        this.isVoziloLoaded = true;
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

  getDataJavnoPreduzece() {
    this.crudService.getData("javno_pred/lov?ops_id="+this.opstinaId+"&mes_id="+this.mestoId).subscribe(
      data => {this.javnoPreduzeceSve = data;
        console.log(data);
        this.isJavnoPreduzeceLoaded = true;
      },
      error => {console.log(error);}
    );
  }

  onOpstinaSelected(selected: CompleterItem) {
    console.log('izabrana opstina: ' + selected);

    if(selected!==null){
      this.opstinaId = selected.originalObject.id;
      this.getMesta(selected.originalObject.id);
    } else {
      this.opstinaId = 0;
    }

    this.getDataJavnoPreduzece();
    this.getVozilo();
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
    this.getDataJavnoPreduzece();
    this.getVozilo();
  }

  onJavnoPreduzeceSelected(){
    this.getVozilo();
  }

  izvrsiPrenosVozilo(){
    for (var i = 0; i < this.voziloIzbor.length; i++) {
      if(!this.proveriVoziloKrajnjiIzbor(this.voziloIzbor[i])){
        for (var j = 0; j < this.voziloSvi.length; j++) {
          if( this.voziloIzbor[i] === this.voziloSvi[j].id ) {
            this.voziloKrajnjiIzbor.push(this.voziloIzbor[i]);
            this.voziloKrajnjiIzborPrikaz.push(this.voziloSvi[j]);
            break;
          }
        }
      }
    }

    this.voziloIzbor = [];
  }

  proveriVoziloKrajnjiIzbor(voziloId: any){

    for (var i = 0; i < this.voziloKrajnjiIzbor.length; i++) {
      if( this.voziloKrajnjiIzbor[i] === voziloId ) {
        return true;
      }
    }

    return false;
  }

  izvrsiSelectionTool(){
    console.log(this.voziloKrajnjiIzbor);
    this.onIzvrsiSelectionTool.emit(this.voziloKrajnjiIzbor);

  }

  obrisiVoziloKrajnjiIzbor(objId: any){

    for (var i = 0; i < this.voziloKrajnjiIzbor.length; i++) {
      if( this.voziloKrajnjiIzbor[i] === objId ) {
        this.voziloKrajnjiIzbor.splice(i, 1);
        break;
      }
    }

    for (var i = 0; i < this.voziloKrajnjiIzborPrikaz.length; i++) {
      if( this.voziloKrajnjiIzborPrikaz[i].id === objId ) {
        this.voziloKrajnjiIzborPrikaz.splice(i, 1);
        break;
      }
    }
  }

  obrisiVoziloKrajnjiIzborSve(){

    this.voziloKrajnjiIzbor = [];
    this.voziloKrajnjiIzborPrikaz = [];

  }


}
