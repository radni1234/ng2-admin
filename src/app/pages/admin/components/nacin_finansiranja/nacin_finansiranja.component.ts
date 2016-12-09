import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'isem-nacfinansiranja',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nacin_finansiranja.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class NacinFinansiranjaComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  nacinFinansiranja = {
    id: null,
    naziv: null,
    version: null
  };

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
      naziv: {
        title: 'Naziv',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      version: ['']
    });
  }

  getData() {
    this.crudService.getData("nac_fin").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => console.log(error)
    );
  }

  naliranje() {
    this.nacinFinansiranja.id = null;
    this.nacinFinansiranja.naziv = null;
    this.nacinFinansiranja.version = null;
  }

  ngOnInit() {
    this.getData();
  }

  onCreate(): void{
    this.naliranje();
    this.izbor = true;
  }

  onEdit(event): void{
    this.nacinFinansiranja = event.data;
    this.izbor = true;
    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit(objekat) {

    this.crudService.sendData("nac_fin", objekat)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.naliranje();
  }

  onDelete(event){
    this.brisanjeId = event.data.id
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("nac_fin", this.brisanjeId)
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

}
