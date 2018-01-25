import {Component, ViewEncapsulation, ViewChild, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {VodozahvatGrupa} from "./vodozahvat_grupa.data";

@Component({
  selector: 'isem-vodozahvat_grupa',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'vodozahvat_grupa.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class VodozahvatGrupaComponent implements OnInit  {
  @ViewChild('childModal') childModal: ModalDirective;


  vodozahvatGrupa: VodozahvatGrupa = new VodozahvatGrupa();
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
      napomena: {
        title: 'Napomena',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("vodozahvat_grupa/sve").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.vodozahvatGrupa = new VodozahvatGrupa();
    this.izbor = true;
  }

  onEdit(event): void{
    this.vodozahvatGrupa = new VodozahvatGrupa();
    this.crudService.getSingle("vodozahvat_grupa/jedan?id="+event.data.id).subscribe(
      data => {this.vodozahvatGrupa = data;
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
    this.crudService.sendData("vodozahvat_grupa", this.vodozahvatGrupa)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.vodozahvatGrupa = new VodozahvatGrupa();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("vodozahvat_grupa", this.brisanjeId)
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
