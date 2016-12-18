import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing } from './javniobjekti.routing.ts';
import {Ng2SmartTableModule} from "ng2-smart-table/build/ng2-smart-table";
import {NgaModule} from "../../theme/nga.module";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2CompleterModule } from "ng2-completer";
import {DropdownModule, ModalModule, AccordionModule, TabsModule} from 'ng2-bootstrap/ng2-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import {JavniObjektiComponent} from "./javniobjekti.component";
import {ObjektiComponent} from "./components/objekti/objekti.component";
import {CrudService} from "../services/crud.service";
import {ObjekatComponent} from "./components/objekti/objekat.component";
import {ObjekatTabComponent} from "./components/objekti/objekat_tabovi.component";
import { Ng2MapModule} from 'ng2-map';


;

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    DropdownModule,
    ModalModule,
    MyDatePickerModule,
    AccordionModule,
    TabsModule,
    Ng2MapModule,
    routing
  ],
  declarations: [
    JavniObjektiComponent,
    ObjektiComponent,
    ObjekatComponent,
    ObjekatTabComponent
  ],
  providers: [
    CrudService

  ]
})
export default class NewModule {}
