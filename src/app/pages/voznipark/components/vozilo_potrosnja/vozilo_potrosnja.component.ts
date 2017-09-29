import {Component, ViewEncapsulation, ViewChild, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {VoziloPotrosnja} from "./vozilo_potrosnja.data";
import {Energent} from "../../../admin/components/energent/energentdata";
import {Vozilo} from "../vozilo/vozilo.data";


@Component({
  selector: 'isem-vozilo-potrosnja',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'vozilo_potrosnja.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class VoziloPotrosnjaComponent {
  @ViewChild('childModal') childModal: ModalDirective;

  @Input() voziloId: number;
  vozilo: Vozilo;

  voziloPotrosnja: VoziloPotrosnja = new VoziloPotrosnja();
  brisanjeId: number;
  izbor: boolean = false;

  energentSve: Energent[];
  energentId: number;
  isEnergentLoaded: boolean = false;

  datum: Date;
  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

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
      energent: {
        title: 'Energent',
        type: 'string'
      },
      datum: {
        title: 'Datum',
        type: 'string'
      },
      potrosnja: {
        title: 'Potrošnja',
        type: 'number'
      },
      iznos: {
        title: 'Iznos',
        type: 'number'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      vozilo: [''],
      energent: [''],
      datum: [''],
      potrosnja: [''],
      iznos: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
    this.getDataVozilo();
  }

  getData() {
    this.crudService.getData("vozilo_potrosnja/tab?vozilo_id="+this.voziloId).subscribe(
      data => {this.source.load(data);
              console.log(data);
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getDataVozilo() {
    this.crudService.getSingle("vozilo/jedan?id="+this.voziloId).subscribe(
      data => {this.vozilo = data;
        this.energentSve = this.vozilo.energenti;
        this.isEnergentLoaded = true;},
      error => {console.log(error); }
    );
  }

  onCreate(): void{
    this.voziloPotrosnja = new VoziloPotrosnja();
    this.voziloPotrosnja.vozilo = this.vozilo;
    if(this.isEnergentLoaded){
      this.energentId = this.energentSve[0].id;
    }

    this.izbor = true;
  }

  onEdit(event): void{
    this.voziloPotrosnja = new VoziloPotrosnja();
    this.crudService.getSingle("vozilo_potrosnja/jedan?id="+event.data.id).subscribe(
      data => {this.voziloPotrosnja = data;

        if (!this.voziloPotrosnja.energent){
          this.energentId = null;
        } else {
          this.energentId = this.voziloPotrosnja.energent.id;
        }

        this.datum = this.voziloPotrosnja.datum;

        console.log(data);
        this.izbor = true;
      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'datum', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {
    if (this.isEnergentLoaded) {
      if (this.energentId.toString() == "0: null") {
        this.voziloPotrosnja.energent = null;
      } else {
        for (let item of this.energentSve) {
          if (item.id == this.energentId) {
            this.voziloPotrosnja.energent = item;
          }
        }
      }
    }

    this.crudService.sendData("vozilo_potrosnja", this.voziloPotrosnja)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.voziloPotrosnja = new VoziloPotrosnja();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("vozilo_potrosnja", this.brisanjeId)
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
    this.voziloPotrosnja.datum = event.formatted;
  }
}
