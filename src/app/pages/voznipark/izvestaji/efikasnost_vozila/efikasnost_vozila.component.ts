import {Component, ViewChild, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import {CrudService} from "../../../services/crud.service";
import {DayMonthYearPicker} from "../../../shared/components/day_month_year_picker/day_month_year_picker.component";

@Component({
  selector: 'isem-efi-voz',
  templateUrl: 'efikasnost_vozila.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class IzvEfikasnostVoz implements OnInit {

  @ViewChild(DayMonthYearPicker)
  private m: DayMonthYearPicker;

  podaci:Array<any>;
  vozId: any[];

  private isPodaciLoaded: boolean = false;

  constructor(private crudService: CrudService, private router: Router) {
  }

  ngOnInit() {

  }

  upisiVozila(vozId: any[]) {
    this.vozId = vozId;
  }

  formirajIzvestaj(){

    console.log(this.m);

    this.crudService.getData("izvestaj/voz_efikasnost?voz_id="+this.vozId+"&datum_od="+this.m.danOd+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+this.m.danDo+'.'+this.m.mesDo+'.'+this.m.godDo).subscribe(
      data => {this.podaci = data; console.log(data); this.isPodaciLoaded = true},
      error => {console.log(error);}
    );
  }


}
