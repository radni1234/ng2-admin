import {NgModule} from "@angular/core";
import {MonthYearPicker} from "./components/month_year_picker/month_year_picker.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SelectionTool} from "./components/selection_tool/selection_tool.component";
import {Ng2CompleterModule} from "ng2-completer";
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {NgaModule} from "../../theme/nga.module";
import {SelectionToolOne} from "./components/selection_tool_one/selection_tool_one.component";
import {SelectionToolNacFin} from "./components/selection_tool_nac_fin/selection_tool_nac_fin.component";
import {DayMonthYearPicker} from "./components/day_month_year_picker/day_month_year_picker.component";
import {YearPicker} from "./components/year_picker/year_picker.component";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgaModule,
    Ng2CompleterModule,
    MultiselectDropdownModule
  ],
  declarations: [ YearPicker, MonthYearPicker, DayMonthYearPicker, SelectionTool, SelectionToolOne, SelectionToolNacFin ],
  exports: [ YearPicker, MonthYearPicker, DayMonthYearPicker, SelectionTool, SelectionToolOne, SelectionToolNacFin ]
})

export default class SharedModule {}
