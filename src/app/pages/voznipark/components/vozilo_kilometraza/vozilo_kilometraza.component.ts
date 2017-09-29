import {Component, ViewEncapsulation, ViewChild, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {VoziloKilometraza} from "./vozilo_kilometraza.data";
import {Vozilo} from "../vozilo/vozilo.data";

@Component({
  selector: 'isem-vozilo-kilometraza',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'vozilo_kilometraza.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class VoziloKilometrazaComponent {
  @ViewChild('childModal') childModal: ModalDirective;

  @Input() voziloId: number;
  vozilo: Vozilo;

  voziloKilometraza: VoziloKilometraza = new VoziloKilometraza();
  brisanjeId: number;
  izbor: boolean = false;

  datum: Date;
  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };


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
      datum: {
        title: 'Datum',
        type: 'string'
      },
      kilometraza: {
        title: 'Kilometraža',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      vozilo: [''],
      datum: [''],
      kilometraza: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
    this.getDataVozilo();
  }

  getData() {
    this.crudService.getData("vozilo_km/sve?vozilo_id="+this.voziloId).subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getDataVozilo() {
    this.crudService.getSingle("vozilo/jedan?id="+this.voziloId).subscribe(
      data => {this.vozilo = data;},
      error => {console.log(error); }
    );
  }

  onCreate(): void{
    this.voziloKilometraza = new VoziloKilometraza();
    this.voziloKilometraza.vozilo = this.vozilo;
    this.izbor = true;
  }

  onEdit(event): void{
    this.voziloKilometraza = new VoziloKilometraza();
    this.crudService.getSingle("vozilo_km/jedan?id="+event.data.id).subscribe(
      data => {this.voziloKilometraza = data;
        this.datum = this.voziloKilometraza.datum;
        console.log(data);
        this.izbor = true;
      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'datum', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {
    this.crudService.sendData("vozilo_km", this.voziloKilometraza)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.voziloKilometraza = new VoziloKilometraza();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("vozilo_km", this.brisanjeId)
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
    this.voziloKilometraza.datum = event.formatted;
  }
}
