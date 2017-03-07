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
     <h1>JSON to PDF app</h1>
    <div class="container" id="div1">
        <button id="create" (click)="convert()">Create file</button> 
    </div>
   `
})
export class Main {
  options;
  data;
  slope: number;
  interception: number;
  stepenDani = [
    {
      mesgod: '02/2016',
      x_value: 377.7,
      y_value: 3553,
    },
    {
      mesgod: '04/2013',
      x_value: 171,
      y_value: 2665,
    },
    {
      mesgod: '03/2010',
      x_value: 407.9,
      y_value: 5018,
    },
    {
      mesgod: '03/2011',
      x_value: 440,
      y_value: 5992,
    },
    {
      mesgod: '02/2012',
      x_value: 714.2,
      y_value: 7863,
    }

  ]
  ngOnInit(){
    this.options = {

      chart: {
        tooltip: {
          contentGenerator: function(e) {
            var series = e.series[0];
            if (series.value === null) return;

            var rows =
              "<tr>" +
              "<td class='key'>" + 'Datum: ' + "</td>" +
              "<td class='x-value'>" + e.pod + "</td>" +
              "</tr>" +
              "<tr>" +
              "<td class='key'>" + 'Stependani: ' + "</td>" +
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
          axisLabel: 'X Axis',
          tickFormat: function(d){
            return d3.format('.02f')(d);
          }
        },
        yAxis: {
          axisLabel: 'Y Axis',
          tickFormat: function(d){
            return d3.format('.02f')(d);
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
    this.calculateTrendLine();
    this.data = this.generateData(1,40);

  }

  calculateTrendLine(){
    var sum_xy=0;
    var sum_x=0;
    var sum_y=0;
    var sum_x2=0;

    var n = this.stepenDani.length;
    for(var i=0; i<n; i++){
      sum_x += this.stepenDani[i].x_value;
      sum_y += this.stepenDani[i].y_value;
      sum_xy += this.stepenDani[i].x_value * this.stepenDani[i].y_value;
      sum_x2 += Math.pow(this.stepenDani[i].x_value,2);
    }
    this.slope = (n*sum_xy-sum_x*sum_y)/(n*sum_x2-Math.pow(sum_x,2));
    this.interception = (sum_y-this.slope*sum_x)/n;
    console.log(this.slope);
    console.log(this.interception);

  }

  generateData(groups, points) { //# groups,# points per group
  var data = [],
    shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
    random = d3.random.normal();

  for (var i = 0; i < groups; i++) {
    data.push({
      key: 'Pre pimene mere ',
      values: [],
      slope: this.slope,
      intercept: this.interception
    });

    for (var j = 0; j < this.stepenDani.length; j++) {
      data[i].values.push({
        x: this.stepenDani[j].x_value,
        y: this.stepenDani[j].y_value,
        pod: this.stepenDani[j].x_value,
//        size: 200,
        shape: shapes[1],


      });
    }
  }
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
