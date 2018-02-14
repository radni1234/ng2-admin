
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {CompleterService, CompleterData, CompleterItem} from "ng2-completer";
import {Opstina, Mesto} from "../../../admin/components/opstina/opstinadata";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {VodozahvatGrupa} from "../../../admin/components/vodozahvat_grupa/vodozahvat_grupa.data";


@Component({
  selector: 'vodozahvat-selection-tool',
  templateUrl: 'vodozahvat_selection_tool.component.html'
})
export class VodozahvatSelectionTool implements OnInit{

  @Output() onIzvrsiSelectionTool = new EventEmitter<number[]>();

  private dataServiceOpstine: CompleterData;
  private dataServiceMesta: CompleterData;

  public isOpstineLoaded:boolean = false;
  public isMestaLoaded:boolean = false;

  private opstine: Opstina[];
  private mesta: Mesto[];

  private opstinaId: number = 0;
  private mestoId: number = 0;

  vodozahvatGrupaSve: VodozahvatGrupa[];
  vodozahvatGrupaId: number = 1;
  isVodozahvatGrupaLoaded: boolean = false;

  isVodozahvatLoaded: boolean = false;

  vodozahvati: IMultiSelectOption[] = new Array<IMultiSelectOption>();
  selVodozahvati: IMultiSelectOption[] = new Array<IMultiSelectOption>();

  vodozahvatSvi: any[];
  vodozahvatKrajnjiIzbor: number[] = [];
  vodozahvatKrajnjiIzborPrikaz: any[] = [];

  vodozahvatIzbor: number[] = []; // Default selection
  selVodozahvatIzbor: number[] = []; // Default selection

  vodozahvatSettings: IMultiSelectSettings = {
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

  vodozahvatTexts: IMultiSelectTexts = {
    checkAll: 'Selektuj sve',
    uncheckAll: 'Deselektuj all',
    checked: 'selektovan',
    checkedPlural: 'selektovani',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: '  -- I z b o r --  ',
  };

  errorMessage:string;

  tekst1: string;
  tekst2: string;
  tekst3: string;

  constructor(private crudService: CrudService, private completerService: CompleterService) {

  }

  ngOnInit(){
    this.postaviTekst();
    this.getOpstine();
    this.getVodozahvatSve();
    this.getDataVodozahvatGrupa();
  }

  getVodozahvat() {
    this.crudService.getData("vodozahvat/lov?ops_id="+this.opstinaId+"&mes_id="+this.mestoId+"&grupa_id="+this.vodozahvatGrupaId).subscribe(
      data => {
        this.vodozahvati = data;
        console.log(data);

        this.isVodozahvatLoaded = true;
      },
      error => console.log(error)
    );
  }

  getVodozahvatSve() {
    this.crudService.getData("vodozahvat/lov?ops_id=0&mes_id=0&grupa_id=0").subscribe(
      data => {
        this.vodozahvatSvi= data;
        console.log(data);

        this.isVodozahvatLoaded = true;
      },
      error => console.log(error)
    );
  }

  getDataVodozahvatGrupa() {
    this.crudService.getData("vodozahvat_grupa/sve").subscribe(
      data => {
        this.vodozahvatGrupaSve = data;
        this.isVodozahvatGrupaLoaded = true;
      },
      error => {console.log(error);}
    );
  }

  public onVodozahvatGrupaSelected(id: number) {
    console.log("id selektovani je: " + id);
    this.getVodozahvat();
    this.obrisiVodozahvatKrajnjiIzborSve();
    this.postaviTekst();


  }

  postaviTekst(){
    if (this.vodozahvatGrupaId == 1) {
      this.tekst1 = "Vodozahvat";
      this.tekst2 = "Odabrani vodozahvati";
      this.tekst3 = "Obriši vodozahvat";
    } else if (this.vodozahvatGrupaId == 2) {
      this.tekst1 = "Fekalna stanica";
      this.tekst2 = "Odabrane fekalne stanice";
      this.tekst3 = "Obriši fekalnu stanicu";
    }
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

    this.getVodozahvat();
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
    this.getVodozahvat();
  }

  izvrsiPrenosVodozahvat(){
    for (var i = 0; i < this.vodozahvatIzbor.length; i++) {
      if(!this.proveriVodozahvatKrajnjiIzbor(this.vodozahvatIzbor[i])){
        for (var j = 0; j < this.vodozahvatSvi.length; j++) {
          if( this.vodozahvatIzbor[i] === this.vodozahvatSvi[j].id ) {
            this.vodozahvatKrajnjiIzbor.push(this.vodozahvatIzbor[i]);
            this.vodozahvatKrajnjiIzborPrikaz.push(this.vodozahvatSvi[j]);
            break;
          }
        }
      }
    }

    this.vodozahvatIzbor = [];
  }

  proveriVodozahvatKrajnjiIzbor(vodozahvatId: any){

    for (var i = 0; i < this.vodozahvatKrajnjiIzbor.length; i++) {
      if( this.vodozahvatKrajnjiIzbor[i] === vodozahvatId ) {
        return true;
      }
    }

    return false;
  }

  izvrsiSelectionTool(){
    console.log(this.vodozahvatKrajnjiIzbor);
    this.onIzvrsiSelectionTool.emit(this.vodozahvatKrajnjiIzbor);

  }

  obrisiVodozahvatKrajnjiIzbor(id: any){

    for (var i = 0; i < this.vodozahvatKrajnjiIzbor.length; i++) {
      if( this.vodozahvatKrajnjiIzbor[i] === id ) {
        this.vodozahvatKrajnjiIzbor.splice(i, 1);
        break;
      }
    }

    for (var i = 0; i < this.vodozahvatKrajnjiIzborPrikaz.length; i++) {
      if( this.vodozahvatKrajnjiIzborPrikaz[i].id === id ) {
        this.vodozahvatKrajnjiIzborPrikaz.splice(i, 1);
        break;
      }
    }
  }

  obrisiVodozahvatKrajnjiIzborSve(){

    this.vodozahvatKrajnjiIzbor = [];
    this.vodozahvatKrajnjiIzborPrikaz = [];

  }


}
