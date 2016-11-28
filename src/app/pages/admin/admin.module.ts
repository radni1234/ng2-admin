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
import {JediniceMere} from "./components/Jedinice_mere/jedinice_mere.component";
import {JediniceMereService} from "./components/Jedinice_mere/jedinice_mere.services";
import { OpstinaComponent } from "./components/opstina/opstina.component";
import { CrudService } from "./components/services/crud.service";

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
    routing
  ],
  declarations: [
    AdminComponent,
    Korisnici,
    Korisnik,
    JediniceMere,
    OpstinaComponent
  ],
  providers: [
    KorisniciService,
    JediniceMereService,
    CrudService
  ]
})
export default class NewModule {}
