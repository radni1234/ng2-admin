
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {CompleterService, CompleterData, CompleterItem} from "ng2-completer";
import {Opstina, Mesto} from "../../../admin/components/opstina/opstinadata";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';


@Component({
  selector: 'kotlarnica-selection-tool',
  templateUrl: 'kotlarnica_selection_tool.component.html'
})
export class KotlarnicaSelectionTool implements OnInit{

  @Output() onIzvrsiSelectionTool = new EventEmitter<number[]>();

  private dataServiceOpstine: CompleterData;
  private dataServiceMesta: CompleterData;

  public isOpstineLoaded:boolean = false;
  public isMestaLoaded:boolean = false;

  private opstine: Opstina[];
  private mesta: Mesto[];

  private opstinaId: number = 0;
  private mestoId: number = 0;

  isKotlarnicaLoaded: boolean = false;

  kotlarnice: IMultiSelectOption[] = new Array<IMultiSelectOption>();
  selKotlarnice: IMultiSelectOption[] = new Array<IMultiSelectOption>();

  kotlarnicaSvi: any[];
  kotlarnicaKrajnjiIzbor: number[] = [];
  kotlarnicaKrajnjiIzborPrikaz: any[] = [];

  kotlarnicaIzbor: number[] = []; // Default selection
  selKotlarnicaIzbor: number[] = []; // Default selection

  kotlarnicaSettings: IMultiSelectSettings = {
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

  kotlarnicaTexts: IMultiSelectTexts = {
    checkAll: 'Selektuj sve',
    uncheckAll: 'Deselektuj all',
    checked: 'selektovan',
    checkedPlural: 'selektovani',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: 'Izaberite kotlarnice',
  };

  errorMessage:string;

  constructor(private crudService: CrudService, private completerService: CompleterService) {

  }

  ngOnInit(){
    this.getOpstine();
    this.getKotlarnicaSve();
  }

  getKotlarnica() {
    this.crudService.getData("kotlarnica/lov?ops_id="+this.opstinaId+"&mes_id="+this.mestoId).subscribe(
      data => {
        this.kotlarnice = data;
        console.log(data);

        this.isKotlarnicaLoaded = true;
      },
      error => console.log(error)
    );
  }

  getKotlarnicaSve() {
    this.crudService.getData("kotlarnica/lov?ops_id=0&mes_id=0").subscribe(
      data => {
        this.kotlarnicaSvi= data;
        console.log(data);

        this.isKotlarnicaLoaded = true;
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

    this.getKotlarnica();
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
    this.getKotlarnica();
  }

  izvrsiPrenosKotlarnica(){
    for (var i = 0; i < this.kotlarnicaIzbor.length; i++) {
      if(!this.proveriKotlarnicaKrajnjiIzbor(this.kotlarnicaIzbor[i])){
        for (var j = 0; j < this.kotlarnicaSvi.length; j++) {
          if( this.kotlarnicaIzbor[i] === this.kotlarnicaSvi[j].id ) {
            this.kotlarnicaKrajnjiIzbor.push(this.kotlarnicaIzbor[i]);
            this.kotlarnicaKrajnjiIzborPrikaz.push(this.kotlarnicaSvi[j]);
            break;
          }
        }
      }
    }

    this.kotlarnicaIzbor = [];
  }

  proveriKotlarnicaKrajnjiIzbor(kotlarnicaId: any){

    for (var i = 0; i < this.kotlarnicaKrajnjiIzbor.length; i++) {
      if( this.kotlarnicaKrajnjiIzbor[i] === kotlarnicaId ) {
        return true;
      }
    }

    return false;
  }

  izvrsiSelectionTool(){
    console.log(this.kotlarnicaKrajnjiIzbor);
    this.onIzvrsiSelectionTool.emit(this.kotlarnicaKrajnjiIzbor);

  }

  obrisiKotlarnicaKrajnjiIzbor(objId: any){

    for (var i = 0; i < this.kotlarnicaKrajnjiIzbor.length; i++) {
      if( this.kotlarnicaKrajnjiIzbor[i] === objId ) {
        this.kotlarnicaKrajnjiIzbor.splice(i, 1);
        break;
      }
    }

    for (var i = 0; i < this.kotlarnicaKrajnjiIzborPrikaz.length; i++) {
      if( this.kotlarnicaKrajnjiIzborPrikaz[i].id === objId ) {
        this.kotlarnicaKrajnjiIzborPrikaz.splice(i, 1);
        break;
      }
    }
  }

  obrisiKotlarnicaKrajnjiIzborSve(){

    this.kotlarnicaKrajnjiIzbor = [];
    this.kotlarnicaKrajnjiIzborPrikaz = [];

  }


}
