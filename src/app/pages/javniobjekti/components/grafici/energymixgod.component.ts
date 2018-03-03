
import {Component, ViewChild} from '@angular/core';
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {YearPicker} from "../../../shared/components/year_picker/year_picker.component";

// webpack html imports
declare let d3: any;

//import 'jspdf';
declare let jsPDF : any;

@Component({
  selector: 'energymix',
  templateUrl: 'energymixgod.component.html'
})
export class EnergyMixGod {

  ustedaEnergija;
  ustedaNovac;
  options;
  data;
  options1;
  data1;
  slope: number;
  interception: number;
  objId: any[];
  podaci:Array<any>;
  eneTipData: IMultiSelectOption[];
  @ViewChild(YearPicker)
  private m: YearPicker

  mySettingsTipEne: IMultiSelectSettings = {
    pullRight: true,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 10,
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

  private isPodaciLoaded: boolean = false;
  private isEneTipLoaded: boolean = false;
  energent: String;
  energent1: String;
  indikator: string = 'kolicinaKwh';

  private eneTipIzbor: number[] = [];
  private maska: any[] = [];
  //ovako sam definisao podatke preko kojih racunam i prikazujem trend liniju
  stepenDani = [
    {
    "key" : "Ugalj" ,
    "values" : [{x: 2009, y: 16}, {x: 2010, y: 17}, {x: 2011, y: 17}, {x: 2012, y: 17} ]
    },
    {
      "key" : "Prirodni gas" ,
      "values" : [{x: 2009, y: 16}, {x: 2010, y: 17}, {x: 2011, y: 17}, {x: 2012, y: 17} ]
    }
  ];
  stepenDani1 = [
    {
      "key" : "Ugalj" ,
      "values" : [{x: 2009, y: 16}, {x: 2010, y: 17}, {x: 2011, y: 17}, {x: 2012, y: 17} ]
    },
    {
      "key" : "Prirodni gas" ,
      "values" : [{x: 2009, y: 16}, {x: 2010, y: 17}, {x: 2011, y: 17}, {x: 2012, y: 17} ]
    }
  ];

  constructor(private crudService: CrudService, private router: Router) {
  }

  upisiObjekte(objId: any[]) {
    this.objId = objId;
  }

  ngOnInit(){

    this.getEnergentTip();
    //ovde se definise tip grafika i ostale opcije



    // this.options =  {
    //   chart: {
    //     type: 'multiBarChart',
    //     height: 450,
    //     margin : {
    //       top: 20,
    //       right: 20,
    //       bottom: 45,
    //       left: 45
    //     },
    //     clipEdge: true,
    //     //staggerLabels: true,
    //     duration: 500,
    //     stacked: true,
    //     xAxis: {
    //       axisLabel: 'Time (ms)',
    //       showMaxMin: false,
    //       tickFormat: function(d){
    //         return d3.format(',f')(d);
    //       }
    //     },
    //     yAxis: {
    //       axisLabel: 'Y Axis',
    //       axisLabelDistance: -20,
    //       tickFormat: function(d){
    //         return d3.format(',.1f')(d);
    //       }
    //     }
    //   }
    // };
    // this.data = this.generateData();

  }

  formirajGrafik(){



    this.stepenDani.splice(0,this.stepenDani.length);
    this.stepenDani1.splice(0,this.stepenDani1.length);
    this.crudService.getData("grafik/energy_mix_god?obj_id="+this.objId+"&ene_tip_id="+this.eneTipIzbor+"&datum_od="+'01.01.'+this.m.godOd+"&datum_do="+'31.12.'+this.m.godDo).subscribe(
      data => {this.podaci = data;


        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log(data);
        var arry = [];
        this.energent = data[0].energent;
        for (var j = 0; j < data.length; j++) {

          if (this.energent == data[j].energent){
            var pom = {
              x : data[j].godina,
              y : data[j][this.indikator]
            };
            arry.push(pom);
          }
          // parseFloat(data[j].kolicinaKwh)
          else{
            this.stepenDani.push({
              key: data[j-1].energent,
              values: arry.slice(0, arry.length),
            });
            this.energent = data[j].energent;
            arry.splice(0,arry.length);
            var pom = {
              x : data[j].godina,
              y : data[j][this.indikator]
            };
            arry.push(pom);
          }

        }
        this.stepenDani.push({
          key: data[data.length-1].energent,
          values: arry,
        });


        console.log(this.stepenDani);
        this.options =  {
          chart: {
            type: 'multiBarChart',
            height: 450,
            margin : {
              top: 20,
              right: 20,
              bottom: 45,
              left: 45
            },
            clipEdge: true,
            //staggerLabels: true,
            duration: 500,
            stacked: true,
            xAxis: {

              showMaxMin: false,
              tickFormat: function(d){
                return d3.time.format('%x')(new Date(d))
              }
            },
            yAxis: {
              axisLabel: 'Y Axis',
              axisLabelDistance: -20,
              tickFormat: function(d){
                return d3.format(',.1f')(d/1000);
              }
            }
          }
        };
        this.data = this.generateData();



        var arry1 = [];
        this.energent1 = data[0].energent;
        for (var j = 0; j < data.length; j++) {

          if (this.energent1 == data[j].energent){
            arry1.push([data[j].godina,data[j].kolicinaKwh == 0 ? 0 : (data[j].iznos / data[j].kolicinaKwh)]);
          }
          // parseFloat(data[j].kolicinaKwh)
          else{
            this.stepenDani1.push({
              key: data[j-1].energent,
              values: arry1.slice(0, arry1.length),
            });
            this.energent1 = data[j].energent;
            arry1.splice(0,arry1.length);
            arry1.push([data[j].godina,data[j].kolicinaKwh == 0 ? 0 : (data[j].iznos / data[j].kolicinaKwh)]);
          }

        }
        this.stepenDani1.push({
          key: data[data.length-1].energent,
          values: arry1,
        });

        console.log(this.stepenDani1);
        this.options1 = {

          chart: {
            type: 'lineChart',
            height: 450,
            margin : {
              top: 20,
              right: 20,
              bottom: 40,
              left: 55
            },
            x: function(d){ return d[0]; },
            y: function(d){ return d[1]; },
            useInteractiveGuideline: true,
            dispatch: {
              stateChange: function(e){ console.log("stateChange"); },
              changeState: function(e){ console.log("changeState"); },
              tooltipShow: function(e){ console.log("tooltipShow"); },
              tooltipHide: function(e){ console.log("tooltipHide"); }
            },
            xAxis: {
              axisLabel: 'Godine'
            },
            yAxis: {
              axisLabel: 'Cena din/kWh',
              tickFormat: function(d){
                return d3.format('.02f')(d);
              },
              axisLabelDistance: -10
            },
            callback: function(chart){
              console.log("!!! lineChart callback !!!");
            }
          }

        }
        this.data1 = this.generateData1();
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onChange($event) {

    this.stepenDani.splice(0,this.stepenDani.length);

    var arry = [];
    this.energent = this.podaci[0].energent;
    for (var j = 0; j < this.podaci.length; j++) {

      if (this.energent == this.podaci[j].energent){
        var pom = {
          x : this.podaci[j].godina,
          y : this.podaci[j][this.indikator]
        };
        arry.push(pom);
      }
      // parseFloat(data[j].kolicinaKwh)
      else{
        this.stepenDani.push({
          key: this.podaci[j-1].energent,
          values: arry.slice(0, arry.length),
        });
        this.energent = this.podaci[j].energent;
        arry.splice(0,arry.length);
        var pom = {
          x : this.podaci[j].godina,
          y : this.podaci[j][this.indikator]
        };
        arry.push(pom);
      }

    }
    this.stepenDani.push({
      key: this.podaci[this.podaci.length-1].energent,
      values: arry,
    });

    this.options =  {
      chart: {
        type: 'multiBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 45,
          left: 45
        },
        clipEdge: true,
        //staggerLabels: true,
        duration: 500,
        stacked: true,
        xAxis: {

          showMaxMin: false,
          tickFormat: function(d){
            return d3.time.format('%x')(new Date(d))
          }
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -20,
          tickFormat: function(d){
            return d3.format(',.1f')(d/1000);
          }
        }
      }
    };
    this.data = this.generateData();

  }

// funkcija koja generise podatke za grafik
  generateData() {

    var data = [];
    data = this.stepenDani;
    return data;
  }

  generateData1() {

    var data = [];
    data = this.stepenDani1;
    return data;
  }

  getEnergentTip() {
    this.crudService.getData("energent_tip/lov").subscribe(
      data => {
        this.eneTipData = data;
        console.log(data);

        this.isEneTipLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onChangeEneTip() {
    console.log(this.eneTipIzbor);
  }


}
