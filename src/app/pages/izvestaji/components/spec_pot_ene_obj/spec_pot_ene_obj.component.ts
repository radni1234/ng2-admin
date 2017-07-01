import {Component, ViewChild, OnInit} from '@angular/core';
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

@Component({
  selector: 'isem-tipstuba',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: 'spec_pot_ene_obj.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class IzvSpecPotEneObj implements OnInit {

  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;
  indikator: String = 'pov';
  labela: String = ' m2';

  podaci: any[] = new Array<any>();
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
    this.getEnergentTip();
  }

  upisiObjekte(objId: any[]) {
    this.objId = objId;
  }

  formirajIzvestaj(){
    switch(this.indikator) {
      case 'pov': {
        this.podaci.splice(0,this.podaci.length);
        this.labela = 'm2';

        break;
      }
      case 'zap': {
        this.podaci.splice(0,this.podaci.length);
        this.labela = 'm3';

        break;
      }
      case 'kor': {
        this.podaci.splice(0,this.podaci.length);
        this.labela = 'korisniku';

        break;
      }
      default: {
        //statements;
        break;
      }
    }


    this.crudService.getData("izvestaj/spec_pot_ene_obj?obj_id="+this.objId+"&ene_tip_id="+this.eneTipIzbor+"&datum_od="+'15'+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+'15'+'.'+this.m.mesDo+'.'+this.m.godDo+"&indikator="+this.indikator).subscribe(
      data => {this.podaci = data; console.log(data); this.isPodaciLoaded = true},
      error => {console.log(error);}
    );
  }

  getEnergentTip() {
    this.crudService.getData("energent_tip/lov").subscribe(
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
