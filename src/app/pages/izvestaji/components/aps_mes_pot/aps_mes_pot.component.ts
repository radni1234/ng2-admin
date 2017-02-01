
import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {CrudService} from "../../../services/crud.service";

@Component({
  selector: 'isem-tipstuba',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'aps_mes_pot.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class IzvApsMesPot implements OnInit {
  podaci:Array<any>;

  constructor(private crudService: CrudService) {
  }

  ngOnInit() {
    this.getData("obj_id=362");
  }

  getData(uslov: string) {
    this.crudService.getIzvestaj("izvestaj/aps_mes_pot", uslov).subscribe(
      data => {this.podaci = data; console.log(data);},
      error => console.log(error)
    );
  }

}
