import {Component, OnInit, ViewChild} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {VodozahvatGodisnjaPotrosnja} from "./godisnja_potrosnja.data";
import {YearPicker} from "../../../shared/components/year_picker/year_picker.component";

@Component({
  selector: 'izvestaj_vodosnabdevanje_godisnja_potrosnja',
  templateUrl: 'godisnja_potrosnja.component.html'
})
export class IzvVodGodPotComponent implements OnInit {
  @ViewChild(YearPicker)
  private m: YearPicker;

  vodozahvatiId: any[];

  podaci: VodozahvatGodisnjaPotrosnja[];

  constructor(private crudService: CrudService) {

  }

  ngOnInit(){

  }

  upisiVodozahvate(vodozahvatiId: any[]) {
    this.vodozahvatiId = vodozahvatiId;
  }

  formirajIzvestaj(){

      this.crudService.getData("izvestaj/vod_god_pot?vod_id="+this.vodozahvatiId+"&datum_od="+'01.01.'+this.m.godOd+"&datum_do="+'31.12.'+this.m.godDo).subscribe(
        data => {this.podaci = data; console.log(data);},
        error => {console.log(error);}
      );
  }

}
