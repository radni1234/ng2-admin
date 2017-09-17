import {Component, ViewEncapsulation, ViewChild} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {Trafo} from "./trafo.data";

@Component({
  selector: 'isem-trafo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'trafo.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class TrafoComponent {
  @ViewChild('childModal') childModal: ModalDirective;


  trafo: Trafo = new Trafo();
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
      opstina: {
        title: 'Opština',
        type: 'string'
      },
      mesto: {
        title: 'Mesto',
        type: 'string'
      },
      adresa: {
        title: 'Adresa',
        type: 'string'
      },
      lonD: {
        title: 'Geografska širina',
        type: 'string'
      },
      latD: {
        title: 'Geografska dužina',
        type: 'string'
      },
      brojIntalisanihSvetiljki: {
        title: 'Broj instalisanih svetiljki',
        type: 'string'
      },
      snagaIntalisanihSvetiljki: {
        title: 'Snaga intalisanih svetiljki',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      mesto: [''],
      adresa: [''],
      lonD: [''],
      latD: [''],
      gausX: [''],
      gausY: [''],
      noviRedosled: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("trafo/tab").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.trafo = new Trafo();
    this.izbor = true;
  }

  onEdit(event): void{
    this.trafo = new Trafo();
    this.crudService.getSingle("trafo/jedan?id="+event.data.id).subscribe(
      data => {this.trafo = data;
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
    this.crudService.sendData("trafo", this.trafo)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.trafo = new Trafo();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("trafo", this.brisanjeId)
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
