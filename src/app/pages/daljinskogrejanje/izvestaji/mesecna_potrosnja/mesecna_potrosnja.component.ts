import {Component, OnInit, ViewChild} from "@angular/core";
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import {CrudService} from "../../../services/crud.service";
import {KotlarnicaMesecnaPotrosnja} from "./mesecna_potrosnja.data";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

@Component({
  selector: 'izvestaj_kotlarnica_mesecna_potrosnja',
  templateUrl: 'mesecna_potrosnja.component.html'
})
export class IzvKotMesPotComponent implements OnInit {
  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  kotlarniceId: any[];

  podaci: KotlarnicaMesecnaPotrosnja[];

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

    this.crudService.getData("izvestaj/kot_mes_pot?kot_id="+this.kotlarniceId+"&ene_tip_id="+this.eneTipIzbor+"&datum_od="+'01.01.'+this.m.godOd+"&datum_do="+'31.12.'+this.m.godDo).subscribe(
      data => {this.podaci = data; console.log(data);},
      error => {console.log(error);}
    );
  }
}
