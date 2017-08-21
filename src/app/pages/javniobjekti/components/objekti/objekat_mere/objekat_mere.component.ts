import {Component, OnInit, Input, ViewChild} from "@angular/core";
import {ObjekatMere} from "./objekat_mere.data";
import {LocalDataSource} from "ng2-smart-table";
import {CrudService} from "../../../../services/crud.service";
import {ModalDirective} from "ng2-bootstrap";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Objekat} from "../objekatdata";

@Component({
  selector: 'isem-objekat-mere',
  templateUrl: 'objekat_mere.component.html',
  styleUrls: ['../../../styles/table.component.scss']
})
export class ObjekatMereComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() objekat: Objekat;

  izbor: boolean = false;
  brisanjeId: number;

  mera: ObjekatMere;

  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

  myForm: FormGroup;
  source: LocalDataSource = new LocalDataSource();

  mySettings = {
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
      },
      datumMere: {
        title: 'Datum mere',
        type: 'string'
      },
      procUstede: {
        title: 'Procenat uštede',
        type: 'number'
      },
      vrednostInvesticije: {
        title: 'Vrednost investicije',
        type: 'number'
      },
      aktivirati: {
        title: 'Aktivirati',
        type: 'boolean'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder){
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      opis: [''],
      datumMere: [''],
      procUstede: [''],
      vrednostInvesticije: [''],
      aktivirati: [''],
      version: ['']
    });
  }

  ngOnInit(){
      this.getData(this.objekat.id);
  }

  getData(objekatId: number) {
    this.crudService.getData("obj_mere/sve?obj_id="+objekatId).subscribe(
      data => {this.source.load(data);
        console.log(data);
      },
      error => {console.log(error);
        // this.router.navigate(['/login']);
      }
    );
  }

  onCreate(): void{
    this.izbor = true;
    this.mera = new ObjekatMere();
  }

  onEdit(event): void{
    this.mera = event.data;
    this.izbor = true;
    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData(this.objekat.id);
    this.izbor = false;
  }

  onSubmit() {
    this.mera.objekat = this.objekat;
    this.crudService.sendData("obj_mere", this.mera)
      .subscribe(
        data => {console.log(data); this.getData(this.objekat.id);},
        error => console.log(error)
      );

    this.izbor = false;
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("obj_mere", this.brisanjeId)
      .subscribe(
        data => {console.log(data); this.getData(this.objekat.id);},
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

  onDateChangedDatumMere(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.mera.datumMere = event.formatted;
  }
}
