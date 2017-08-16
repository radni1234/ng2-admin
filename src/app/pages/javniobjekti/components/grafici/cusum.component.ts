
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
  selector: 'cusum',
  templateUrl: 'cusum.component.html'
})
export class Cusum {

  isEneTipLoaded: boolean;
  isObjekatMereLoaded: boolean = false;
  objekatMere: any[];
  korisnik;

  meraId: number;
  objekatId: number;
  jedinicnaCenaKwh: number;

  podaciPre: any[];
  podaci: any[];
  podaciPosle: any[];

  prikaziGrafik: boolean = false;

  ustedaEnergija;
  ustedaNovac;
  options;
  options1;
  data;
  data1;
  slope: number;
  interception: number;

  mySettingsTipEne: IMultiSelectSettings = {
    pullRight: true,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 3,
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

  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

  eneTipIzbor: number[] = [];

  optionsModel: number[] = [];
  eneTipData: IMultiSelectOption[];

  @ViewChild(MonthYearPicker)
  private m: MonthYearPicker;

  formirajGrafik(){
    console.log('formiraj');

    this.crudService.getData("izvestaj/uk_pot_obj?obj_id="+this.objekatId+"&ene_tip_id="+this.eneTipIzbor+"&datum_od="+'01'+'.'+this.m.mesOd+'.'+this.m.godOd+"&datum_do="+'28'+'.'+this.m.mesDo+'.'+this.m.godDo).subscribe(
      data => {this.podaci = data;
      this.jedinicnaCenaKwh = data[data.length-1].iznos/data[data.length-1].kolicinaKwh;
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA"); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );

    this.crudService.getData("grafik/cusum_pre?mera_id="+this.meraId).subscribe(
      data => {
        this.podaciPre = data;
        console.log("PREEEEEEEEEEEEEEEEEEE");
        console.log(data);

        this.crudService.getData("grafik/cusum_posle?mera_id="+this.meraId).subscribe(
          data => {
            this.podaciPosle = data;
            console.log("POSLEEEEEEEEEEEEEEEEEE");
            console.log(data);

            this.calculateTrendLine();
            this.data = this.generateData();
            this.data1 = this.generateData1();

            this.prikaziGrafik = true;
          },
          error => {console.log(error); this.router.navigate(['/login']);}
        );

      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );



  }

  constructor(private crudService: CrudService, private router: Router) {
  }

  ngOnInit(){
    this.korisnik = JSON.parse(localStorage.getItem('currentUser')).uloga;
    console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK');
    console.log(JSON.parse(localStorage.getItem('currentUser')).username);
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
    this.options1 = {
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

  }
// funkcija koja racuna trend liniju, odnosno njene parametre slope i interception
  // ulazni niz je stepenDani, sad je hardkodovan, posle ga punimo preko servisa
  calculateTrendLine(){
    var sum_xy=0;
    var sum_x=0;
    var sum_y=0;
    var sum_x2=0;
    var num=0;

    var n = this.podaciPre.length;
    for(var i=0; i<n; i++){
      if(this.podaciPre[i].x_value!=0){
        sum_x += this.podaciPre[i].x_value;
        sum_y += this.podaciPre[i].y_value;
        sum_xy += this.podaciPre[i].x_value * this.podaciPre[i].y_value;
        sum_x2 += Math.pow(this.podaciPre[i].x_value,2);
        num++;
      }
    }
    this.slope = (num*sum_xy-sum_x*sum_y)/(num*sum_x2-Math.pow(sum_x,2));
    this.interception = (sum_y-this.slope*sum_x)/num;
    console.log(this.slope);
    console.log(this.interception);
    console.log(num);

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
    //gggg
    // sva usteda se akumulira u promenljivoj cusum i zajedno sa datumom kada je postignuta usteda gura u podatke koji se salju grafiku
    for (var j = 0; j < this.podaciPosle.length; j++) {
      if(this.podaciPosle[j].x_value!=0){ //sa ovim if-om preskacem mesece u kojima grejanje ne radi, odnosno kojima su stepen dani jednaki 0
        cusum +=  (this.slope * this.podaciPosle[j].x_value + this.interception)-this.podaciPosle[j].y_value;
      }
      data[0].values.push(
        [new Date(this.podaciPosle[j].god,this.podaciPosle[j].mes -1),
        cusum]




      );
    }
    this.ustedaEnergija = cusum;
    // ovde sada uzimamo da je cena energije unapred definisana - 0.06 eura, ali cemo je izracunavati kao ukupna potrosnja din/ ukupna potrosna kWh za zadnjih godinu dana
    this.ustedaNovac = this.jedinicnaCenaKwh * cusum;
    return data;
  }
  generateData1() {
    var saving=0;
    var data = [];
    data.push({
      key: "Quantity",
      bar: true,
      values: [],
    });
    //petlja trci kroz niz - posleMereEE (potrosnja nakon primene mere) i racuna rastojanje od trend linije, odnosno ustedu
    // sva usteda se akumulira u promenljivoj cusum i zajedno sa datumom kada je postignuta usteda gura u podatke koji se salju grafiku
    for (var j = 0; j < this.podaciPosle.length; j++) {
      if(this.podaciPosle[j].x_value!=0){ //sa ovim if-om preskacem mesece u kojima grejanje ne radi, odnosno kojima su stepen dani jednaki 0
        saving =  (this.slope * this.podaciPosle[j].x_value + this.interception)-this.podaciPosle[j].y_value;
      }
      else{
        saving = 0;
      }
      data[0].values.push(
        [new Date(this.podaciPosle[j].god,this.podaciPosle[j].mes -1),
          saving]




      );
    }
    return data;
  }


  getObjekatMere(objId: number) {
    this.objekatId = objId;
    this.getEnergentTip(objId);
    this.crudService.getData("obj_mere/sve?obj_id="+objId).subscribe(
      data => {
        this.objekatMere = data;
        console.log(data);

        this.isObjekatMereLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onChangeEneTip() {
    console.log(this.eneTipIzbor);
  }

  getEnergentTip(objId: number) {
    this.crudService.getData("energent_tip/lov?obj_id="+objId).subscribe(
      data => {
        this.eneTipData = data;
        console.log(data);

        this.isEneTipLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

}
