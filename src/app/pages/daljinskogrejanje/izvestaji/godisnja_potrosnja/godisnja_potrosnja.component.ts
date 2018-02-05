import {Component, OnInit, ViewChild} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {KotlarnicaGodisnjaPotrosnja} from "./godisnja_potrosnja.data";
import {YearPicker} from "../../../shared/components/year_picker/year_picker.component";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

@Component({
  selector: 'izvestaj_kotlarnica_godisnja_potrosnja',
  templateUrl: 'godisnja_potrosnja.component.html'
})
export class IzvKotGodPotComponent implements OnInit {
  @ViewChild(YearPicker)
  private m: YearPicker;

  kotlarniceId: any[];

  podaci: KotlarnicaGodisnjaPotrosnja[];

  isEneTipLoaded: boolean;

  eneTipIzbor: number[] = [];
  eneTipData: IMultiSelectOption[];

  mySettingsTipEne: IMultiSelectSettings = {
    pullRight: true,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };

  myTextsTipEne: IMultiSelectTexts = {
    checkAll: 'Uključi sve',
    uncheckAll: 'Isključi sve',
    checked: 'odabrano',
    checkedPlural: 'odabrano',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: 'Izaberite energente',
  };


  constructor(private crudService: CrudService) {

  }

  ngOnInit(){
    this.getEnergentTip();
  }

  getEnergentTip() {
    this.crudService.getData("energent_tip/kot_lov").subscribe(
      data => {
        this.eneTipData = data;
        console.log(data);

        this.isEneTipLoaded = true;
      },
      error => {console.log(error); }
    );
  }

  onChangeEneTip() {
    console.log(this.eneTipIzbor);
  }

  upisiKotlarnice(kotlarniceId: any[]) {
    this.kotlarniceId = kotlarniceId;
  }

  formirajIzvestaj(){

      this.crudService.getData("izvestaj/kot_god_pot?kot_id="+this.kotlarniceId+"&ene_tip_id="+this.eneTipIzbor+"&datum_od="+'01.01.'+this.m.godOd+"&datum_do="+'31.12.'+this.m.godDo).subscribe(
        data => {this.podaci = data; console.log(data);},
        error => {console.log(error);}
      );
  }

}
