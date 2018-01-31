import {CommonModule} from "@angular/common";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./vodosnabdevanje.routing";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {VodosnabdevanjeComponent} from "./vodosnabdevanje.component";
import {CrudService} from "../services/crud.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MyDatePickerModule} from "mydatepicker/dist/my-date-picker.module";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import SharedModule from "../shared/shared.module";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {AuthenticationService} from "../services/authentication.service";
import {TabsModule, DropdownModule, AccordionModule, ModalModule} from "ng2-bootstrap";
import {VodozahvatComponent} from "./components/vodozahvat/vodozahvat.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {AppTranslationModule} from "../../app.translation.module";
import {Ng2CompleterModule} from "ng2-completer";
import {RezervoarComponent} from "./components/rezervoar/rezervoar.component";
import {VodozahvatPumpaComponent} from "./components/pumpa/pumpa.component";
import {ProizvodnjaVodeComponent} from "./components/proizvodnja_vode/proizvodnja_vode.component";
import {BrojiloKotlarnicaComponent} from "./components/brojilo/brojilo.component";
import {BrojiloDobavljacVodozahvatComponent} from "./components/brojilo_dobavljac/brojilo_dobavljac.component";
import {PregledRacunaVodozahvatComponent} from "./components/pregled_racuna/pregled_racuna.component";
import {DatumService} from "../services/datum.service";
import {VodozahvatSelectionTool} from "./components/vodozahvat_selection_tool/vodozahvat_selection_tool.component";
import {IzvVodGodPotComponent} from "./izvestaji/godisnja_potrosnja/godisnja_potrosnja.component";
import {IzvVodMesPotComponent} from "./izvestaji/mesecna_potrosnja/mesecna_potrosnja.component";
import {IzvVodPotVodComponent} from "./izvestaji/potrosnja_vodozahvat/potrosnja_vodozahvat.component";


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
    AppTranslationModule
  ],
  declarations: [
    VodosnabdevanjeComponent,
    VodozahvatComponent,
    RezervoarComponent,
    VodozahvatPumpaComponent,
    ProizvodnjaVodeComponent,
    BrojiloKotlarnicaComponent,
    BrojiloDobavljacVodozahvatComponent,
    PregledRacunaVodozahvatComponent,
    VodozahvatSelectionTool,
    IzvVodGodPotComponent,
    IzvVodMesPotComponent,
    IzvVodPotVodComponent
  ],
  providers: [
    CrudService,
    DatumService,
    CanActivateAuthGuard,
    AuthenticationService
  ]
})
export default class NewModuleVodozahvat {}
