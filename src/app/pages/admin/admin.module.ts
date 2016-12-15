import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AdminComponent } from './admin.component';
import { Korisnici } from './components/korisnici/korisnici.component.ts';
import { Korisnik } from './components/korisnici/korisnik.component.ts';
import { routing } from './admin.routing';
import {Ng2SmartTableModule} from "ng2-smart-table/build/ng2-smart-table";
import {NgaModule} from "../../theme/nga.module";
import {KorisniciService} from "./components/korisnici/korisnici.services.ts";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2CompleterModule } from "ng2-completer";
import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';

import { CrudService } from "../services/crud.service";

import {JediniceMereComponent} from "./components/jedinice_mere/jedinice_mere.component";
import {OpstinaComponent} from "./components/opstina/opstina.component";
import {UlogaComponent} from "./components/uloga/uloga.component";
import {GrupaComponent} from "./components/grupe/grupa.component";
import {NacinFinansiranjaComponent} from "./components/nacin_finansiranja/nacin_finansiranja.component";
import {GodinaComponent} from "./components/godine/godine.component";
import {StepenDaniComponent} from "./components/stepen_dani/stepen_dani.component";
import {TipSvetiljkeComponent} from "./components/tip_svetiljke/tip_svetiljke.component";
import {TipStubaComponent} from "./components/tip_stuba/tip_stuba.component";
import {EnergentTipComponent} from "./components/energent_tip/energent_tip.component";
import {BrojiloTipComponent} from "./components/brojilo_tip/brojilo_tip.component";
import {RezimMerenjaComponent} from "./components/rezim_merenja/rezim_merenja.component";
import {EnergentComponent} from "./components/energent/energent.component";

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
    routing
  ],
  declarations: [
    AdminComponent,
    Korisnici,
    Korisnik,
    JediniceMereComponent,
    OpstinaComponent,
    UlogaComponent,
    GrupaComponent,
    NacinFinansiranjaComponent,
    GodinaComponent,
    StepenDaniComponent,
    TipSvetiljkeComponent,
    TipStubaComponent,
    EnergentTipComponent,
    BrojiloTipComponent,
    RezimMerenjaComponent,
    EnergentComponent
  ],
  providers: [
    KorisniciService,
    CrudService
  ]
})
export default class NewModule {}
