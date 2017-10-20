
import { Component, ViewChild, OnInit } from '@angular/core';
import {MonthYearPicker} from "../../../shared/components/month_year_picker/month_year_picker.component";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
// webpack html imports
declare let d3: any;

//import 'jspdf';
declare let jsPDF : any;

@Component({
  selector: 'graafik_god',
  templateUrl: 'grafik_god.component.html'
})
export class GrafikGodComponent implements OnInit{

  ustedaEnergija;
  ustedaNovac;
  options;
  data;
  slope: number;
  interception: number;

  indikator: string = 'kwh';
  //ovako sam definisao podatke preko kojih racunam i prikazujem trend liniju
  stepenDani = [
    {
      "key" : 2009 ,
      "values" : [ [ new Date(2015,0) , 23610] , [ new Date(2015,1) , 23610] , [ new Date(2015,2) , 0] , [ new Date(2015,3) , 0] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 23728] , [ new Date(2015,10) , 24790] , [ new Date(2015,11) ,0 ] , [ new Date(2016,0) , 23610] , [ new Date(2016,1) , 23610] , [ new Date(2016,2) , 0] , [ new Date(2016,3) , 0] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 23728] , [ new Date(2016,10) , 24790] , [ new Date(2016,11) ,0 ]]
    },

    {
      "key" : 2010 ,
      "values" : [ [ new Date(2015,0) , 133265] , [ new Date(2015,1) , 191405] , [ new Date(2015,2) , 138007] , [ new Date(2015,3) , 98966] , [ new Date(2015,4) , 98966] , [ new Date(2015,5) , 45101] , [ new Date(2015,6) , 34406] , [ new Date(2015,7) , 34822] , [ new Date(2015,8) , 74439] , [ new Date(2015,9) , 108054] , [ new Date(2015,10) , 163997] , [ new Date(2015,11) , 158698] , [ new Date(2016,0) , 133265] , [ new Date(2016,1) , 191405] , [ new Date(2016,2) , 138007] , [ new Date(2016,3) , 98966] , [ new Date(2016,4) , 98966] , [ new Date(2016,5) , 45101] , [ new Date(2016,6) , 34406] , [ new Date(2016,7) , 34822] , [ new Date(2016,8) , 74439] , [ new Date(2016,9) , 108054] , [ new Date(2016,10) , 163997] , [ new Date(2016,11) , 158698]]
    },

    {
      "key" : 2011 ,
      "values" : [ [ new Date(2015,0) ,66585] , [ new Date(2015,1) , 193869] , [ new Date(2015,2) , 0] , [ new Date(2015,3) , 0] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 32792] , [ new Date(2015,10) , 0] , [ new Date(2015,11) , 0] , [ new Date(2016,0) ,66585] , [ new Date(2016,1) , 193869] , [ new Date(2016,2) , 0] , [ new Date(2016,3) , 0] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 32792] , [ new Date(2016,10) , 0] , [ new Date(2016,11) , 0]]
    },

    {
      "key" : 2012 ,
      "values" : [ [ new Date(2015,0) , 227476] , [ new Date(2015,1) , 193869] , [ new Date(2015,2) , 112938] , [ new Date(2015,3) , 0] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 164377] , [ new Date(2015,10) , 192040] , [ new Date(2015,11) , 493361] , [ new Date(2016,0) , 227476] , [ new Date(2016,1) , 193869] , [ new Date(2016,2) , 112938] , [ new Date(2016,3) , 0] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 164377] , [ new Date(2016,10) , 192040] , [ new Date(2016,11) , 493361]]
    } ,

    {
      "key" : 2013 ,
      "values" : [ [ new Date(2015,0) , 357648] , [ new Date(2015,1) , 227249] , [ new Date(2015,2) , 192654] , [ new Date(2015,3) , 62412] , [ new Date(2015,4) , 3398] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 629] , [ new Date(2015,7) , 9,26] , [ new Date(2015,8) , 416] , [ new Date(2015,9) , 165920] , [ new Date(2015,10) , 268854] , [ new Date(2015,11) , 362862] , [ new Date(2016,0) , 357648] , [ new Date(2016,1) , 227249] , [ new Date(2016,2) , 192654] , [ new Date(2016,3) , 62412] , [ new Date(2016,4) , 3398] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 629] , [ new Date(2016,7) , 9,26] , [ new Date(2016,8) , 416] , [ new Date(2016,9) , 165920] , [ new Date(2016,10) , 268854] , [ new Date(2016,11) , 362862]]
    } ,

    {
      "key" : 2014 ,
      "values" : [ [ new Date(2015,0) , 61177] , [ new Date(2015,1) , 57407] , [ new Date(2015,2) , 51081] , [ new Date(2015,3) , 9493] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 29204] , [ new Date(2015,10) , 58166] , [ new Date(2015,11) , 87625] , [ new Date(2016,0) , 61177] , [ new Date(2016,1) , 57407] , [ new Date(2016,2) , 51081] , [ new Date(2016,3) , 9493] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 29204] , [ new Date(2016,10) , 58166] , [ new Date(2016,11) , 87625]]
    } ,

    {
      "key" : 2015 ,
      "values" : [ [ new Date(2015,0) , 122225] , [ new Date(2015,1) , 365403] , [ new Date(2015,2) , 243178] , [ new Date(2015,3) , 0] , [ new Date(2015,4) , 0] , [ new Date(2015,5) , 0] , [ new Date(2015,6) , 0] , [ new Date(2015,7) , 0] , [ new Date(2015,8) , 0] , [ new Date(2015,9) , 244450] , [ new Date(2015,10) , 0] , [ new Date(2015,11) , 244450] , [ new Date(2016,0) , 122225] , [ new Date(2016,1) , 365403] , [ new Date(2016,2) , 243178] , [ new Date(2016,3) , 0] , [ new Date(2016,4) , 0] , [ new Date(2016,5) , 0] , [ new Date(2016,6) , 0] , [ new Date(2016,7) , 0] , [ new Date(2016,8) , 0] , [ new Date(2016,9) , 244450] , [ new Date(2016,10) , 0] , [ new Date(2016,11) , 244450]]
    }

  ];

  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  podaci:Array<any>;
  eneTipData: IMultiSelectOption[];
  trafoId: any[];

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

  private eneTipIzbor: number[] = [];

  constructor(private crudService: CrudService, private router: Router) {
  }

  upisiTrafoe(objId: any[]) {
    this.trafoId = objId;
  }

  formirajGrafik(){
    this.stepenDani.splice(0,this.stepenDani.length);

    this.crudService.getData("grafik/grafik_rasveta_god?trafo_id="+this.trafoId+"&datum_od="+'01'+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+'28'+'.'+this.m.mesDo+'.'+this.m.godDo).subscribe(
      data => {this.podaci = data;
        var godOd = Number(this.m.godOd);
        var godDo = Number(this.m.godDo);
        var arry = [];

        for(var i = godOd; i < godDo+1; i++ ) {

          for (var j = 0; j < data.length; j++) {

            if (i == data[j].godina) {

              arry.push([data[j].mesec, data[j][this.indikator]]);
            }

          }
          console.log("godina: " + i);
          this.stepenDani.push({
            key: i,
            values: arry.splice(0,arry.length),
          });

        }

        console.log(this.stepenDani);



        console.log(data);

        this.options = {

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
                axisLabel: 'Meseci'
              },
              yAxis: {
                axisLabel: 'Potrosnja',
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


        this.data = this.generateData();

        this.isPodaciLoaded = true},
      error => {console.log(error);}
    );
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

  ngOnInit(){
    this.getEnergentTip();
    //ovde se definise tip grafika i ostale opcije



  }

  onChange($event) {

    this.stepenDani.splice(0,this.stepenDani.length);



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
