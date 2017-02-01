import {CommonModule} from "@angular/common";
import {NgaModule} from "../../theme/nga.module";
import {routing} from "./izvestaji.routing";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {IzvApsMesPot} from "./components/aps_mes_pot/aps_mes_pot.component";
import {IzvestajiComponent} from "./izvestaji.component";
import {CrudService} from "../services/crud.service";

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
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
