import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'isem-uloga',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'uloga.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class UlogaComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  obj = {
    id: null,
    naziv: null,
    kraciNaz: null,
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
        },
        kraciNaz: {
          title: 'Kraći naziv',
          type: 'string'
        }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      kraciNaz: [''],
      version: ['']
    });
  }

  getData() {
    this.crudService.getData("uloga").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => console.log(error)
    );
  }

  naliranje() {
    this.obj.id = null;
    this.obj.naziv = null;
    this.obj.version = null;
  }

  ngOnInit() {
    this.getData();
  }

  onCreate(): void{
    this.naliranje();
    this.izbor = true;
  }

  onEdit(event): void{
    this.obj = event.data;
    this.izbor = true;
    this.source.setFilter([{ field: 'naziv', search: '' },{ field: 'kraciNaz', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit(objekat) {

    this.crudService.sendData("uloga", objekat)
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
    this.crudService.delete("uloga", this.brisanjeId)
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