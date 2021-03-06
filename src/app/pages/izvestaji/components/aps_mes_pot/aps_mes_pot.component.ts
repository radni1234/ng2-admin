
import {Component, ViewEncapsulation, OnInit, ViewChild} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {Objekat} from "../../../javniobjekti/components/objekti/objekatdata";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {DayMonthYearPicker} from "../../../shared/components/day_month_year_picker/day_month_year_picker.component";
import {unescape} from "querystring";
import {Router} from "@angular/router";
//import {unescape} from "querystring";
declare let jsPDF : any;



@Component({
  selector: 'isem-tipstuba',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'aps_mes_pot.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class IzvApsMesPot implements OnInit {
  podaci:Array<any>;
  podaciZaTabelu:Array<any>;
  selektovaniObjekat: any;
  period: String;

  isObjekatLoaded: boolean;
  isEneTipLoaded: boolean;

  dana_mesec = {
    '01': 31,
    '02': 28,
    '03': 31,
    '04': 30,
    '05': 31,
    '06': 30,
    '07': 31,
    '08': 31,
    '09': 30,
    '10': 31,
    '11': 30,
    '12': 31

  }



  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

  optionsModel: number[] = []; // Default selection
  eneTipIzbor: number[] = [];

  myOptions: IMultiSelectOption[]; // = this.objekatLov;
  eneTipData: IMultiSelectOption[];


  // myOptions: IMultiSelectOption[] = [
  //   { id: 1, name: 'Option 1' },
  //   { id: 2, name: 'Option 2' },
  // ];

  mySettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 1,
    closeOnSelect: true,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };

  myTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: 'Izaberite objekat',
  };

  mySettingsTipEne: IMultiSelectSettings = {
    pullRight: true,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };

  myTextsTipEne: IMultiSelectTexts = {
    checkAll: 'Uključi sve',
    uncheckAll: 'Isključi sve',
    checked: 'odabrano',
    checkedPlural: 'odabrano',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: 'Izaberite energente',
  };

  @ViewChild(DayMonthYearPicker)
  private m: DayMonthYearPicker;

  constructor(private crudService: CrudService, private router: Router) {
  }

  ngOnInit() {
    this.getObjekte();
    // this.postaviDatume();
  }

  getObjekte() {
    this.crudService.getData("objekat/lov").subscribe(
      data => {
        this.myOptions = data;
        console.log(data);

        this.isObjekatLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getEnergentTip() {
    this.crudService.getData("energent_tip/lov?obj_id="+this.optionsModel).subscribe(
      data => {
        this.eneTipData = data;
        console.log(data);

        this.isEneTipLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onChangeObjekat(event) {
    console.log(event[0]);
    for(var i=0; i<this.myOptions.length; i++) {
      console.log(this.myOptions[i].id);
      if(this.myOptions[i].id==event[0]){

        this.selektovaniObjekat = this.myOptions[i].name;
        console.log(this.myOptions[i].name);
      }
    }
    this.getEnergentTip();
    console.log(this.optionsModel);
  }

  onChangeEneTip() {
    console.log(this.eneTipIzbor);
  }


  onSubmit() {


    console.log(this.m);
  //  console.log("izvestaj/aps_mes_pot?obj_id="+this.optionsModel+"&ene_tip_id="+this.eneTipIzbor+"&datum_od="+this.m.danOd+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+this.m.danDo+'.'+this.m.mesDo+'.'+this.m.godDo);

    this.crudService.getData("izvestaj/aps_mes_pot?obj_id="+this.optionsModel+"&ene_tip_id="+this.eneTipIzbor+"&datum_od="+this.m.danOd+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+this.m.danDo+'.'+this.m.mesDo+'.'+this.m.godDo).subscribe(
      data => {this.podaci = data;
      this.podaciZaTabelu = data;
      // periodu se smesta string koji se prikazuje u pdf-u
      this.period = this.m.mesOd + "." + this.m.godOd + "--" + this.m.mesDo + "." + this.m.godDo;
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

//   onYearChangeOd(event:any) {
//     console.log(event);
//     this.godOd = event;
//     console.log('15'+'.'+this.mesOd+'.'+this.godOd);
// }
//
//   onMonthChangeOd(event:any) {
//     console.log(event);
//     this.mesOd = event;
//     console.log('15'+'.'+this.mesOd+'.'+this.godOd);
//   }
//
//   onYearChangeDo(event:any) {
//     console.log(event);
//     this.godDo = event;
//     console.log('15'+'.'+this.mesDo+'.'+this.godDo);
//   }
//
//   onMonthChangeDo(event:any) {
//     console.log(event);
//     this.mesDo = event;
//     console.log('15'+'.'+this.mesDo+'.'+this.godDo);
//   }
//
//   postaviDatume(){
//     var today = new Date();
//
//     this.godOd = today.getFullYear().toString();
//     this.mesOd = '01';
//
//     this.godDo = today.getFullYear().toString();
//     this.mesDo;
//
//     var mesec = today.getMonth()+1;
//
//     if(mesec<10) {
//       this.mesDo='0'+mesec;
//     }
//
//   }

  convert(){

    var doc = new jsPDF();
    var col = ["Energent", "Godina", "Mesec", "Kolicina", "Kolicina [kWh]", "Emisija CO2", "Iznos [din]" ];
    var rows = [];
    var styles = {halign: 'right'};


    console.log(this.podaciZaTabelu);
    for(var key in this.podaciZaTabelu){
     // ovo sam uradio da mi ne prikazuje null-ove u tabeli
      if(this.podaciZaTabelu[key].energent== null){
        this.podaciZaTabelu[key].energent = "";
      }
      if(this.podaciZaTabelu[key].godina== null){
        this.podaciZaTabelu[key].godina = "";
      }
      if(this.podaciZaTabelu[key].mesec== null){
        this.podaciZaTabelu[key].mesec = "";
      }if(this.podaciZaTabelu[key].kolicina== null){
        this.podaciZaTabelu[key].kolicina = "";
      }
      if(this.podaciZaTabelu[key].kolicinaKwh== null){
        this.podaciZaTabelu[key].kolicinaKwh = "";
      }
      if(this.podaciZaTabelu[key].emisijaCo2== null){
        this.podaciZaTabelu[key].emisijaCo2 = "";
      }
      if(this.podaciZaTabelu[key].iznos== null){
        this.podaciZaTabelu[key].iznos = "";
      }
      var temp = [this.podaciZaTabelu[key].energent, this.podaciZaTabelu[key].godina, this.podaciZaTabelu[key].mesec, this.podaciZaTabelu[key].kolicina, this.podaciZaTabelu[key].kolicinaKwh, this.podaciZaTabelu[key].emisijaCo2, this.podaciZaTabelu[key].iznos];
      rows.push(temp);
    }
    doc.text(40, 10, "Apsolutna mesecna potrosnja za objekat: \n"+this.selektovaniObjekat+ "\nza period: "+ this.period);
    doc.autoTable(col, rows, {
      startY: 25,
      // margin: {horizontal: 7},
      // bodyStyles: {valign: 'top'},
      // styles: {overflow: 'linebreak', columnWidth: 'wrap'},
      // columnStyles: {text: {columnWidth: 'auto'}}
      //styles: {overflow: 'linebreak', columnWidth: 'wrap'}
      //  styles: {cellPadding: 0.5, fontSize: 4, halign: 'left'}
    });

    doc.save('ApsMesPot'+this.selektovaniObjekat+'.pdf');
  }

//funkcija za formiranje excela iz izvestaja 7
  htmlTableToExcel(table) {
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function(s) {return btoa(encodeURIComponent(s).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode(parseInt("0x" + p1));
    })); }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }); };

     if (!table.nodeType) table = document.getElementById(table);
     var ctx = { worksheet: "aps-mes-pot" || 'Worksheet', table: table.innerHTML };
//
     var anchor = document.createElement('a');
     anchor.href = uri + base64(format(template, ctx));
     anchor.download = "apsolutna_mesecna_potrosnja.xls";
     anchor.click();

  }


}
