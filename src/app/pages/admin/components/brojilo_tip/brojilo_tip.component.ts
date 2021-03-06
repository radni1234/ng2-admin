import {Component, OnInit, ViewEncapsulation, OnChanges} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {Router} from "@angular/router";
import {TranslateService, LangChangeEvent} from "ng2-translate";


@Component({
  selector: 'isem-tipstuba',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'brojilo_tip.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class BrojiloTipComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  brojiloTip = {
    id: null,
    naziv: null,
    version: null
  };

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

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router, private translate: TranslateService) {

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {

      this.settings.columns.naziv.title = this.translate.instant('name');
      console.log(this.translate.instant('name'));
      this.settings = Object.assign({}, this.settings);

    });

    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      version: ['']
    });
  }

  getData() {
    this.crudService.getData("brojilo_tip/sve").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  naliranje() {
    this.brojiloTip.id = null;
    this.brojiloTip.naziv = null;
    this.brojiloTip.version = null;
  }

  ngOnInit() {

    this.getData();
  }

  onCreate(): void{
    this.naliranje();
    this.izbor = true;
  }

  onEdit(event): void{
    console.log(event.data);
    this.brojiloTip = event.data;
    this.izbor = true;
    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit(objekat) {

    this.crudService.sendData("brojilo_tip", objekat)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.naliranje();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("brojilo_tip", this.brisanjeId)
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
