import {CommonModule} from "@angular/common";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./izvestaji.routing";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {IzvApsMesPot} from "./components/aps_mes_pot/aps_mes_pot.component";
import {IzvestajiComponent} from "./izvestaji.component";
import {CrudService} from "../services/crud.service";
import {FormsModule} from "@angular/forms";
import {MyDatePickerModule} from "mydatepicker/dist/my-date-picker.module";
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import SharedModule from "../shared/shared.module";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {AuthenticationService} from "../services/authentication.service";
import {IzvUkPotEneObj} from "./components/uk_pot_ene_obj/uk_pot_ene_obj.component";
import {IzvApsGodPot} from "./components/aps_god_pot/aps_god_pot.component";
import {IzvSpecGodPot} from "./components/spec_god_pot/spec_god_pot.component";
import {IzvSpecMesPot} from "./components/spec_mes_pot/spec_mes_pot.component";
import {IzvUkPotObj} from "./components/uk_pot_obj/uk_pot_obj.component";
import {IzvSpecPotEneObj} from "./components/spec_pot_ene_obj/spec_pot_ene_obj.component";
import {IzvEfikObj} from "./components/efik_obj/efik_obj.component";
import {IzvPregObj} from "./components/preg_obj/preg_obj.component";

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    FormsModule,
    MyDatePickerModule,
    MultiselectDropdownModule,
    SharedModule
  ],
  declarations: [
    IzvestajiComponent,
    IzvApsMesPot,
    IzvUkPotObj,
    IzvEfikObj,
    IzvApsGodPot,
    IzvSpecGodPot,
    IzvSpecMesPot,
    IzvUkPotEneObj,
    IzvSpecPotEneObj,
    IzvPregObj
  ],
  providers: [
    CrudService,
    CanActivateAuthGuard,
    AuthenticationService
  ]
})
export default class NewModuleIzvestaji {}
