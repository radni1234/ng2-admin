import {Component, ViewEncapsulation, ViewChild, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {TrendIskljuceno} from "./trend_iskljuceno.data";
import {Objekat} from "../../../javniobjekti/components/objekti/objekatdata";

@Component({
  selector: 'isem-trend-iskljuceno',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'trend_iskljuceno.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class TrendIskljucenoComponent implements OnInit  {
  @ViewChild('childModal') childModal: ModalDirective;


  trendIskljuceno: TrendIskljuceno = new TrendIskljuceno();
  brisanjeId: number;
  izbor: boolean = false;

  objekatSve: Objekat[];
  objekatId: number;
  isObjekatLoaded: boolean = false;

  mes: String;
  god: String;

  months = [
    { val: '01',  name: 'Januar' },
    { val: '02',  name: 'Februar' },
    { val: '03',  name: 'Mart' },
    { val: '04',  name: 'April' },
    { val: '05',  name: 'Maj' },
    { val: '06',  name: 'Jun' },
    { val: '07',  name: 'Jul' },
    { val: '08',  name: 'Avgust' },
    { val: '09',  name: 'Septembar' },
    { val: '10',  name: 'Oktobar' },
    { val: '11',  name: 'Novembar' },
    { val: '12',  name: 'Decembar' }
  ];

  years: number[] =[];
  private yy : number;

  source: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>'
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>'
    },
    mode: 'external',
    actions: {
      columnTitle: ''
    },
    noDataMessage: 'Podaci nisu pronađeni',
    columns: {
      objekat: {
        title: 'Objekat',
        type: 'string'
      },
      godina: {
        title: 'Godina',
        type: 'string'
      },
      mesec: {
        title: 'Mesec',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      objekat: [''],
      godina: [''],
      mesec: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
    this.getDataObjekat();
    this.getYear();
  }

  getData() {
    this.crudService.getData("trend_isklj/tab").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getDataObjekat() {
    this.crudService.getData("objekat/sve").subscribe(
      data => {
        this.objekatSve = data;
        this.isObjekatLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.trendIskljuceno = new TrendIskljuceno();
    this.objekatId = this.objekatSve[0].id;
    this.postaviDatume();
    this.izbor = true;
  }

  onEdit(event): void{
    this.trendIskljuceno = new TrendIskljuceno();
    this.crudService.getSingle("trend_isklj/jedan?id="+event.data.id).subscribe(
      data => {this.trendIskljuceno = data;
        console.log(data);

        if (!this.trendIskljuceno.objekat){
          this.objekatId = null;
        } else {
          this.objekatId = this.trendIskljuceno.objekat.id;
        }

        this.god =  this.trendIskljuceno.period.toString().substring(0, 4);
        this.mes =  this.trendIskljuceno.period.toString().substring(4);

        this.izbor = true;
      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'objekat', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {

    if (this.isObjekatLoaded) {
      if (this.objekatId.toString() == "0: null") {
        this.trendIskljuceno.objekat = null;
      } else {
        for (let item of this.objekatSve) {
          if (item.id == this.objekatId) {
            this.trendIskljuceno.objekat = item;
          }
        }
      }
    }
    var g = this.god.toString();
    var m = this.mes.toString();

    this.trendIskljuceno.period = parseInt(g.concat(m));

    this.crudService.sendData("trend_isklj", this.trendIskljuceno)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.trendIskljuceno = new TrendIskljuceno();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("trend_isklj", this.brisanjeId)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.hideChildModal();
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  getYear(){
    var today = new Date();
    this.yy = today.getFullYear();
    for(var i = (this.yy-15); i <= this.yy; i++){
      this.years.push(i);
    }
  }

  postaviDatume() {
    var today = new Date();

    this.god = today.getFullYear().toString();

    var mesec = today.getMonth() + 1;

    if (mesec < 10) {
      this.mes = '0' + mesec;
    }
  }
}
