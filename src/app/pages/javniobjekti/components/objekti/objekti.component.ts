import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';

import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'isem-objekti',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'objekti.component.html'
})

export class ObjektiComponent {

  isGrejanje: boolean = true;
  isRasveta: boolean = false;
  isHladjenje: boolean = false;

  ukljuciGrejanje(){
    this.isGrejanje = true;
    this.isHladjenje = false;
    this.isRasveta = false;
  }
  ukljuciHladjenje(){
    this.isGrejanje = false;
    this.isHladjenje = true;
    this.isRasveta = false;
  }
  ukljuciRasvetu(){
    this.isGrejanje = false;
    this.isHladjenje = false;
    this.isRasveta = true;
  }
}
