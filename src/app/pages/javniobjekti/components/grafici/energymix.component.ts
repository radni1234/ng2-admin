
import { Component } from '@angular/core';

// webpack html imports
declare let d3: any;

//import 'jspdf';
declare let jsPDF : any;

@Component({
  selector: 'energymix',
  template: `
      
     <h1>GRAFIK</h1>
     <div style="color: #000000; background-color: #ffffff">
       <nvd3 [options]="options" [data]="data"></nvd3>
     </div>
   `
})
export class EnergyMix {

  ustedaEnergija;
  ustedaNovac;
  options;
  data;
  slope: number;
  interception: number;
  //ovako sam definisao podatke preko kojih racunam i prikazujem trend liniju
  stepenDani = [
    {
      "key" : "Pelet" ,
      "values" : [ [ 1025409600000 , 23610] , [ 1028088000000 , 23610] , [ 1030766400000 , 0] , [ 1033358400000 , 0] , [ 1036040400000 , 0] , [ 1038632400000 , 0] , [ 1041310800000 , 0] , [ 1043989200000 , 0] , [ 1046408400000 , 0] , [ 1049086800000 , 23728] , [ 1051675200000 , 24790] , [ 1054353600000 ,0 ]]
    },

    {
      "key" : "Elektricna energija" ,
      "values" : [ [ 1025409600000 , 133265] , [ 1028088000000 , 191405] , [ 1030766400000 , 138007] , [ 1033358400000 , 98966] , [ 1036040400000 , 98966] , [ 1038632400000 , 45101] , [ 1041310800000 , 34406] , [ 1043989200000 , 34822] , [ 1046408400000 , 74439] , [ 1049086800000 , 108054] , [ 1051675200000 , 163997] , [ 1054353600000 , 158698]]
    },

    {
      "key" : "Loz ulje" ,
      "values" : [ [ 1025409600000 ,66585] , [ 1028088000000 , 193869] , [ 1030766400000 , 0] , [ 1033358400000 , 0] , [ 1036040400000 , 0] , [ 1038632400000 , 0] , [ 1041310800000 , 0] , [ 1043989200000 , 0] , [ 1046408400000 , 0] , [ 1049086800000 , 32792] , [ 1051675200000 , 0] , [ 1054353600000 , 0]]
    },

    {
      "key" : "Mazut" ,
      "values" : [ [ 1025409600000 , 227476] , [ 1028088000000 , 193869] , [ 1030766400000 , 112938] , [ 1033358400000 , 0] , [ 1036040400000 , 0] , [ 1038632400000 , 0] , [ 1041310800000 , 0] , [ 1043989200000 , 0] , [ 1046408400000 , 0] , [ 1049086800000 , 164377] , [ 1051675200000 , 192040] , [ 1054353600000 , 493361]]
    } ,

    {
      "key" : "Prirodni gas" ,
      "values" : [ [ 1025409600000 , 357648] , [ 1028088000000 , 227249] , [ 1030766400000 , 192654] , [ 1033358400000 , 62412] , [ 1036040400000 , 3398] , [ 1038632400000 , 0] , [ 1041310800000 , 629] , [ 1043989200000 , 9,26] , [ 1046408400000 , 416] , [ 1049086800000 , 165920] , [ 1051675200000 , 268854] , [ 1054353600000 , 362862]]
    } ,

    {
      "key" : "Topla voda" ,
      "values" : [ [ 1025409600000 , 61177] , [ 1028088000000 , 57407] , [ 1030766400000 , 51081] , [ 1033358400000 , 9493] , [ 1036040400000 , 0] , [ 1038632400000 , 0] , [ 1041310800000 , 0] , [ 1043989200000 , 0] , [ 1046408400000 , 0] , [ 1049086800000 , 29204] , [ 1051675200000 , 58166] , [ 1054353600000 , 87625]]
    } ,

    {
      "key" : "Ugalj" ,
      "values" : [ [ 1025409600000 , 122225] , [ 1028088000000 , 365403] , [ 1030766400000 , 243178] , [ 1033358400000 , 0] , [ 1036040400000 , 0] , [ 1038632400000 , 0] , [ 1041310800000 , 0] , [ 1043989200000 , 0] , [ 1046408400000 , 0] , [ 1049086800000 , 244450] , [ 1051675200000 , 0] , [ 1054353600000 , 244450]]
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
        type: 'stackedAreaChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 30,
          left: 40
        },
        x: function(d){return d[0];},
        y: function(d){return d[1];},
        useVoronoi: false,
        clipEdge: true,
        duration: 100,
        useInteractiveGuideline: true,
        xAxis: {
          showMaxMin: false,
          tickFormat: function(d) {
            return d3.time.format('%x')(new Date(d))
          }
        },
        yAxis: {
          axisLabel: 'MWh',
          tickFormat: function(d){
            return d3.format(',.f')(d);
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
    this.data = this.generateData();

  }

// funkcija koja generise podatke za grafik
  generateData() {

    var data = [];
    data = this.stepenDani;
    return data;
  }

}
