import {Component, OnInit, ViewChild} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {RasvetaGodisnjaPotrosnja} from "./godisnja_potrosnja.data";
import {YearPicker} from "../../../shared/components/year_picker/year_picker.component";

@Component({
  selector: 'izvestaj_rasveta_godisnja_potrosnja',
  templateUrl: 'godisnja_potrosnja.component.html'
})
export class IzvRasGodPotComponent implements OnInit {
  @ViewChild(YearPicker)
  private m: YearPicker;

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

      this.crudService.getData("izvestaj/ras_god_pot?trafo_id="+this.trafoiId+"&datum_od="+'01.01.'+this.m.godOd+"&datum_do="+'31.12.'+this.m.godDo).subscribe(
        data => {this.podaci = data; console.log(data);},
        error => {console.log(error);}
      );
  }

}
