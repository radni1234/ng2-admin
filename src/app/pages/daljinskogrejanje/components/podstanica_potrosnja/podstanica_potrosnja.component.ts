import {Component, ViewEncapsulation, ViewChild, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {PodstanicaPotrosnja} from "./podstanica_potrosnja.data";
import {DatumService} from "../../../services/datum.service";
import {Podstanica} from "../podstanica/podstanica.data";

@Component({
  selector: 'isem-podstanica-potrosnja',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'podstanica_potrosnja.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class PodstanicaPotrosnjaComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() podstanica: Podstanica;

  podstanicaPotrosnja: PodstanicaPotrosnja = new PodstanicaPotrosnja();
  brisanjeId: number;
  izbor: boolean = false;

  source: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;
  datum: string;
  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

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
      datum: {
        title: 'Datum',
        type: 'string'
      },
      potrosnjaKwh: {
        title: 'Potrošnja (kWh)',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      datum: [''],
      potrosnjaKwh: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("potrosnja_podstanice/sve?podstanica_id="+this.podstanica.id).subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.podstanicaPotrosnja = new PodstanicaPotrosnja();
    this.izbor = true;
  }

  onEdit(event): void{
    this.podstanicaPotrosnja = new PodstanicaPotrosnja();
    this.crudService.getSingle("potrosnja_podstanice/jedan?id="+event.data.id).subscribe(
      data => {this.podstanicaPotrosnja = data;
        console.log(data);
        this.izbor = true;
        this.datum = this.podstanicaPotrosnja.datum;
      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {
    this.podstanicaPotrosnja.podstanica = this.podstanica;

    this.crudService.sendData("potrosnja_podstanice", this.podstanicaPotrosnja)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.podstanicaPotrosnja = new PodstanicaPotrosnja();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("potrosnja_podstanice", this.brisanjeId)
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

  onDateChangedDatum(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.podstanicaPotrosnja.datum = event.formatted;
  }
}
