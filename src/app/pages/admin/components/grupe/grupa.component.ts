import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {Grupa, Podgrupa} from "./grupadata";
import {Router} from "@angular/router";

@Component({
  selector: 'isem-grupa',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './grupa.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class GrupaComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('childModalPodgrupa') childModalPodgrupa: ModalDirective;

  grupa: Grupa = new Grupa();
  podgrupa: Podgrupa = new Podgrupa();

  brisanjeId: number;
  brisanjeIdPodgrupa: number;
  izbor1: boolean = true;
  izbor2: boolean = false;
  izbor3: boolean = false;

  source: LocalDataSource = new LocalDataSource();
  sourcePodgrupa: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;
  myFormPodgrupa: FormGroup;

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
  settingsPodgrupa = {
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

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      version: ['']
    });
    this.myFormPodgrupa = this.fb.group({
      id: [''],
      naziv: [''],
      version: ['']
    });
  }

  getData() {
    this.crudService.getData("grupa/sve").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }
  getPodgrupa(id: any) {
    this.crudService.getData("podgrupa/sve?gru_id="+id).subscribe(
      data => {this.sourcePodgrupa.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  naliranje() {
    this.grupa.id = null;
    this.grupa.naziv = null;
    this.grupa.version = null;
  }

  naliranjePodgrupa() {
    this.podgrupa.id = null;
    this.podgrupa.naziv = null;
    this.podgrupa.grupa = null;
    this.podgrupa.version = null;
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
  onCreatePodgrupa(): void{
    this.naliranjePodgrupa();
    this.podgrupa.grupa = this.grupa;
    console.log(this.podgrupa);
    this.izbor2 = false;
    this.izbor1 = false;
    this.izbor3 = true;
    console.log(this.grupa.id);

  }

  onEdit(event): void{
    this.grupa = event.data;
    console.log(this.grupa);
    this.getPodgrupa(this.grupa.id);
    this.izbor2 = true;
    this.izbor1 = false;
    this.izbor3 = false;
    this.source.setFilter([{ field: 'naziv', search: '' }]);

  }
  onEditPodgrupa(event): void{
    this.podgrupa = event.data;
    console.log(this.podgrupa);
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

  onCancelPodgrupa() {
    this.getPodgrupa(this.grupa.id);
    this.izbor1 = false;
    this.izbor2 = true;
    this.izbor3 = false;
  }

  onSubmit(objekat) {

    this.crudService.sendData("grupa", objekat)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor1 = true;
    this.izbor2 = false;
    this.izbor3 = false;
    this.naliranje();
  }
  onSubmitPodgrupa() {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(this.grupa.id);
    console.log(this.podgrupa);
    this.crudService.sendData("podgrupa", this.podgrupa)
      .subscribe(
        data => {console.log(data);
          this.getPodgrupa(data.grupa.id);
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

  onDeletePodgrupa(event){
    this.brisanjeIdPodgrupa = event.data.id;
    this.showChildModalPodgrupa();
  }

  onDeleteConfirm() {
    this.crudService.delete("grupa", this.brisanjeId)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.hideChildModal();
  }
  onDeleteConfirmPodgrupa() {
    console.log(this.grupa.id);
    this.crudService.delete("podgrupa", this.brisanjeIdPodgrupa)
      .subscribe(
        data => {console.log(data);
          console.log(this.grupa.id);
          this.getPodgrupa(this.grupa.id);
        },
        error => console.log(error)
      );

    this.hideChildModalPodgrupa();
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  showChildModalPodgrupa(): void {
    this.childModalPodgrupa.show();
  }

  hideChildModalPodgrupa(): void {
    this.childModalPodgrupa.hide();
  }

}
