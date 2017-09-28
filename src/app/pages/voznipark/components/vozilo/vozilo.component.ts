import {Component, ViewEncapsulation, ViewChild} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {Vozilo} from "./vozilo.data";
import {CrudService} from "../../../services/crud.service";
import {JavnoPreduzece} from "../../../admin/components/javno_preduzece/javno_preduzece.data";
import {KategorijaVozila} from "../../../admin/components/kategorija_vozila/kategorija_vozila.data";


@Component({
  selector: 'isem-vozilo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'vozilo.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class VoziloComponent {
  @ViewChild('childModal') childModal: ModalDirective;

  test = 'a';
  vozilo: Vozilo = new Vozilo();
  brisanjeId: number;
  izbor: boolean = false;

  javnoPreduzeceSve: JavnoPreduzece[];
  javnoPreduzeceId: number;
  isJavnoPreduzeceLoaded: boolean = false;

  kategorijaVozilaSve: KategorijaVozila[];
  kategorijaVozilaId: number;
  isKategorijaVozilaLoaded: boolean = false;



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
      javnoPreduzece: {
        title: 'Javno preduzeće',
        type: 'string'
      },
      kategorijaVozila: {
        title: 'Kategorija',
        type: 'string'
      },
      godiste: {
        title: 'Godište',
        type: 'number'
      },
      marka: {
        title: 'Marka',
        type: 'string'
      },
      model: {
        title: 'Model',
        type: 'string'
      },
      kubikaza: {
        title: 'Kubikaža',
        type: 'number'
      },
      emisiona_klasa: {
        title: 'Emisiona klasa',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      javnoPreduzece: [''],
      kategorijaVozila: [''],
      godiste: [''],
      marka: [''],
      model: [''],
      kubikaza: [''],
      emisiona_klasa: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
    this.getDataJavnoPreduzece();
    this.getDataKategorijaVozila();
  }

  getData() {
    this.crudService.getData("vozilo/tab").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getDataJavnoPreduzece() {
    this.crudService.getData("javno_pred/sve").subscribe(
      data => {
        this.javnoPreduzeceSve = data;
        this.isJavnoPreduzeceLoaded = true;
      },
      error => {
        console.log(error);
        this.router.navigate(['/login']);
      }
    );
  }

  getDataKategorijaVozila() {
    this.crudService.getData("kat_vozila/sve").subscribe(
      data => {
        this.kategorijaVozilaSve = data;
        this.isKategorijaVozilaLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }



  onCreate(): void{
    this.vozilo = new Vozilo();
    this.javnoPreduzeceId = this.javnoPreduzeceSve[0].id;
    this.kategorijaVozilaId = this.kategorijaVozilaSve[0].id;
    this.izbor = true;
  }

  onEdit(event): void{
    this.vozilo = new Vozilo();

    this.crudService.getSingle("vozilo/jedan?id="+event.data.id).subscribe(
      data => {this.vozilo = data;
        console.log(data);

        if (!this.vozilo.javnoPreduzece){
          this.javnoPreduzeceId = null;
        } else {
          this.javnoPreduzeceId = this.vozilo.javnoPreduzece.id;
        }

        if (!this.vozilo.kategorijaVozila){
          this.kategorijaVozilaId = null;
        } else {
          this.kategorijaVozilaId = this.vozilo.kategorijaVozila.id;
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
    if (this.isJavnoPreduzeceLoaded) {
      if (this.javnoPreduzeceId.toString() == "0: null") {
        this.vozilo.javnoPreduzece = null;
      } else {
        for (let item of this.javnoPreduzeceSve) {
          if (item.id == this.javnoPreduzeceId) {
            this.vozilo.javnoPreduzece = item;
          }
        }
      }
    }

    if (this.isKategorijaVozilaLoaded) {
      if (this.kategorijaVozilaId.toString() == "0: null") {
        this.vozilo.kategorijaVozila = null;
      } else {
        for (let item of this.kategorijaVozilaSve) {
          if (item.id == this.kategorijaVozilaId) {
            this.vozilo.kategorijaVozila = item;
          }
        }
      }
    }

    this.crudService.sendData("vozilo", this.vozilo)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.vozilo = new Vozilo();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("vozilo", this.brisanjeId)
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
