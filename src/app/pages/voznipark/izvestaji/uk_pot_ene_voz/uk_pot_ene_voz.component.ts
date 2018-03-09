import {Component, ViewChild, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import {CrudService} from "../../../services/crud.service";

@Component({
  selector: 'isem-uk-pot-ene-voz',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: 'uk_pot_ene_voz.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class IzvUkPotEneVoz implements OnInit {

  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  podaci:Array<any>;
  eneTipData: IMultiSelectOption[];
  vozId: any[];

  mySettingsTipEne: IMultiSelectSettings = {
    pullRight: true,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 10,
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

  private isPodaciLoaded: boolean = false;
  private isEneTipLoaded: boolean = false;

  private eneTipIzbor: number[] = [];

  constructor(private crudService: CrudService, private router: Router) {
  }

  ngOnInit() {
    this.getEnergentTip();
  }

  upisiVozila(vozId: any[]) {
    this.vozId = vozId;
  }

  formirajIzvestaj(){
    this.crudService.getData("izvestaj/voz_uk_pot_ene?voz_id="+this.vozId+"&ene_id="+this.eneTipIzbor+"&datum_od="+'15'+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+'15'+'.'+this.m.mesDo+'.'+this.m.godDo).subscribe(
      data => {this.podaci = data; console.log(data); this.isPodaciLoaded = true},
      error => {console.log(error);}
    );
  }

  getEnergentTip() {
    this.crudService.getData("energent/lov_vozilo").subscribe(
      data => {
        this.eneTipData = data;
        console.log(data);

        this.isEneTipLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onChangeEneTip() {
    console.log(this.eneTipIzbor);
  }
}
