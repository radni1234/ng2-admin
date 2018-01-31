import {Component, OnInit, ViewChild} from "@angular/core";
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import {CrudService} from "../../../services/crud.service";
import {VodozahvatPotrosnja} from "./potrosnja_vodozahvat.data";

@Component({
  selector: 'izvestaj_rasveta_godisnja_potrosnja',
  templateUrl: 'potrosnja_vodozahvat.component.html'
})
export class IzvVodPotVodComponent implements OnInit {
  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  vodozahvatiId: any[];

  podaci: VodozahvatPotrosnja[];

  constructor(private crudService: CrudService) {

  }

  ngOnInit(){

  }

  upisiVodozahvate(vodozahvatiId: any[]) {
    this.vodozahvatiId = vodozahvatiId;
  }

  formirajIzvestaj(){

      this.crudService.getData("izvestaj/vod_pot_po_vod?vod_id="+this.vodozahvatiId+"&datum_od="+'15'+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+'15'+'.'+this.m.mesDo+'.'+this.m.godDo).subscribe(
        data => {this.podaci = data; console.log(data);},
        error => {console.log(error);}
      );
  }

}
