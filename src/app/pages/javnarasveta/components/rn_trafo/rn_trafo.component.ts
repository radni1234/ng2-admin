import {Component, ViewEncapsulation, ViewChild, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {RnTrafo} from "./rn_trafo.data";
import {Trafo} from "../trafo/trafo.data";

@Component({
  selector: 'isem-rn-trafo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'rn_trafo.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class RnTrafoComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() trafo: Trafo;

  rnTrafo: RnTrafo = new RnTrafo();
  brisanjeId: number;
  izbor: boolean = false;

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
      datumr: {
        title: 'Datum',
        type: 'string'
      },
      potrosnja: {
        title: 'Potrošnja',
        type: 'string'
      },
      iznos: {
        title: 'Iznos',
        type: 'string'
      }
    }
  };

  datum: string;
  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      datumr: [''],
      potrosnja: [''],
      iznos: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("rn_trafo/sve?trafo_id="+this.trafo.id).subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.rnTrafo = new RnTrafo();
    this.izbor = true;
  }

  onEdit(event): void{
    this.rnTrafo = new RnTrafo();
    this.crudService.getSingle("rn_trafo/jedan?id="+event.data.id).subscribe(
      data => {this.rnTrafo = data;
        console.log(data);
        this.izbor = true;
        this.datum = this.rnTrafo.datumr;
      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'datumr', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {
    this.rnTrafo.trafo = this.trafo;

    this.crudService.sendData("rn_trafo", this.rnTrafo)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.rnTrafo = new RnTrafo();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("rn_trafo", this.brisanjeId)
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
    this.rnTrafo.datumr = event.formatted;
  }
}
