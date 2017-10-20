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
    VodozahvatComponent

  ],
  providers: [
    CrudService,
    CanActivateAuthGuard,
    AuthenticationService
  ]
})
export default class NewModuleVodozahvat {}
