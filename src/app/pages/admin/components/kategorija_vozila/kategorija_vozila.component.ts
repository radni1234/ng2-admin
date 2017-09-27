import {Component, ViewEncapsulation, ViewChild} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {KategorijaVozila} from "./kategorija_vozila.data";

@Component({
  selector: 'isem-kategorija-vozila',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'kategorija_vozila.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class KategorijaVozilaComponent {
  @ViewChild('childModal') childModal: ModalDirective;


  kategorijaVozila: KategorijaVozila = new KategorijaVozila();
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
      opis: {
        title: 'Opis',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      opis: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("kat_vozila/sve").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.kategorijaVozila = new KategorijaVozila();
    this.izbor = true;
  }

  onEdit(event): void{
    this.kategorijaVozila = new KategorijaVozila();
    this.crudService.getSingle("kat_vozila/jedan?id="+event.data.id).subscribe(
      data => {this.kategorijaVozila = data;
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
    this.crudService.sendData("kat_vozila", this.kategorijaVozila)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.kategorijaVozila = new KategorijaVozila();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("kat_vozila", this.brisanjeId)
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
