import {CommonModule} from "@angular/common";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./javnarasveta.routing";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {IzvApsMesPot} from "./components/aps_mes_pot/aps_mes_pot.component";
import {JavnaRasvetaComponent} from "./javnarasveta.component";
import {CrudService} from "../services/crud.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MyDatePickerModule} from "mydatepicker/dist/my-date-picker.module";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import SharedModule from "../shared/shared.module";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {AuthenticationService} from "../services/authentication.service";
import {TabsModule, DropdownModule, AccordionModule, ModalModule} from "ng2-bootstrap";
import {TrafoComponent} from "./components/trafo/trafo.component";
import {DatumService} from "../services/datum.service";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {AppTranslationModule} from "../../app.translation.module";
import {Ng2CompleterModule} from "ng2-completer";
import {StubComponent} from "./components/stub/stub.component";
import {SvetiljkaComponent} from "./components/svetiljka/svetiljka.component";
import {UnosRacunaComponent} from "./components/unos_racuna/unos_racuna.component";
import {RnTrafoComponent} from "./components/rn_trafo/rn_trafo.component";

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
    JavnaRasvetaComponent,
    TrafoComponent,
    StubComponent,
    SvetiljkaComponent,
    UnosRacunaComponent,
    RnTrafoComponent
  ],
  providers: [
    CrudService,
    DatumService,
    CanActivateAuthGuard,
    AuthenticationService
  ]
})
export default class NewModuleRasveta {}
