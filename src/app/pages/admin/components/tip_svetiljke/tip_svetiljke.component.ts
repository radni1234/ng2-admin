import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {Router} from "@angular/router";
import {SvetiljkaTip} from "./tip_svetiljke.data";

@Component({
  selector: 'isem-tipsvetiljke',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'tip_svetiljke.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class TipSvetiljkeComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  tipSvetiljke: SvetiljkaTip;
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
      izvor: {
        title: 'Izvor',
        type: 'string'
      },
      snaga: {
        title: 'Snaga',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      izvor: [''],
      snaga: [''],
      version: ['']
    });
  }

  getData() {
    this.crudService.getData("svetiljka_tip/sve").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  naliranje() {
    this.tipSvetiljke.id = null;
    this.tipSvetiljke.naziv = null;
    this.tipSvetiljke.izvor = null;
    this.tipSvetiljke.snaga = null;
    this.tipSvetiljke.version = null;
  }

  ngOnInit() {
    this.getData();
  }

  onCreate(): void{
    this.tipSvetiljke = new SvetiljkaTip();
    this.naliranje();
    this.izbor = true;
  }

  onEdit(event): void{
    this.tipSvetiljke = new SvetiljkaTip();
    this.tipSvetiljke = event.data;
    this.izbor = true;
    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit(objekat) {

    this.crudService.sendData("svetiljka_tip", objekat)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.naliranje();
    this.tipSvetiljke = new SvetiljkaTip();
  }

  onDelete(event){
    this.brisanjeId = event.data.id
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("svetiljka_tip", this.brisanjeId)
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
