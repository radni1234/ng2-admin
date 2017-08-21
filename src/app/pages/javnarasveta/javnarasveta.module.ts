import {CommonModule} from "@angular/common";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./javnarasveta.routing";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {IzvApsMesPot} from "./components/aps_mes_pot/aps_mes_pot.component";
import {JavnaRasvetaComponent} from "./javnarasveta.component";
import {CrudService} from "../services/crud.service";
import {FormsModule} from "@angular/forms";
import {MyDatePickerModule} from "mydatepicker/dist/my-date-picker.module";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import SharedModule from "../shared/shared.module";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {AuthenticationService} from "../services/authentication.service";
import {TabsModule} from "ng2-bootstrap";

import {TrafostaniceComponent} from "./components/trafostanice.component";



@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    FormsModule,
    MyDatePickerModule,
    MultiselectDropdownModule,
    SharedModule,
    TabsModule,
  ],
  declarations: [
    JavnaRasvetaComponent,
    TrafostaniceComponent
  ],
  providers: [
    CrudService,
    CanActivateAuthGuard,
    AuthenticationService
  ]
})
export default class NewModuleIzvestaji {}
