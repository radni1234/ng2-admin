import {Component, OnInit, ViewChild} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {VodozahvatGodisnjaPotrosnja} from "./godisnja_potrosnja.data";
import {YearPicker} from "../../../shared/components/year_picker/year_picker.component";
import {VodozahvatSelectionToolData} from "../../components/vodozahvat_selection_tool/vodozahvat_selection_tool.data";

@Component({
  selector: 'izvestaj_vodosnabdevanje_godisnja_potrosnja',
  templateUrl: 'godisnja_potrosnja.component.html'
})
export class IzvVodGodPotComponent implements OnInit {
  @ViewChild(YearPicker)
  private m: YearPicker;

  vodozahvatiId: any[];
  vodozahvatGrupaId: number;

  podaci: VodozahvatGodisnjaPotrosnja[];

  constructor(private crudService: CrudService) {

  }

  ngOnInit(){

  }

  // upisiVodozahvate(vodozahvatiId: any[]) {
  //   this.vodozahvatiId = vodozahvatiId;
  // }

  upisiVodozahvate(data: VodozahvatSelectionToolData) {
    console.log(data.vodozahvatGrupaId);
    console.log(data.vodozahvatKrajnjiIzbor);

    this.vodozahvatiId = data.vodozahvatKrajnjiIzbor;
    this.vodozahvatGrupaId = data.vodozahvatGrupaId;
  }

  formirajIzvestaj(){

      this.crudService.getData("izvestaj/vod_god_pot?grupa_id="+this.vodozahvatGrupaId+"&vod_id="+this.vodozahvatiId+"&datum_od="+'01.01.'+this.m.godOd+"&datum_do="+'31.12.'+this.m.godDo).subscribe(
        data => {this.podaci = data; console.log(data);},
        error => {console.log(error);}
      );
  }

}
