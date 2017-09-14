import {CommonModule} from "@angular/common";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./daljinskogrejanje.routing";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {IzvApsMesPot} from "./components/aps_mes_pot/aps_mes_pot.component";
import {CrudService} from "../services/crud.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MyDatePickerModule} from "mydatepicker/dist/my-date-picker.module";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import SharedModule from "../shared/shared.module";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {AuthenticationService} from "../services/authentication.service";
import {TabsModule, DropdownModule, AccordionModule, ModalModule} from "ng2-bootstrap";
import {KotlarnicaComponent} from "./components/kotlarnica/kotlarnica.component";
import {DaljinskoGrejanjeComponent} from "./daljinskogrejanje.component";
import {AppTranslationModule} from "../../app.translation.module";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {KotaoComponent} from "./components/kotao/kotao.component";
import {PodstanicaComponent} from "./components/podstanica/podstanica.component";
import {PodstanicaPotrosnjaComponent} from "./components/podstanica_potrosnja/podstanica_potrosnja.component";
import {DatumService} from "../services/datum.service";
import {BrojiloKotlarnicaComponent} from "./components/brojilo/brojilo.component";
import {BrojiloDobavljacKotlarnicaComponent} from "./components/brojilo_dobavljac/brojilo_dobavljac.component";





@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    MyDatePickerModule,
    DropdownModule,
    AccordionModule,
    ModalModule,
    TabsModule,
    MultiselectDropdownModule,
    SharedModule,
    TabsModule,
    AppTranslationModule
  ],
  declarations: [
    DaljinskoGrejanjeComponent,
    KotlarnicaComponent,
    KotaoComponent,
    PodstanicaComponent,
    PodstanicaPotrosnjaComponent,
    BrojiloKotlarnicaComponent,
    BrojiloDobavljacKotlarnicaComponent
  ],
  providers: [
    CrudService,
    DatumService,
    CanActivateAuthGuard,
    AuthenticationService
  ]
})
export default class NewModulDaljinskoGrejanje {}
