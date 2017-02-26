
import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {Objekat} from "../../../javniobjekti/components/objekti/objekatdata";

@Component({
  selector: 'isem-tipstuba',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'aps_mes_pot.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class IzvApsMesPot implements OnInit {
  podaci:Array<any>;
  objekat: Array<Objekat>;
  isObjekatLoaded: boolean;
  objekatId: number;

  datumOd: String;
  datumDo: String;

  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

  constructor(private crudService: CrudService) {
  }

  ngOnInit() {
    this.getObjekte();
    this.odrediDanasnjiDatum();
  }

  getObjekte() {
    this.crudService.getPodatke("objekat/sve").subscribe(
      data => {
        this.objekat = data;
        console.log(data);

        this.isObjekatLoaded = true;
      },
      error => console.log(error)
    );
  }

  onSubmit() {
    this.crudService.getPodatke("izvestaj/aps_mes_pot?obj_id="+this.objekatId+"&datum_od="+this.datumOd+"&datum_do="+this.datumDo).subscribe(
      data => {this.podaci = data; console.log(data);},
      error => console.log(error)
    );
  }

  onDatumOdChanged(event:any) {
    console.log('onDatumOdChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.datumOd = event.formatted;
  }

  onDatumDoChanged(event:any) {
    console.log('onDatumDoChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.datumDo = event.formatted;
  }

  odrediDanasnjiDatum(){
    var today:any = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

        if(dd<10) {
        dd='0'+dd
      }

      if(mm<10) {
        mm='0'+mm
      }

      this.datumDo = dd+'.'+mm+'.'+yyyy;

      this.datumOd = '01.01.2017';
  }
}
