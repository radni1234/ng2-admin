import {Component, ViewChild, OnInit} from '@angular/core';
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

@Component({
  selector: 'isem-tipstuba',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: 'preg_obj.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class IzvPregObj implements OnInit {

  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  podaci:Array<any>;
  eneTipData: IMultiSelectOption[];
  objId: any[];

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

  }

  upisiObjekte(objId: any[]) {
    this.objId = objId;
  }

  formirajIzvestaj(){
    this.crudService.getData("izvestaj/preg_obj?obj_id="+this.objId).subscribe(
      data => {this.podaci = data; console.log(data); this.isPodaciLoaded = true},
      error => {console.log(error);}
    );
  }

}
