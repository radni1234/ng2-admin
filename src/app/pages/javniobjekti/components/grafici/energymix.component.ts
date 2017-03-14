
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
      "values" : [ [ new Date(2015,0) , 23610] , [ new Date(2015,1) , 23610] , [ new Date(2015,2) , 0] , [ new Date(2015,3) , 0] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 23728] , [ new Date(2015,10) , 24790] , [ new Date(2015,11) ,0 ] , [ new Date(2016,0) , 23610] , [ new Date(2016,1) , 23610] , [ new Date(2016,2) , 0] , [ new Date(2016,3) , 0] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 23728] , [ new Date(2016,10) , 24790] , [ new Date(2016,11) ,0 ]]
    },

    {
      "key" : "Elektricna energija" ,
      "values" : [ [ new Date(2015,0) , 133265] , [ new Date(2015,1) , 191405] , [ new Date(2015,2) , 138007] , [ new Date(2015,3) , 98966] , [ new Date(2015,4) , 98966] , [ new Date(2015,5) , 45101] , [ new Date(2015,6) , 34406] , [ new Date(2015,7) , 34822] , [ new Date(2015,8) , 74439] , [ new Date(2015,9) , 108054] , [ new Date(2015,10) , 163997] , [ new Date(2015,11) , 158698] , [ new Date(2016,0) , 133265] , [ new Date(2016,1) , 191405] , [ new Date(2016,2) , 138007] , [ new Date(2016,3) , 98966] , [ new Date(2016,4) , 98966] , [ new Date(2016,5) , 45101] , [ new Date(2016,6) , 34406] , [ new Date(2016,7) , 34822] , [ new Date(2016,8) , 74439] , [ new Date(2016,9) , 108054] , [ new Date(2016,10) , 163997] , [ new Date(2016,11) , 158698]]
    },

    {
      "key" : "Loz ulje" ,
      "values" : [ [ new Date(2015,0) ,66585] , [ new Date(2015,1) , 193869] , [ new Date(2015,2) , 0] , [ new Date(2015,3) , 0] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 32792] , [ new Date(2015,10) , 0] , [ new Date(2015,11) , 0] , [ new Date(2016,0) ,66585] , [ new Date(2016,1) , 193869] , [ new Date(2016,2) , 0] , [ new Date(2016,3) , 0] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 32792] , [ new Date(2016,10) , 0] , [ new Date(2016,11) , 0]]
    },

    {
      "key" : "Mazut" ,
      "values" : [ [ new Date(2015,0) , 227476] , [ new Date(2015,1) , 193869] , [ new Date(2015,2) , 112938] , [ new Date(2015,3) , 0] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 164377] , [ new Date(2015,10) , 192040] , [ new Date(2015,11) , 493361] , [ new Date(2016,0) , 227476] , [ new Date(2016,1) , 193869] , [ new Date(2016,2) , 112938] , [ new Date(2016,3) , 0] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 164377] , [ new Date(2016,10) , 192040] , [ new Date(2016,11) , 493361]]
    } ,

    {
      "key" : "Prirodni gas" ,
      "values" : [ [ new Date(2015,0) , 357648] , [ new Date(2015,1) , 227249] , [ new Date(2015,2) , 192654] , [ new Date(2015,3) , 62412] , [ new Date(2015,4) , 3398] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 629] , [ new Date(2015,7) , 9,26] , [ new Date(2015,8) , 416] , [ new Date(2015,9) , 165920] , [ new Date(2015,10) , 268854] , [ new Date(2015,11) , 362862] , [ new Date(2016,0) , 357648] , [ new Date(2016,1) , 227249] , [ new Date(2016,2) , 192654] , [ new Date(2016,3) , 62412] , [ new Date(2016,4) , 3398] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 629] , [ new Date(2016,7) , 9,26] , [ new Date(2016,8) , 416] , [ new Date(2016,9) , 165920] , [ new Date(2016,10) , 268854] , [ new Date(2016,11) , 362862]]
    } ,

    {
      "key" : "Topla voda" ,
      "values" : [ [ new Date(2015,0) , 61177] , [ new Date(2015,1) , 57407] , [ new Date(2015,2) , 51081] , [ new Date(2015,3) , 9493] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 29204] , [ new Date(2015,10) , 58166] , [ new Date(2015,11) , 87625] , [ new Date(2016,0) , 61177] , [ new Date(2016,1) , 57407] , [ new Date(2016,2) , 51081] , [ new Date(2016,3) , 9493] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 29204] , [ new Date(2016,10) , 58166] , [ new Date(2016,11) , 87625]]
    } ,

    {
      "key" : "Ugalj" ,
      "values" : [ [ new Date(2015,0) , 122225] , [ new Date(2015,1) , 365403] , [ new Date(2015,2) , 243178] , [ new Date(2015,3) , 0] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 244450] , [ new Date(2015,10) , 0] , [ new Date(2015,11) , 244450] , [ new Date(2016,0) , 122225] , [ new Date(2016,1) , 365403] , [ new Date(2016,2) , 243178] , [ new Date(2016,3) , 0] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 244450] , [ new Date(2016,10) , 0] , [ new Date(2016,11) , 244450]]
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
