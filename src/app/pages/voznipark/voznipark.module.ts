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
    VoziloComponent

  ],
  providers: [
    CrudService,
    DatumService,
    CanActivateAuthGuard,
    AuthenticationService
  ]
})
export default class NewModuleVozniPark {}
