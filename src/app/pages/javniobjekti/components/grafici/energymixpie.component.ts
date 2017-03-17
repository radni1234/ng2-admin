
import { Component } from '@angular/core';

// webpack html imports
declare let d3: any;

//import 'jspdf';
declare let jsPDF : any;

@Component({
  selector: 'energymixpie',
  template: `
      
     <h1>GRAFIK</h1>
     <div style="color: #000000; background-color: #ffffff">
       <nvd3 [options]="options" [data]="data"></nvd3>
     </div>
   `
})
export class EnergyMixPie {

  ustedaEnergija;
  ustedaNovac;
  options;
  data;
  slope: number;
  interception: number;
  //ovako sam definisao podatke preko kojih racunam i prikazujem trend liniju
  stepenDani = [
    {
      key: "Drveni pelet",
      y: 95738.55
    },
    {
      key: "Elektricna energija",
      y: 1257489.68
    },
    {
      key: "Mazut",
      y: 1384065.48
    },
    {
      key: "Prirodni gas",
      y: 1642057.28
    },
    {
      key: "Topla voda",
      y: 354159.73
    },
    {
      key: "Ugalj",
      y: 1219707.72
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
        type: 'pieChart',
        height: 500,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
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
