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
import {PointReplacerPipe} from "./components/poin_replacer_pipe/point_replacer_pipe";
import {AppTranslationModule} from "../../app.translation.module";
import {SelectionToolDobavljac} from "./components/selection_tool_dobavljac/selection_tool_dobavaljac.component";
import {UploadComponent} from "./components/upload/upload.component";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgaModule,
    Ng2CompleterModule,
    MultiselectDropdownModule,
    AppTranslationModule
  ],
  declarations: [ YearPicker,
    MonthYearPicker,
    DayMonthYearPicker,
    SelectionTool,
    SelectionToolOne,
    SelectionToolNacFin,
    PointReplacerPipe,
    SelectionToolDobavljac,
    UploadComponent
  ],
  exports: [ YearPicker,
    MonthYearPicker,
    DayMonthYearPicker,
    SelectionTool,
    SelectionToolOne,
    SelectionToolNacFin,
    PointReplacerPipe,
    SelectionToolDobavljac,
    UploadComponent
   ]
})

export default class SharedModule {}
