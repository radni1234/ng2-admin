import {CommonModule} from "@angular/common";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./voznipark.routing";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {VozniParkComponent} from "./voznipark.component";
import {CrudService} from "../services/crud.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MyDatePickerModule} from "mydatepicker/dist/my-date-picker.module";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import SharedModule from "../shared/shared.module";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {AuthenticationService} from "../services/authentication.service";
import {TabsModule, DropdownModule, AccordionModule, ModalModule} from "ng2-bootstrap";
import {VoziloComponent} from "./components/vozilo/vozilo.component";
import {DatumService} from "../services/datum.service";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {AppTranslationModule} from "../../app.translation.module";
import {Ng2CompleterModule} from "ng2-completer";
import {VoziloEnegentComponent} from "./components/vozilo_energent/vozilo_energent.component";
import {VoziloPotrosnjaComponent} from "./components/vozilo_potrosnja/vozilo_potrosnja.component";
import {VoziloKilometrazaComponent} from "./components/vozilo_kilometraza/vozilo_kilometraza.component";
import {VozniparkSelectionTool} from "./components/voznipark_selection_tool/voznipark_selection_tool.component";
import {IzvUkPotEneVoz} from "./izvestaji/uk_pot_ene_voz/uk_pot_ene_voz.component";
import {IzvPregledVoz} from "./izvestaji/pregled_voz/pregled_voz.component";


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
    AppTranslationModule,
    Ng2CompleterModule
  ],
  declarations: [
    VozniParkComponent,
    VoziloComponent,
    VoziloEnegentComponent,
    VoziloPotrosnjaComponent,
    VoziloKilometrazaComponent,
    VozniparkSelectionTool,
    IzvUkPotEneVoz,
    IzvPregledVoz

  ],
  providers: [
    CrudService,
    DatumService,
    CanActivateAuthGuard,
    AuthenticationService
  ]
})
export default class NewModuleVozniPark {}
