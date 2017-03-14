import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {Energent, EnergentTip, JedinicaMere} from "./energentdata";

@Component({
  selector: 'isem-tipstuba',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'energent.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class EnergentComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  energent: Energent = new Energent();
  isEnergentLoaded: boolean = true;
  tipoviEnergenta: EnergentTip[];
  isTipEnergentaLoaded: boolean = false;
  isSingleEnergentLoaded: boolean = false;
  energentTipId: number;
  isKreiranjeNovogEnergenta: boolean = true;

  jediniceMere: JedinicaMere[];
  isJedinicaMereLoaded: boolean = false;
  jedinicaMereId: number;

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
      energentTip: {
        title: 'Tip energenta',
//        valuePrepareFunction: (value) => { return value.naziv },
        type: 'string'
      },
      jedMere: {
        title: 'Jedinica mere',
//        valuePrepareFunction: (value) => { return value.naziv },
        type: 'string'
      },
      kwhJm: {
        title: 'kwh/jm',
        type: 'string'
      },
      emisija: {
        title: 'Emisija',
        type: 'string'
      },
      sifra: {
        title: 'Sifra',
        type: 'string'
      },
      racun: {
        title: 'Racun',
        type: 'string'
      }

    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      energentTip: [''],
      jedMere: [''],
      kwhJm: [''],
      emisija: [''],
      sifra: [''],
      racun: [''],
      version: ['']
    });

    this.getData();
    this.getTipoveEnergenta();
    this.getJedinicaMere();
  }

  getData() {
    this.crudService.getDataTab("energent").subscribe(
      data => {this.source.load(data);
        console.log(data);
        this.isEnergentLoaded = true;
      },
      error => console.log(error)
    );
  }

  getTipoveEnergenta() {
    this.crudService.getData("energent_tip").subscribe(
      data => {
        this.tipoviEnergenta = data;
        console.log(data);
        this.isTipEnergentaLoaded = true;
      },
      error => console.log(error)
    );
  }

  getJedinicaMere() {
    this.crudService.getData("jedmere").subscribe(
      data => {
        this.jediniceMere = data;
        console.log(data);
        this.isJedinicaMereLoaded = true;
      },
      error => console.log(error)
    );
  }

  public onEnergentTipSelected(selectedId: number){
    console.log(selectedId);
    if(this.isTipEnergentaLoaded) {
      for (var item of this.tipoviEnergenta) {
        if (item.id == selectedId) {
          console.log("Selektovan tip ene "+item.naziv);
          this.energent.energentTip = item;
          console.log("Upisan tip energenta "+this.energent.energentTip.naziv);
        }
      }
    }

  }

  public onJedinicaMereSelected(selectedId: number){
    console.log(selectedId);
    if(this.isJedinicaMereLoaded) {
      for (var item of this.jediniceMere) {
        if (item.id == selectedId) {
          console.log("Selektovana jed mere "+item.naziv);
          this.energent.jedMere = item;
          console.log("Upisana jed mere "+this.energent.jedMere.naziv);
        }
      }
    }

  }

  naliranje() {
    // this.dobavljac.id = null;
    // this.jedinicaMereId = null;
    // this.energentTipId = null;
    // this.dobavljac.naziv = null;
    // this.dobavljac.version = null;
    //this.dobavljac = null;
  }

  ngOnInit() {

  }

  onCreate(): void{
    this.energent = new Energent();
    this.energent.energentTip = this.tipoviEnergenta[0];
    this.energent.jedMere = this.jediniceMere[0];
    //this.dobavljac = null;
    //this.isKreiranjeNovogEnergenta = true;
    this.izbor = true;
  }

  onEdit(event): void{
    this.energent = new Energent();

    this.crudService.getSingle("energent",event.data.id).subscribe(
      data => {
        this.energent = data;
        console.log(data);
        this.isSingleEnergentLoaded = true;
        this.izbor = true;
        this.source.setFilter([{ field: 'naziv', search: '' }]);
      },
      error => console.log(error)
    );

    // this.energent = event.data;
    //this.energentTipId = this.dobavljac.energentTip.id;
    //this.jedinicaMereId = this.dobavljac.jedMere.id;

  }

  onCancel() {
    this.energent = null;
    this.getData();
    //this.naliranje();
    this.izbor = false;
  }

  onSubmit() {


      // for(var item of this.opstine){
      //   if(item.id==this.energentTipId){
      //     this.dobavljac.energentTip = item;
      //   }
      // }
      // for(var item of this.mesta){
      //   if(item.id==this.jedinicaMereId){
      //     this.dobavljac.jedMere = item;
      //   }
      // }

      // this.dobavljac.emisija = 4;
      // this.dobavljac.version = 0;
      // console.log(this.dobavljac);
      console.log();

    this.crudService.sendData("energent", this.energent)
      .subscribe(
        data => {
          console.log(data);
          this.getData();
        },
        error => console.log(error)
      );

    this.izbor = false;
    this.energent = null;
  }

  onDelete(event){
    this.brisanjeId = event.data.id
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("energent", this.brisanjeId)
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
