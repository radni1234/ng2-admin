import {Component, ViewEncapsulation, ViewChild, Input} from "@angular/core";
import {Podstanica} from "./podstanica.data";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {Kotlarnica} from "../kotlarnica/kotlarnica.data";

@Component({
  selector: 'isem-podstanica',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'podstanica.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class PodstanicaComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() kotlarnica: Kotlarnica;

  podstanica: Podstanica = new Podstanica();
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
      brojPodstanice: {
        title: 'Broj podstanice',
        type: 'string'
      },
      grejnaPovrsina: {
        title: 'Grejna površina',
        type: 'string'
      },
      instalisaniToplotniKapacitet: {
        title: 'Instalisani toplotni kapacitet',
        type: 'string'
      },
      tipKalorimetra: {
        title: 'Tip kalorimetra',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      brojPodstanice: [''],
      adresa: [''],
      kotlarnica: [''],
      grejnaPovrsina: [''],
      instalisaniToplotniKapacitet: [''],
      tipKalorimetra: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("podstanica/sve").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.podstanica = new Podstanica();
    this.izbor = true;
  }

  onEdit(event): void{
    this.podstanica = new Podstanica();
    this.crudService.getSingle("podstanica/jedan?id="+event.data.id).subscribe(
      data => {this.podstanica = data;
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
    this.podstanica.kotlarnica = this.kotlarnica;

    this.crudService.sendData("podstanica", this.podstanica)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.podstanica = new Podstanica();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("podstanica", this.brisanjeId)
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
