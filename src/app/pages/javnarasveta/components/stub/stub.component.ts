import {Component, ViewEncapsulation, ViewChild, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {Stub} from "./stub.data";
import {Trafo} from "../trafo/trafo.data";
import {StubTip} from "../../../admin/components/tip_stuba/tip_stuba.data";

@Component({
  selector: 'isem-stub',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'stub.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class StubComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() trafo: Trafo;

  stub: Stub = new Stub();
  brisanjeId: number;
  izbor: boolean = false;

  source: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;

  stubTipSve: StubTip[];
  stubTipId: number;
  isStubTipLoaded: boolean = false;

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
      adresa: {
        title: 'Adresa',
        type: 'string'
      },
      stubTip: {
        title: 'Tip stuba',
        type: 'string'
      },
      lonD: {
        title: 'Geografska dužina',
        type: 'string'
      },
      latD: {
        title: 'Geografska širina',
        type: 'string'
      },
      gausX: {
        title: 'Gaus-Kriger X',
        type: 'string'
      },
      gausY: {
        title: 'Gaus-Kriger Y',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      trafo: [''],
      stubTip: [''],
      adresa: [''],
      lonD: [''],
      latD: [''],
      gausX: [''],
      gausY: [''],
      rbr: [''],
      adresaSlike: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
    this.getDataStubTip();
  }

  getData() {
    this.crudService.getData("stub/tab?trafo_id="+this.trafo.id).subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.stub = new Stub();
    this.stubTipId = this.stubTipSve[0].id;
    this.izbor = true;
  }

  onEdit(event): void{
    this.stub = new Stub();
    this.crudService.getSingle("stub/jedan?id="+event.data.id).subscribe(
      data => {this.stub = data;
        console.log(data);
        this.izbor = true;

        if (!this.stub.stubTip){
          this.stubTipId = null;
        } else {
          this.stubTipId = this.stub.stubTip.id;
        }

      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'adresa', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {

    if (this.isStubTipLoaded) {
      if (this.stubTipId.toString() == "0: null") {
        this.stub.stubTip = null;
      } else {
        for (let item of this.stubTipSve) {
          if (item.id == this.stubTipId) {
            this.stub.stubTip = item;
          }
        }
      }
    }

    this.stub.trafo = this.trafo;

    this.crudService.sendData("stub", this.stub)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.stub = new Stub();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("stub", this.brisanjeId)
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

  getDataStubTip() {
    this.crudService.getData("stub_tip/sve").subscribe(
      data => {
        this.stubTipSve = data;
        this.isStubTipLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }
}
