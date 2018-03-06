import {Component, OnInit, ViewChild} from "@angular/core";
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import {CrudService} from "../../../services/crud.service";
import {VodozahvatMesecnaPotrosnja} from "./mesecna_potrosnja.data";
import {VodozahvatSelectionToolData} from "../../components/vodozahvat_selection_tool/vodozahvat_selection_tool.data";

@Component({
  selector: 'izvestaj_vodozahvat_mesecna_potrosnja',
  templateUrl: 'mesecna_potrosnja.component.html'
})
export class IzvVodMesPotComponent implements OnInit {
  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  vodozahvatiId: any[];
  vodozahvatGrupaId: number;

  podaci: VodozahvatMesecnaPotrosnja[];

  constructor(private crudService: CrudService) {

  }

  ngOnInit(){

  }

  upisiVodozahvate(data: VodozahvatSelectionToolData) {
    console.log(data.vodozahvatGrupaId);
    console.log(data.vodozahvatKrajnjiIzbor);

    this.vodozahvatiId = data.vodozahvatKrajnjiIzbor;
    this.vodozahvatGrupaId = data.vodozahvatGrupaId;
  }

  formirajIzvestaj(){

      this.crudService.getData("izvestaj/vod_mes_pot?grupa_id="+this.vodozahvatGrupaId+"&vod_id="+this.vodozahvatiId+"&datum_od="+'15'+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+'15'+'.'+this.m.mesDo+'.'+this.m.godDo).subscribe(
        data => {this.podaci = data; console.log(data);},
        error => {console.log(error);}
      );
  }

}
