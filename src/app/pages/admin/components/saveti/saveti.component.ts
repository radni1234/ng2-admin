import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'saveti',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './saveti.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class SavetiComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  saveti = {
    id: null,
    savet_en: null,
    savet_sr: null,
    savet_de: null,
    savet_it: null,
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
      savet_sr: {
        title: 'Savet_sr',
        type: 'string'
      },
      savet_en: {
        title: 'Savet_en',
        type: 'string'
      },

    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      savet_sr: [''],
      savet_en: [''],
      savet_de: [''],
      savet_it: [''],
      version: ['']
    });
  }

  getData() {
    this.crudService.getData("saveti/sve").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  naliranje() {
    this.saveti.id = null;
    this.saveti.savet_de = null;
    this.saveti.savet_it = null;
    this.saveti.savet_sr = null;
    this.saveti.savet_en = null;
    this.saveti.version = null;
  }

  ngOnInit() {
    this.getData();
  }

  onCreate(): void{
    this.naliranje();
    this.izbor = true;
  }

  onEdit(event): void{
    this.saveti = event.data;
    this.izbor = true;
    this.source.setFilter([{ field: 'savet_sr', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit(objekat) {

    this.crudService.sendData("saveti", objekat)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.naliranje();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("saveti", this.brisanjeId)
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

