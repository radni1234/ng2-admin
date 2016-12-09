import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {Opstina, Mesto} from "./opstinadata";

@Component({
  selector: 'isem-opstina',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './opstina.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class OpstinaComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('childModalMesto') childModalMesto: ModalDirective;

  opstina: Opstina = new Mesto();
  mesto: Mesto = new Mesto();

  brisanjeId: number;
  brisanjeIdMesto: number;
  izbor1: boolean = true;
  izbor2: boolean = false;
  izbor3: boolean = false;

  source: LocalDataSource = new LocalDataSource();
  sourceMesta: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;
  myFormMesta: FormGroup;

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
      id: {
        title: 'Id',
        type: 'string'
      },
        naziv: {
        title: 'Naziv',
        type: 'string'
      }

    }
  };
  settingsMesta = {
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
      id: {
        title: 'Id',
        type: 'string'
      },
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
    this.myFormMesta = this.fb.group({
      id: [''],
      naziv: [''],
      version: ['']
    });
  }

  getData() {
    this.crudService.getData("opstina").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => console.log(error)
    );
  }
  getMesta(id: any) {
    this.crudService.getListaMesta(id).subscribe(
      data => {this.sourceMesta.load(data); console.log(data);},
      error => console.log(error)
    );
  }

  naliranje() {
    this.opstina.id = null;
    this.opstina.naziv = null;
    this.opstina.version = null;
  }

  naliranjeMesto() {
    this.mesto.id = null;
    this.mesto.naziv = null;
    this.mesto.opstina = null;
    this.mesto.version = null;
  }

  ngOnInit() {
    this.getData();
  }

  onCreate(): void{
    this.naliranje();
    this.izbor2 = true;
    this.izbor1 = false;
    this.izbor3 = false;
  }
  onCreateMesto(): void{
    this.naliranjeMesto();
    this.mesto.opstina = this.opstina;
    console.log(this.mesto);
    this.izbor2 = false;
    this.izbor1 = false;
    this.izbor3 = true;
    console.log(this.opstina.id);

  }

  onEdit(event): void{
    this.opstina = event.data;
    console.log(this.opstina);
    this.getMesta(this.opstina.id);
    this.izbor2 = true;
    this.izbor1 = false;
    this.izbor3 = false;
    this.source.setFilter([{ field: 'naziv', search: '' }]);

  }
  onEditMesto(event): void{
    this.mesto = event.data;
    console.log(this.mesto);
//    this.getMesta(this.opstina.id);
    this.izbor2 = false;
    this.izbor1 = false;
    this.izbor3 = true;
    this.source.setFilter([{ field: 'naziv', search: '' }]);

  }

  onCancel() {
    this.getData();
    this.izbor1 = true;
    this.izbor2 = false;
    this.izbor3 = false;
  }

  onCancelMesto() {
    this.getMesta(this.opstina.id);
    this.izbor1 = false;
    this.izbor2 = true;
    this.izbor3 = false;
  }

  onSubmit(objekat) {

    this.crudService.sendData("opstina", objekat)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor1 = true;
    this.izbor2 = false;
    this.izbor3 = false;
    this.naliranje();
  }
  onSubmitMesto() {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(this.opstina.id);
    console.log(this.mesto);
    this.crudService.sendData("mesto", this.mesto)
      .subscribe(
        data => {console.log(data);
          this.getMesta(data.opstina.id);
        },
        error => console.log(error)
      );

    this.izbor1 = false;
    this.izbor2 = true;
    this.izbor3 = false;
 //   this.naliranje();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteMesto(event){
    this.brisanjeIdMesto = event.data.id;
    this.showChildModalMesto();
  }

  onDeleteConfirm() {
    this.crudService.delete("opstina", this.brisanjeId)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.hideChildModal();
  }
  onDeleteConfirmMesto() {
    console.log(this.opstina.id);
    this.crudService.delete("mesto", this.brisanjeIdMesto)
      .subscribe(
        data => {console.log(data);
          console.log(this.opstina.id);
          this.getMesta(this.opstina.id);
        },
        error => console.log(error)
      );

    this.hideChildModalMesto();
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  showChildModalMesto(): void {
    this.childModalMesto.show();
  }

  hideChildModalMesto(): void {
    this.childModalMesto.hide();
  }

}
