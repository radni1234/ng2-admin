import {Component, ViewEncapsulation, ViewChild, OnInit, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {Pumpa} from "./pumpa.data";
import {Vodozahvat} from "../vodozahvat/vodozahvat.data";

@Component({
  selector: 'isem-vodozahvat-pumpa',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'pumpa.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class VodozahvatPumpaComponent implements OnInit  {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() vodozahvat: Vodozahvat;


  pumpa: Pumpa = new Pumpa();
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
      tip: {
        title: 'Tip',
        type: 'string'
      },
      proizvodjac: {
        title: 'Proizvođač',
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
      tip: [''],
      proizvodjac: [''],
      snaga: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("vodozahvat_pumpa/sve?vodozahvat_id=" + this.vodozahvat.id).subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.pumpa = new Pumpa();
    this.pumpa.vodozahvat = this.vodozahvat;
    this.izbor = true;
  }

  onEdit(event): void{
    this.pumpa = new Pumpa();
    this.crudService.getSingle("vodozahvat_pumpa/jedan?id="+event.data.id).subscribe(
      data => {this.pumpa = data;
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
    this.crudService.sendData("vodozahvat_pumpa", this.pumpa)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.pumpa = new Pumpa();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("vodozahvat_pumpa", this.brisanjeId)
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
