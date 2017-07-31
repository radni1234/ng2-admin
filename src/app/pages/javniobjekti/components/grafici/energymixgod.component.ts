
import {Component, ViewChild} from '@angular/core';
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";

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
  slope: number;
  interception: number;
  objId: any[];
  podaci:Array<any>;
  eneTipData: IMultiSelectOption[];
  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

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
  indikator: string = 'kolicinaKwh';

  private eneTipIzbor: number[] = [];
  private maska: any[] = [];
  //ovako sam definisao podatke preko kojih racunam i prikazujem trend liniju
  stepenDani = [
    // {
    //   "key" : "Pelet" ,
    //   "values" : [ [ new Date(2015,0) , 23610] , [ new Date(2015,1) , 23610] , [ new Date(2015,2) , 0] , [ new Date(2015,3) , 0] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 23728] , [ new Date(2015,10) , 24790] , [ new Date(2015,11) ,0 ] , [ new Date(2016,0) , 23610] , [ new Date(2016,1) , 23610] , [ new Date(2016,2) , 0] , [ new Date(2016,3) , 0] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 23728] , [ new Date(2016,10) , 24790] , [ new Date(2016,11) ,0 ]]
    // },
    //
    // {
    //   "key" : "Elektricna energija" ,
    //   "values" : [ [ new Date(2015,0) , 133265] , [ new Date(2015,1) , 191405] , [ new Date(2015,2) , 138007] , [ new Date(2015,3) , 98966] , [ new Date(2015,4) , 98966] , [ new Date(2015,5) , 45101] , [ new Date(2015,6) , 34406] , [ new Date(2015,7) , 34822] , [ new Date(2015,8) , 74439] , [ new Date(2015,9) , 108054] , [ new Date(2015,10) , 163997] , [ new Date(2015,11) , 158698] , [ new Date(2016,0) , 133265] , [ new Date(2016,1) , 191405] , [ new Date(2016,2) , 138007] , [ new Date(2016,3) , 98966] , [ new Date(2016,4) , 98966] , [ new Date(2016,5) , 45101] , [ new Date(2016,6) , 34406] , [ new Date(2016,7) , 34822] , [ new Date(2016,8) , 74439] , [ new Date(2016,9) , 108054] , [ new Date(2016,10) , 163997] , [ new Date(2016,11) , 158698]]
    // },
    //
    // {
    //   "key" : "Loz ulje" ,
    //   "values" : [ [ new Date(2015,0) ,66585] , [ new Date(2015,1) , 193869] , [ new Date(2015,2) , 0] , [ new Date(2015,3) , 0] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 32792] , [ new Date(2015,10) , 0] , [ new Date(2015,11) , 0] , [ new Date(2016,0) ,66585] , [ new Date(2016,1) , 193869] , [ new Date(2016,2) , 0] , [ new Date(2016,3) , 0] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 32792] , [ new Date(2016,10) , 0] , [ new Date(2016,11) , 0]]
    // },
    //
    // {
    //   "key" : "Mazut" ,
    //   "values" : [ [ new Date(2015,0) , 227476] , [ new Date(2015,1) , 193869] , [ new Date(2015,2) , 112938] , [ new Date(2015,3) , 0] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 164377] , [ new Date(2015,10) , 192040] , [ new Date(2015,11) , 493361] , [ new Date(2016,0) , 227476] , [ new Date(2016,1) , 193869] , [ new Date(2016,2) , 112938] , [ new Date(2016,3) , 0] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 164377] , [ new Date(2016,10) , 192040] , [ new Date(2016,11) , 493361]]
    // } ,
    //
    // {
    //   "key" : "Prirodni gas" ,
    //   "values" : [ [ new Date(2015,0) , 357648] , [ new Date(2015,1) , 227249] , [ new Date(2015,2) , 192654] , [ new Date(2015,3) , 62412] , [ new Date(2015,4) , 3398] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 629] , [ new Date(2015,7) , 9,26] , [ new Date(2015,8) , 416] , [ new Date(2015,9) , 165920] , [ new Date(2015,10) , 268854] , [ new Date(2015,11) , 362862] , [ new Date(2016,0) , 357648] , [ new Date(2016,1) , 227249] , [ new Date(2016,2) , 192654] , [ new Date(2016,3) , 62412] , [ new Date(2016,4) , 3398] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 629] , [ new Date(2016,7) , 9,26] , [ new Date(2016,8) , 416] , [ new Date(2016,9) , 165920] , [ new Date(2016,10) , 268854] , [ new Date(2016,11) , 362862]]
    // } ,
    //
    // {
    //   "key" : "Topla voda" ,
    //   "values" : [ [ new Date(2015,0) , 61177] , [ new Date(2015,1) , 57407] , [ new Date(2015,2) , 51081] , [ new Date(2015,3) , 9493] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 29204] , [ new Date(2015,10) , 58166] , [ new Date(2015,11) , 87625] , [ new Date(2016,0) , 61177] , [ new Date(2016,1) , 57407] , [ new Date(2016,2) , 51081] , [ new Date(2016,3) , 9493] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 29204] , [ new Date(2016,10) , 58166] , [ new Date(2016,11) , 87625]]
    // } ,
    //
    // {
    //   "key" : "Ugalj" ,
    //   "values" : [ [ 1 , 122225] , [ 2 , 365403] , [ 3 , 243178] , [ 4 , 0] , [ 5 , 0] , [ 6 , 0] , [ 7 , 0] , [ 8 , 0] , [ 9 , 0] , [ 10 , 244450] , [ 11 , 0] , [ 12 , 244450] , [ 13 , 122225] , [ 14 , 365403] ]
    // }
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
    this.crudService.getData("grafik/energy_mix_god?obj_id="+this.objId+"&ene_tip_id="+this.eneTipIzbor+"&datum_od="+'15'+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+'15'+'.'+this.m.mesDo+'.'+this.m.godDo).subscribe(
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
