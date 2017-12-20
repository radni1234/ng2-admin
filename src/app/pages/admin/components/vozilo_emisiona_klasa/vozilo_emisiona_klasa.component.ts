import {Component, ViewEncapsulation, ViewChild, OnInit} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {VoziloEmisionaKlasa} from "./vozilo_emisiona_klasa.data";

@Component({
  selector: 'isem-vozilo-emisiona-klasa',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'vozilo_emisiona_klasa.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class VoziloEmisionaKlasaComponent implements OnInit  {
  @ViewChild('childModal') childModal: ModalDirective;


  voziloEmisionaKlasa: VoziloEmisionaKlasa = new VoziloEmisionaKlasa();
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
    this.crudService.getData("emisiona_klasa/sve").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.voziloEmisionaKlasa = new VoziloEmisionaKlasa();
    this.izbor = true;
  }

  onEdit(event): void{
    this.voziloEmisionaKlasa = new VoziloEmisionaKlasa();
    this.crudService.getSingle("emisiona_klasa/jedan?id="+event.data.id).subscribe(
      data => {this.voziloEmisionaKlasa = data;
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
    this.crudService.sendData("emisiona_klasa", this.voziloEmisionaKlasa)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.voziloEmisionaKlasa = new VoziloEmisionaKlasa();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("emisiona_klasa", this.brisanjeId)
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
