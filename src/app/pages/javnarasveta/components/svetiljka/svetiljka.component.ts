import {Component, ViewEncapsulation, ViewChild, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {Svetiljka} from "./svetiljka.data";
import {SvetiljkaTip} from "../../../admin/components/tip_svetiljke/tip_svetiljke.data";
import {Stub} from "../stub/stub.data";

@Component({
  selector: 'isem-svetiljka',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'svetiljka.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class SvetiljkaComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() stub: Stub;

  svetiljka: Svetiljka = new Svetiljka();
  brisanjeId: number;
  izbor: boolean = false;

  source: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;

  svetiljkaTipSve: SvetiljkaTip[];
  svetiljkaTipId: number;
  isSvetiljkaTipLoaded: boolean = false;

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
      svetiljkaTip: {
        title: 'Tip svetiljke',
        type: 'string'
      },
      kom: {
        title: 'Komada',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      svetiljkaTip: [''],
      kom: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
    this.getDataSvetiljkaTip();
  }

  getData() {
    this.crudService.getData("svetiljka/tab?stub_id="+this.stub.id).subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getDataSvetiljkaTip() {
    this.crudService.getData("svetiljka_tip/sve").subscribe(
      data => {
        this.svetiljkaTipSve = data;
        this.isSvetiljkaTipLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.svetiljka = new Svetiljka();
    this.svetiljka.stub = this.stub;
    this.svetiljkaTipId = this.svetiljkaTipSve[0].id;
    this.izbor = true;
  }

  onEdit(event): void{
    this.svetiljka = new Svetiljka();
    this.crudService.getSingle("svetiljka/jedan?id="+event.data.id).subscribe(
      data => {this.svetiljka = data;
        console.log(data);

        if (!this.svetiljka.svetiljkaTip){
          this.svetiljkaTipId = null;
        } else {
          this.svetiljkaTipId = this.svetiljka.svetiljkaTip.id;
        }

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
    if (this.isSvetiljkaTipLoaded) {
      if (this.svetiljkaTipId.toString() == "0: null") {
        this.svetiljka.svetiljkaTip = null;
      } else {
        for (let item of this.svetiljkaTipSve) {
          if (item.id == this.svetiljkaTipId) {
            this.svetiljka.svetiljkaTip = item;
          }
        }
      }
    }

    this.svetiljka.stub = this.stub;

    this.crudService.sendData("svetiljka", this.svetiljka)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.svetiljka = new Svetiljka();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("svetiljka", this.brisanjeId)
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
