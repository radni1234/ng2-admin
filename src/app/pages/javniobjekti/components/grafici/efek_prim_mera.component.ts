
import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CrudService} from "../../../services/crud.service";
// webpack html imports
declare let d3: any;

//import 'jspdf';
declare let jsPDF : any;

@Component({
  selector: 'tabs-demo',
  templateUrl: 'efek_prim_mera.component.html'
})
export class EfekatPrimMera {
  options;
  private data: any[] = new Array<any>();
  slope: number;
  dummy: any[]= new Array<any>();
  interception: number;
  meraId: number;
  objekatId: number;
  isObjekatMereLoaded: boolean = false;
  objekatMere: any[];
  prikaziGrafik: boolean = false;
  podaciPre: any[];
  podaciPosle: any[];
  slopePosle: number;
  interceptionPosle: number;
  slopePre: number;
  interceptionPre: number;
  slopeProc: number;
  interceptionProc: number;


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

  ]

  constructor(private crudService: CrudService, private router: Router) {
  }
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
              "<td class='key'>" + 'Datum: ' + "</td>" +
              "<td class='x-value'>" + e.point.pod + "</td>" +
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
   // this.calculateTrendLine();
  //  this.data = this.generateData(1,40);

  }

  formirajGrafik(){
    console.log('formiraj');
    this.data.splice(0,this.data.length);
    this.prikaziGrafik = false;

    this.crudService.getData("grafik/cusum_pre?mera_id="+this.meraId).subscribe(
      data => {
        this.podaciPre = data;
        console.log(data);

        this.crudService.getData("grafik/cusum_posle?mera_id="+this.meraId).subscribe(
          data => {
            this.podaciPosle = data;
            console.log(data);


            this.calculateTrendLine(0,this.podaciPre);
            this.generateData(0,1,this.podaciPre,1, 'pre primene mere');

            this.calculateTrendLine(1,this.podaciPosle);
            this.generateData(1,2,this.podaciPosle,2, 'posle primene mere');

            this.calculateTrendLine(2,this.podaciPre);
            this.generateData(2,3,this.dummy,2, 'procenjena usteda');

            this.prikaziGrafik = true;
          },
          error => {console.log(error); this.router.navigate(['/login']);}
        );

      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );



  }

// funkcija koja racuna trend liniju, odnosno njene parametre slope i interception
  // ulazni niz je stepenDani, sad je hardkodovan, posle ga punimo preko servisa
  calculateTrendLine(option, niz){
    var sum_xy=0;
    var sum_x=0;
    var sum_y=0;
    var sum_x2=0;
    var proc_ustede=0;

    var n = niz.length;
    for(var i=0; i<n; i++){
      sum_x += niz[i].x_value;
      sum_y += niz[i].y_value;
      sum_xy += niz[i].x_value * niz[i].y_value;
      sum_x2 += Math.pow(niz[i].x_value,2);
    }
    this.slope = (n*sum_xy-sum_x*sum_y)/(n*sum_x2-Math.pow(sum_x,2));
    this.interception= (sum_y-this.slope*sum_x)/n;
    if (option==2){
      for(var i=0; i<this.objekatMere.length; i++){
        //console.log(this.objekatMere[i].id);
        if(this.objekatMere[i].id == this.meraId){
          proc_ustede = this.objekatMere[i].procUstede;
        }
      }
      this.slope = this.slope*(1-proc_ustede/100);
      this.interception = this.interception*(1-proc_ustede/100);
    }
    console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKUUUUUUUUUUUUUUUUUUUUUUUUUUUKUUUUUUUUUUUUUUUUUUUUUU');
    if(option==0){
      this.slopePre=this.slope;
      this.interceptionPre=this.interception;
    }
    if(option==1){
      this.slopePosle=this.slope;
      this.interceptionPosle=this.interception;
    }
    if(option==2){
      this.slopeProc=this.slope;
      this.interceptionProc=this.interception;
    }

  }
//funkcija koja generise podatke za grafik
  generateData(pocetak, groups, podaci, oblik, tekst) { //# groups,# points per group
    console.log('SDKJFGSDHHHHHHHHHHHHHHHHHHAAASDDDDDDDDDDDDDDDDDD');
//    console.log(mySlope);
//    console.log(myInterception);
  //var data = [],
    //this.data.splice(0,this.data.length);
    var shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'];


  for (var i = pocetak; i < groups; i++) {
    this.data.push({
      key: tekst,
      values: [],
      slope: this.slope, //sa slope i interception crtamo trend liniju
      intercept: this.interception
    });
    //petljom punimo tacke sa podacima u promenljivu data koju saljemo grafiku na obradu
    for (var j = 0; j < podaci.length; j++) {
      if(podaci[j].x_value!=0){
      this.data[i].values.push({
        x: podaci[j].x_value,
        y: podaci[j].y_value,
        pod: podaci[j].mes + '/' + podaci[j].god,
        shape: shapes[oblik],


      });
      }
    }
  }
  console.log(this.data);
  //return data;
  //  if(pocetak==0){
  //     this.data.push({
  //       key: 'procenjena usteda',
  //  //     values: [],
  //       slope: this.slopePre*0.8, //sa slope i interception crtamo trend liniju
  //       intercept: this.interceptionPre*0.8
  //     });
  //   }

}


  getObjekatMere(objId: number) {
    this.objekatId = objId;

    this.crudService.getData("obj_mere/sve?obj_id="+objId).subscribe(
      data => {
        this.objekatMere = data;
        console.log('MERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        console.log(data);

        this.isObjekatMereLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }
}
