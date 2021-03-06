import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing } from './javniobjekti.routing.ts';
import {Ng2SmartTableModule} from "ng2-smart-table/build/ng2-smart-table";
import {NgaModule} from "../../theme/nga.module";
import { NguiMapModule} from '@ngui/map';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2CompleterModule } from "ng2-completer";
import {DropdownModule, ModalModule, AccordionModule, TabsModule} from 'ng2-bootstrap/ng2-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import {JavniObjektiComponent} from "./javniobjekti.component";
import {ObjektiComponent} from "./components/objekti/objekti.component";
import {CrudService} from "../services/crud.service";
import {DatumService} from "../services/datum.service";
import {EfekatPrimMera} from "./components/grafici/efek_prim_mera.component";
//import {nvD3} from 'ng2-nvd3';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {Cusum} from "./components/grafici/cusum.component";
import {Rasturanje} from "./components/grafici/rasturanje.component";

import {EnergyMix} from "./components/grafici/energymix.component";
import {EnergyMixPie} from "./components/grafici/energymixpie.component";

// import SharedModule from "../shared/shared.module";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {AuthenticationService} from "../services/authentication.service";
import {EnergyMixGod} from "./components/grafici/energymixgod.component";
import {PregledRacunaComponent} from "./components/pregled_racuna/pregled_racuna.component";
import {FileUploadComponent} from "./components/grafici/file-upload.component";
import {ObjekatMereComponent} from "./components/objekat_mere/objekat_mere.component";
import {AppTranslationModule} from "../../app.translation.module";
import {BrojiloComponent} from "./components/brojilo/brojilo.component";
import {BrojiloDobavljacComponent} from "./components/brojilo_dobavljac/brojilo_dobavljac.component";
import SharedModule from "../shared/shared.module";
import {ObjekatDokumentComponent} from "./components/objekat_dokument/objekat_dokument.component";

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
    MultiselectDropdownModule,
    routing,
    SharedModule,
    AppTranslationModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCQWnHCzfYLeXa1sDUS3C9wwaCGkH1YJNQ'})
  ],
  declarations: [
    JavniObjektiComponent,
    ObjektiComponent,
    EfekatPrimMera,
    Cusum,
    Rasturanje,
//    nvD3,
    EnergyMix,
    EnergyMixGod,
    EnergyMixPie,
    PregledRacunaComponent,
    EnergyMixPie,
    FileUploadComponent,
    ObjekatMereComponent,
    BrojiloComponent,
    BrojiloDobavljacComponent,
    ObjekatDokumentComponent
  ],
  providers: [
    CrudService,
    DatumService,
    CanActivateAuthGuard,
    AuthenticationService
  ]
})
export default class NewModuleObjekti {}
