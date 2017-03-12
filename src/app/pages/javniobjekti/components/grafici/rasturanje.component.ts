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
import { Component } from '@angular/core';

// webpack html imports
declare let d3: any;

//import 'jspdf';
declare let jsPDF : any;

@Component({
  selector: 'tabs-demo',
  template: `
     <h1>GRAFIK</h1>
     <div style="color: #000000; background-color: #ffffff">
       <nvd3 [options]="options" [data]="data"></nvd3>
     </div>
     <h1>Trend linija Y = {{slope | number : '1.2-2'}} * X + {{interception | number : '1.2-2'}}</h1>
     <h1>JSON to PDF app</h1>
    <div class="container" id="div1">
        <button id="create" (click)="convert()">Create file</button> 
    </div>
   `
})
export class Rasturanje {
  options;
  data;
  slope: number;
  interception: number;
  //ovako sam definisao podatke preko kojih racunam i prikazujem trend liniju
  stepenDani = [
    {
      mesgod: 'OS Petar Petrovic Njegos',
      x_value: 184,
      y_value: 650529,
    },
    {
      mesgod: 'OS 20. Oktobar',
      x_value: 118,
      y_value: 374608,
    },
    {
      mesgod: 'PU Duga',
      x_value: 166,
      y_value: 51320,
    },
    {
      mesgod: 'PU Poletarac',
      x_value: 126,
      y_value: 97057,
    },
    {
      mesgod: 'PU Suncokret',
      x_value: 239,
      y_value: 156099,
    },
    {
      mesgod: 'PU Zvezdica',
      x_value: 254,
      y_value: 113407,
    },
    {
      mesgod: 'OS Svetozar Miletic',
      x_value: 163,
      y_value: 571096,
    },
    {
      mesgod: 'OS Vuk Karadzic',
      x_value: 246,
      y_value: 410306,
    },
    {
      mesgod: 'OS Bratstvo-jedinstvo Vrbas',
      x_value: 348,
      y_value: 537648,
    },
    {
      mesgod: 'OS Bratstvo-jedinstvo Kucura',
      x_value: 187,
      y_value: 423179,
    },
    {
      mesgod: 'OS Branko Radicevic Savino Selo',
      x_value: 196,
      y_value: 368886,
    },
    {
      mesgod: 'OS Branko Radicevic Ravno Selo',
      x_value: 111,
      y_value: 259650,
    },
    {
      mesgod: 'OS Jovan Jovanovic Zmaj',
      x_value: 106,
      y_value: 284954,
    },
    {
      mesgod: 'SSS 4. Juli',
      x_value: 140,
      y_value: 752156,
    },
  ]
  ngOnInit(){
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
    this.calculateMedium();
    this.data = this.generateData(1,40);

  }
// funkcija koja racuna trend liniju, odnosno njene parametre slope i interception
  // ulazni niz je stepenDani, sad je hardkodovan, posle ga punimo preko servisa
  calculateMedium(){
    var sum_x=0;
    var sum_y=0;

    var n = this.stepenDani.length;
    for(var i=0; i<n; i++){
      sum_x += this.stepenDani[i].x_value;
      sum_y += this.stepenDani[i].y_value;
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
      for (var j = 0; j < this.stepenDani.length; j++) {
        data[i].values.push({
          x: this.stepenDani[j].x_value,
          y: this.stepenDani[j].y_value,
          pod: this.stepenDani[j].mesgod,
//        size: 200,
          shape: shapes[1],


        });
      }
    }
    console.log(data);
    return data;
  }
  convert(){
    var item = [{
      naziv: "Petar Petrovic Njegos",
      potrosnja: "345",
      emisija: "2345,89",
      iznos: "12345,89"
    },
      {
        naziv: "20. Oktobar",
        potrosnja: "234,7",
        emisija: "2234,56",
        iznos: "1234,34"
      },
      {
        naziv: "Svetozar Miletic",
        potrosnja: "3452,98",
        emisija: "233,83",
        iznos: "12345,83"
      }
    ];
    var doc = new jsPDF();
    var col = ["Naziv objekta", "Potrosnja [kWh]", "Emisija [kgCO2]", "Iznos [din]"];
    var rows = [];
    var styles = {halign: 'right'};

    for(var key in item){

      var temp = [item[key].naziv, item[key].potrosnja, item[key].emisija, item[key].iznos];
      rows.push(temp);
    }

    doc.autoTable(col, rows, {
      //  styles: {cellPadding: 0.5, fontSize: 4, halign: 'left'}
    });

    doc.save('Test.pdf');
  }
}
