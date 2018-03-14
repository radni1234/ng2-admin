import {Component, OnInit, ViewChild} from "@angular/core";
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import {CrudService} from "../../../services/crud.service";
import {KotlarnicaEfikasnost} from "./efikasnost_kotlarnica.data";


@Component({
  selector: 'izvestaj_kotlarnica_efikasnost',
  templateUrl: 'efikasnost_kotlarnica.component.html'
})
export class IzvKotEfiComponent implements OnInit {
  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  kotlarniceId: any[];

  podaci: KotlarnicaEfikasnost[];


  constructor(private crudService: CrudService) {

  }

  ngOnInit(){

  }

  upisiKotlarnice(kotlarniceId: any[]) {
    this.kotlarniceId = kotlarniceId;
  }

  formirajIzvestaj(){

    this.crudService.getData("izvestaj/kot_efikasnost?kot_id="+this.kotlarniceId+"&datum_od="+'01.01.'+this.m.godOd+"&datum_do="+'31.12.'+this.m.godDo).subscribe(
      data => {this.podaci = data; console.log(data);},
      error => {console.log(error);}
    );
  }

}
