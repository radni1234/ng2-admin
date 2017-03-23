import {NgModule} from "@angular/core";
import {MonthYearPicker} from "./components/month_year_picker/month_year_picker.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SelectionTool} from "./components/selection_tool/selection_tool.component";
import {Ng2CompleterModule} from "ng2-completer";
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {NgaModule} from "../../theme/nga.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgaModule,
    Ng2CompleterModule,
    MultiselectDropdownModule
  ],
  declarations: [ MonthYearPicker, SelectionTool ],
  exports: [ MonthYearPicker, SelectionTool ]
})

export default class SharedModule {}
