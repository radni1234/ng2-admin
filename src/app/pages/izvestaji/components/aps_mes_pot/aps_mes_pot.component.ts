
import {Component, ViewEncapsulation, OnInit} from "@angular/core";
import {CrudService} from "../../../services/crud.service";
import {Objekat} from "../../../javniobjekti/components/objekti/objekatdata";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

@Component({
  selector: 'isem-tipstuba',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'aps_mes_pot.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class IzvApsMesPot implements OnInit {
  podaci:Array<any>;
  objekat: Array<Objekat>;

  isObjekatLoaded: boolean;
  isEneTipLoaded: boolean;


  datumOd: String;
  datumDo: String;

  mesOd: String;
  godOd: String;

  mesDo: String;
  godDo: String;

  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

  optionsModel: number[]; // Default selection
  eneTipIzbor: number[];

  myOptions: IMultiSelectOption[]; // = this.objekatLov;
  eneTipData: IMultiSelectOption[];


  // myOptions: IMultiSelectOption[] = [
  //   { id: 1, name: 'Option 1' },
  //   { id: 2, name: 'Option 2' },
  // ];

  mySettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 1,
    closeOnSelect: true,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };

  myTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: 'Izaberite objekat',
  };

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

  constructor(private crudService: CrudService) {
  }

  ngOnInit() {
    this.getObjekte();
    this.postaviDatume();
  }

  getObjekte() {
    this.crudService.getPodatke("objekat/lov").subscribe(
      data => {
        this.myOptions = data;
        console.log(data);

        this.isObjekatLoaded = true;
      },
      error => console.log(error)
    );
  }

  getEnergentTip() {
    this.crudService.getPodatke("energent_tip/lov?obj_id="+this.optionsModel).subscribe(
      data => {
        this.eneTipData = data;
        console.log(data);

        this.isEneTipLoaded = true;
      },
      error => console.log(error)
    );
  }

  onChangeObjekat() {
    this.getEnergentTip();
    console.log(this.optionsModel);
  }

  onChangeEneTip() {
    console.log(this.eneTipIzbor);
  }

  onSubmit() {
    this.crudService.getPodatke("izvestaj/aps_mes_pot?obj_id="+this.optionsModel+"&ene_tip_id="+this.eneTipIzbor+"&datum_od="+'15'+'.'+this.mesOd+'.'+this.godOd+"&datum_do="+'15'+'.'+this.mesDo+'.'+this.godDo).subscribe(
      data => {this.podaci = data; console.log(data);},
      error => console.log(error)
    );
  }

  onYearChangeOd(event:any) {
    console.log(event);
    this.godOd = event;
    console.log('15'+'.'+this.mesOd+'.'+this.godOd);
}

  onMonthChangeOd(event:any) {
    console.log(event);
    this.mesOd = event;
    console.log('15'+'.'+this.mesOd+'.'+this.godOd);
  }

  onYearChangeDo(event:any) {
    console.log(event);
    this.godDo = event;
    console.log('15'+'.'+this.mesDo+'.'+this.godDo);
  }

  onMonthChangeDo(event:any) {
    console.log(event);
    this.mesDo = event;
    console.log('15'+'.'+this.mesDo+'.'+this.godDo);
  }

  postaviDatume(){
    var today = new Date();

    this.godOd = today.getFullYear().toString();
    this.mesOd = '01';

    this.godDo = today.getFullYear().toString();
    this.mesDo;

    var mesec = today.getMonth()+1;

    if(mesec<10) {
      this.mesDo='0'+mesec;
    }

  }

  // onDatumOdChanged(event:any) {
  //   console.log('onDatumOdChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  //   this.datumOd = event.formatted;
  // }
  //
  // onDatumDoChanged(event:any) {
  //   console.log('onDatumDoChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  //   this.datumDo = event.formatted;
  // }
  //
  // odrediDanasnjiDatum(){
  //   var today:any = new Date();
  //   var dd = today.getDate();
  //   var mm = today.getMonth()+1; //January is 0!
  //   var yyyy = today.getFullYear();
  //
  //       if(dd<10) {
  //       dd='0'+dd
  //     }
  //
  //     if(mm<10) {
  //       mm='0'+mm
  //     }
  //
  //     this.datumDo = dd+'.'+mm+'.'+yyyy;
  //
  //     this.datumOd = '01.01.'+yyyy;
  // }
}
