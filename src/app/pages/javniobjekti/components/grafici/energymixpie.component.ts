
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
  selector: 'energymixpie',
  templateUrl: 'energymixpie.component.html'
})
export class EnergyMixPie implements OnInit{

  ustedaEnergija;
  ustedaNovac;
  options;
  data;
  slope: number;
  interception: number;

  indikator: string = 'kolicinaKwh';
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

  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  podaci:Array<any>;
  eneTipData: IMultiSelectOption[];
  objId: any[];

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

  upisiObjekte(objId: any[]) {
    this.objId = objId;
  }

  formirajGrafik(){
    this.stepenDani.splice(0,this.stepenDani.length);

    this.crudService.getData("grafik/energy_mix_pie?obj_id="+this.objId+"&ene_tip_id="+this.eneTipIzbor+"&datum_od="+'15'+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+'15'+'.'+this.m.mesDo+'.'+this.m.godDo).subscribe(
      data => {this.podaci = data;

        for (var j = 0; j < data.length; j++) {

          console.log(data[j].kolicinaKwh);
          this.stepenDani.push({
            key: data[j].energent,
            y: data[j][this.indikator],

          });
        }
        console.log(data);

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

    for (var j = 0; j < this.podaci.length; j++) {
      console.log(this.podaci[j].kolicinaKwh);
      this.stepenDani.push({
        key: this.podaci[j].energent,
        y: this.podaci[j][this.indikator],

      });
    }

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
