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
  selector: 'cusum',
  template: `
      
     <h1>GRAFIK</h1>
     <div style="color: #000000; background-color: #ffffff">
       <nvd3 [options]="options" [data]="data"></nvd3>
     </div>
     <h1>Trend linija Y = {{slope | number : '1.2-2'}} * X + {{interception | number : '1.2-2'}}</h1> 
       <h1>Do sada je ušteđeno {{ustedaEnergija | number : '1.2-2'}} kWh enerije</h1>
       <h1>i {{ustedaNovac | number : '1.2-2'}} EURA</h1>
   `
})
export class Cusum {

  ustedaEnergija;
  ustedaNovac;
  options;
  data;
  slope: number;
  interception: number;
  //ovako sam definisao podatke preko kojih racunam i prikazujem trend liniju
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

  ];
  //ovako podatke za koje racunam ustedu za cusum dijagram, ova dva niza mozemo unificirati
  posleMereEE = [
    {
      god: 2015,
      mes: 1,
      x_value: 450,
      y_value: 4500,
    },
    {
      god: 2015,
      mes: 2,
      x_value: 690,
      y_value: 5000,
    },
    {
      god: 2015,
      mes: 3,
      x_value: 230,
      y_value: 1500,
    },
    {
      god: 2015,
      mes: 4,
      x_value: 100,
      y_value: 650,
    },
    {
      god: 2015,
      mes: 5,
      x_value: 0,
      y_value: 0,
    },
    {
      god: 2015,
      mes: 6,
      x_value: 0,
      y_value: 0,
    },
    {
      god: 2015,
      mes: 7,
      x_value: 0,
      y_value: 0,
    },
    {
      god: 2015,
      mes: 8,
      x_value: 0,
      y_value: 0,
    },
    {
      god: 2015,
      mes: 9,
      x_value: 0,
      y_value: 0,
    },
    {
      god: 2015,
      mes: 10,
      x_value: 250,
      y_value: 1650,
    },
    {
      god: 2015,
      mes: 11,
      x_value: 500,
      y_value: 3100,
    },
    {
      god: 2015,
      mes: 12,
      x_value: 650,
      y_value: 10000,
    },
    {
      god: 2016,
      mes: 1,
      x_value: 450,
      y_value: 4500,
    },
    {
      god: 2016,
      mes: 2,
      x_value: 690,
      y_value: 5000,
    },
    {
      god: 2016,
      mes: 3,
      x_value: 230,
      y_value: 1500,
    },
    {
      god: 2016,
      mes: 4,
      x_value: 100,
      y_value: 650,
    },
    {
      god: 2016,
      mes: 5,
      x_value: 0,
      y_value: 0,
    },
    {
      god: 2016,
      mes: 6,
      x_value: 0,
      y_value: 0,
    },
    {
      god: 2016,
      mes: 7,
      x_value: 0,
      y_value: 0,
    },
    {
      god: 2016,
      mes: 8,
      x_value: 0,
      y_value: 0,
    },
    {
      god: 2016,
      mes: 9,
      x_value: 0,
      y_value: 0,
    },
    {
      god: 2016,
      mes: 10,
      x_value: 250,
      y_value: 1650,
    },
    {
      god: 2016,
      mes: 11,
      x_value: 540,
      y_value: 3200,
    },
    {
      god: 2016,
      mes: 12,
      x_value: 650,
      y_value: 4750,
    },
  ]
  ngOnInit(){
    //ovde se definise tip grafika i ostale opcije
    this.options = {
      chart: {
        type: 'historicalBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 65,
          left: 50
        },
        x: function(d){return d[0];},
        y: function(d){return d[1];},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.1f')(d);
        },
        duration: 100,
        xAxis: {
          axisLabel: 'X Axis',
          tickFormat: function(d) {
            console.log(d);
            return d3.time.format('%m/%Y')(new Date(d))//ovde se formatira datum koji se prikazuje na x-osi
          },
          rotateLabels: 30,
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10,
          tickFormat: function(d){
            return d3.format(',.1f')(d);
          }
        },
        tooltip: {
          keyFormatter: function(d) {
            return d3.time.format('%m/%Y')(new Date(d));//ovde se formatira datum koji se prikazuje na tooltip-u
          }
        },
        zoom: {
          enabled: true,
          scaleExtent: [1, 10],
          useFixedDomain: false,
          useNiceScale: false,
          horizontalOff: false,
          verticalOff: true,
          unzoomEventType: 'dblclick.zoom'
        }
      }

    }
    this.calculateTrendLine();
    this.data = this.generateData();

  }
// funkcija koja racuna trend liniju, odnosno njene parametre slope i interception
  // ulazni niz je stepenDani, sad je hardkodovan, posle ga punimo preko servisa
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
// funkcija koja generise podatke za grafik
  generateData() {
    var cusum=0;
    var data = [];
    data.push({
      key: "Quantity",
      bar: true,
      values: [],
    });
    //petlja trci kroz niz - posleMereEE (potrosnja nakon primene mere) i racuna rastojanje od trend linije, odnosno ustedu
    // sva usteda se akumulira u promenljivoj cusum i zajedno sa datumom kada je postignuta usteda gura u podatke koji se salju grafiku
    for (var j = 0; j < this.posleMereEE.length; j++) {
      if(this.posleMereEE[j].x_value!=0){
        cusum +=  (this.slope * this.posleMereEE[j].x_value + this.interception)-this.posleMereEE[j].y_value;
      }
      data[0].values.push(
        [new Date(this.posleMereEE[j].god,this.posleMereEE[j].mes -1),
        cusum]




      );
    }
    this.ustedaEnergija = cusum;
    this.ustedaNovac = 0.06 * cusum;
    return data;
  }

}
