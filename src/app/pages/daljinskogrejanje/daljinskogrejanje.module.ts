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
import {PregledRacunaKotlarnicaComponent} from "./components/pregled_racuna/pregled_racuna.component";
import {KotlarnicaSelectionTool} from "./components/kotlarnica_selection_tool/kotlarnica_selection_tool.component";
import {IzvKotGodPotComponent} from "./izvestaji/godisnja_potrosnja/godisnja_potrosnja.component";
import {IzvKotMesPotComponent} from "./izvestaji/mesecna_potrosnja/mesecna_potrosnja.component";
import {IzvKotPotKotComponent} from "./izvestaji/potrosnja_kotlarnica/potrosnja_kotlarnica.component";
import {Ng2CompleterModule} from "ng2-completer";
import { NguiMapModule} from '@ngui/map';
import {IzvKotEfiComponent} from "./izvestaji/efikasnost_kotlarnica/efikasnost_kotlarnica.component";





@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    MyDatePickerModule,
    DropdownModule,
    AccordionModule,
    ModalModule,
    TabsModule,
    MultiselectDropdownModule,
    SharedModule,
    TabsModule,
    AppTranslationModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCQWnHCzfYLeXa1sDUS3C9wwaCGkH1YJNQ'})
  ],
  declarations: [
    DaljinskoGrejanjeComponent,
    KotlarnicaComponent,
    KotaoComponent,
    PodstanicaComponent,
    PodstanicaPotrosnjaComponent,
    BrojiloKotlarnicaComponent,
    BrojiloDobavljacKotlarnicaComponent,
    PregledRacunaKotlarnicaComponent,
    KotlarnicaSelectionTool,
    IzvKotGodPotComponent,
    IzvKotMesPotComponent,
    IzvKotPotKotComponent,
    IzvKotEfiComponent
  ],
  providers: [
    CrudService,
    DatumService,
    CanActivateAuthGuard,
    AuthenticationService
  ]
})
export default class NewModulDaljinskoGrejanje {}
