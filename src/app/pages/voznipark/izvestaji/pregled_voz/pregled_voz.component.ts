import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CrudService} from "../../../services/crud.service";

@Component({
  selector: 'isem-pregled-voz',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: 'pregled_voz.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class IzvPregledVoz implements OnInit {


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
    this.crudService.getData("izvestaj/voz_pregled?voz_id="+this.vozId).subscribe(
      data => {this.podaci = data; console.log(data); this.isPodaciLoaded = true},
      error => {console.log(error);}
    );
  }


}
