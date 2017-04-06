// import {Component, OnInit} from '@angular/core';
// import {nvD3} from 'ng2-nvd3'
// declare let d3: any;
//
// @Component({
//   selector: 'main',
//   template: `
//     <h1>BBBBBBBBBBBBBBBBBBBBBBBBBBBBB</h1>
//     <div>
//       <nvd3 [options]="options" [data]="data"></nvd3>
//     </div>
//   `
// })
//
// export class Main implements OnInit{
//   options;
//   data;
//   ngOnInit(){
//     this.options = {
//       chart: {
//         type: 'discreteBarChart',
//         height: 450,
//         margin : {
//           top: 20,
//           right: 20,
//           bottom: 50,
//           left: 55
//         },
//         x: function(d){return d.label;},
//         y: function(d){return d.value;},
//         showValues: true,
//         valueFormat: function(d){
//           return d3.format(',.4f')(d);
//         },
//         duration: 500,
//         xAxis: {
//           axisLabel: 'X Axis'
//         },
//         yAxis: {
//           axisLabel: 'Y Axis',
//           axisLabelDistance: -10
//         }
//       }
//     }
//     this.data = [
//       {
//         key: "Cumulative Return",
//         values: [
//           {
//             "label" : "A" ,
//             "value" : -29.765957771107
//           } ,
//           {
//             "label" : "B" ,
//             "value" : 0
//           } ,
//           {
//             "label" : "C" ,
//             "value" : 32.807804682612
//           } ,
//           {
//             "label" : "D" ,
//             "value" : 196.45946739256
//           } ,
//           {
//             "label" : "E" ,
//             "value" : 0.19434030906893
//           } ,
//           {
//             "label" : "F" ,
//             "value" : -98.079782601442
//           } ,
//           {
//             "label" : "G" ,
//             "value" : -13.925743130903
//           } ,
//           {
//             "label" : "H" ,
//             "value" : -5.1387322875705
//           }
//         ]
//       }
//     ];
//   }
//
// }
import {Component, ViewChild} from '@angular/core';
import {CrudService} from "../../../services/crud.service";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import {Router} from "@angular/router";

// webpack html imports
declare let d3: any;

//import 'jspdf';
declare let jsPDF : any;

@Component({
  selector: 'tabs-demo',
  template: `
     <h1>GRAFIK</h1>
     
    <div class="panel panel-primary">
    
      <selection-tool (onIzvrsiSelectionTool)="onSubmit($event)"></selection-tool>
      <br>
      <month-year-picker></month-year-picker>

      <div class="row">
      <div class="col-md-12">
        <div *ngIf="isPodaciLoaded" style="color: #000000; background-color: #ffffff">
         <nvd3 [options]="options" [data]="data"></nvd3>
        </div>
      </div>
      </div>
   
     </div>       
     
   `
})
export class Rasturanje {
  options;
  data;
  slope: number;
  interception: number;

  podaci: any[];
  isPodaciLoaded: boolean = false;

  // mesOd: String;
  // godOd: String;
  //
  // mesDo: String;
  // godDo: String;

  // objekti: IMultiSelectOption[];
  // isObjekatLoaded: boolean = false;

  // objIzbor: number[] = []; // Default selection
  //
  // objSettings: IMultiSelectSettings = {
  //   pullRight: false,
  //   enableSearch: true,
  //   checkedStyle: 'checkboxes',
  //   buttonClasses: 'btn btn-default',
  //   selectionLimit: 0,
  //   closeOnSelect: true,
  //   showCheckAll: false,
  //   showUncheckAll: false,
  //   dynamicTitleMaxItems: 3,
  //   maxHeight: '300px',
  // };
  //
  // objTexts: IMultiSelectTexts = {
  //   checkAll: 'Check all',
  //   uncheckAll: 'Uncheck all',
  //   checked: 'checked',
  //   checkedPlural: 'checked',
  //   searchPlaceholder: 'Pretraga...',
  //   defaultTitle: 'Izaberite objekat',
  // };

  //ovako sam definisao podatke preko kojih racunam i prikazujem trend liniju

  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  constructor(private crudService: CrudService, private router: Router) {
  }


  // getObjekte() {
  //   this.crudService.getPodatke("objekat/lov").subscribe(
  //     data => {
  //       this.objekti = data;
  //       console.log(data);
  //
  //       this.isObjekatLoaded = true;
  //     },
  //     error => console.log(error)
  //   );
  // }

  onSubmit(objId: any[]) {
    console.log('niz: ' + objId);
    this.crudService.getData("grafik/efik_obj_kws_pov?obj_id="+objId+"&datum_od=15."+this.m.mesOd+'.'+this.m.godOd+"&datum_do=15."+this.m.mesDo+'.'+this.m.godDo).subscribe(
      data => {
        this.podaci = data;
        console.log(data);

        this.isPodaciLoaded = true;
        this.calculateMedium();
        this.data = this.generateData(1,40);
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }


  // onChangeObjekat() {
  //   console.log(this.objIzbor);
  // }


  ngOnInit(){
    // this.postaviDatume();
    // this.getObjekte();

    this.options = {

      chart: {
        tooltip: {
          //funkcija koja generise custom tooltip, koji je zapravo html kod
          contentGenerator: function(e) {
            console.log(e);

            var series = e.series[0];
            if (series.value === null) return;

            var rows =
              "<tr>" +
              "<td class='key'>" + 'Objekat: ' + "</td>" +
              "<td class='x-value'>" + e.point.pod + "</td>" +
              "</tr>" +
              "<tr>" +
              "<td class='key'>" + 'Specificna potrosnja: ' + "</td>" +
              "<td class='x-value'>" + e.value + "</td>" +
              "</tr>" +
              "<tr>" +
              "<td class='key'>" + 'Potrošnja energije: ' + "</td>" +
              "<td class='x-value'><strong>" + (series.value?series.value.toFixed(1):0) + "</strong></td>" +
              "</tr>";

            var header =
              "<thead>" +
              "<tr>" +
              "<td class='legend-color-guide'><div style='background-color: " + series.color + ";'></div></td>" +
              "<td class='key'><strong>" + series.key + "</strong></td>" +
              "</tr>" +
              "</thead>";

            return "<table>" +
              header +
              "<tbody>" +
              rows +
              "</tbody>" +
              "</table>";
//            return '<h3>HELLO WORLD</h3>';
          }
        },
        //       pointDomain: [],
//        sizeDomain: [1,10], //any interval
        //ovim zakucavamo velicinu tacke na grafiku
        pointRange: [200,200], //optional
        type: 'scatterChart',
        height: 450,
        color: d3.scale.category10().range(),
        scatter: {
          onlyCircles: false
        },
        showDistX: true,
        showDistY: true,
        //tooltipContent: function(d) {
        //    return d.series && '<h3>' + d.series[0].key + '</h3>';
        //},
        duration: 350,
        xAxis: {
          axisLabel: 'Specificna potrosnja [kWh/m2]',
          tickFormat: function(d){
            return d3.format('.f')(d);
          }
        },
        yAxis: {
          axisLabel: 'Apsolutna potrosnja [kWh]',
          tickFormat: function(d){
            return d3.format('.f')(d);
          },
          axisLabelDistance: -5
        },
        zoom: {
          //NOTE: All attributes below are optional
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: true,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: false,
          unzoomEventType: 'dblclick.zoom'
        }
      }
    }
    // this.calculateMedium();
    // this.data = this.generateData(1,40);

  }
// funkcija koja racuna trend liniju, odnosno njene parametre slope i interception
  // ulazni niz je stepenDani, sad je hardkodovan, posle ga punimo preko servisa
  calculateMedium(){
    var sum_x=0;
    var sum_y=0;

    var n = this.podaci.length;
    for(var i=0; i<n; i++){
      sum_x += this.podaci[i].x_value;
      sum_y += this.podaci[i].y_value;
    }
    this.slope = sum_x/n;
    this.interception = sum_y/n;
    console.log(this.slope);
    console.log(this.interception);

  }
//funkcija koja generise podatke za grafik
  generateData(groups, points) { //# groups,# points per group
    var data = [],
      shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
      random = d3.random.normal();

    for (var i = 0; i < groups; i++) {
      data.push({
        key: 'Objekat ',
        values: [],
//        slope: 1500000, //sa slope i interception crtamo trend liniju
//        intercept: -300000000 //this.interception
      });
      //petljom punimo tacke sa podacima u promenljivu data koju saljemo grafiku na obradu
      for (var j = 0; j < this.podaci.length; j++) {
        data[i].values.push({
          x: this.podaci[j].x_value,
          y: this.podaci[j].y_value,
          pod: this.podaci[j].objekat,
//        size: 200,
          shape: shapes[1],


        });
      }
    }
    console.log(data);
    return data;
  }

}
