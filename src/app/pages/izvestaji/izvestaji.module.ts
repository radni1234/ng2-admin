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

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    FormsModule,
    MyDatePickerModule,
    MultiselectDropdownModule
  ],
  declarations: [
    IzvestajiComponent,
    IzvApsMesPot
  ],
  providers: [
    CrudService
  ]
})
export default class NewModule {}
