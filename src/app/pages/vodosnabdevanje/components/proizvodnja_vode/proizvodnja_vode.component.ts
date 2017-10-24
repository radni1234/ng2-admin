import {Component, ViewEncapsulation, ViewChild, OnInit, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {ProizvodnjaVode} from "./proizvodnja_vode.data";
import {Vodozahvat} from "../vodozahvat/vodozahvat.data";


@Component({
  selector: 'isem-proizvodnja-vode',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'proizvodnja_vode.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class ProizvodnjaVodeComponent implements OnInit  {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() vodozahvat: Vodozahvat;

  proizvodnjaVode: ProizvodnjaVode = new ProizvodnjaVode();
  brisanjeId: number;
  izbor: boolean = false;

  source: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;

  datum: string;
  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

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
      datum: {
        title: 'Datum',
        type: 'string'
      },
      proizvodnja: {
        title: 'Proizvodnja',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      datum: [''],
      proizvodnja: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("proizvodnja_vode/sve?vodozahvat_id=" + this.vodozahvat.id).subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.proizvodnjaVode = new ProizvodnjaVode();
    this.proizvodnjaVode.vodozahvat = this.vodozahvat;
    this.izbor = true;
  }

  onEdit(event): void{
    this.proizvodnjaVode = new ProizvodnjaVode();
    this.crudService.getSingle("proizvodnja_vode/jedan?id="+event.data.id).subscribe(
      data => {this.proizvodnjaVode = data;
        this.datum = this.proizvodnjaVode.datum;
        console.log(data);
        this.izbor = true;
      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {
    this.crudService.sendData("proizvodnja_vode", this.proizvodnjaVode)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.proizvodnjaVode = new ProizvodnjaVode();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("proizvodnja_vode", this.brisanjeId)
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

  onDateChangedDatum(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.proizvodnjaVode.datum = event.formatted;
  }
}
