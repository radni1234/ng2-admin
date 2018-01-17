import {Component, OnInit, ViewChild} from "@angular/core";
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import {CrudService} from "../../../services/crud.service";
import {RasvetaGodisnjaPotrosnja} from "./godisnja_potrosnja.data";

@Component({
  selector: 'izvestaj_rasveta_godisnja_potrosnja',
  templateUrl: 'godisnja_potrosnja.component.html'
})
export class IzvRasGodPotComponent implements OnInit {
  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  trafoiId: any[];

  podaci: RasvetaGodisnjaPotrosnja[];

  constructor(private crudService: CrudService) {

  }

  ngOnInit(){

  }

  upisiTrafoe(trafoiId: any[]) {
    this.trafoiId = trafoiId;
  }

  formirajIzvestaj(){

      this.crudService.getData("izvestaj/ras_god_pot?trafo_id="+this.trafoiId+"&datum_od="+'15'+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+'15'+'.'+this.m.mesDo+'.'+this.m.godDo).subscribe(
        data => {this.podaci = data; console.log(data);},
        error => {console.log(error);}
      );
  }

}
