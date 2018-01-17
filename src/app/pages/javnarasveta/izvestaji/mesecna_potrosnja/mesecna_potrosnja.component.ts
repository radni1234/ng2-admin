import {Component, OnInit, ViewChild} from "@angular/core";
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import {CrudService} from "../../../services/crud.service";
import {RasvetaMesecnaPotrosnja} from "./mesecna_potrosnja.data";

@Component({
  selector: 'izvestaj_rasveta_mesecna_potrosnja',
  templateUrl: 'mesecna_potrosnja.component.html'
})
export class IzvRasMesPotComponent implements OnInit {
  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  trafoiId: any[];

  podaci: RasvetaMesecnaPotrosnja[];

  constructor(private crudService: CrudService) {

  }

  ngOnInit(){

  }

  upisiTrafoe(trafoiId: any[]) {
    this.trafoiId = trafoiId;
  }

  formirajIzvestaj(){

      this.crudService.getData("izvestaj/ras_mes_pot?trafo_id="+this.trafoiId+"&datum_od="+'15'+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+'15'+'.'+this.m.mesDo+'.'+this.m.godDo).subscribe(
        data => {this.podaci = data; console.log(data);},
        error => {console.log(error);}
      );
  }

}
