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
        valuePrepareFunction: (value) => { return value.naziv },
        type: 'string'
      },
      jedMere: {
        title: 'Jedinica mere',
        valuePrepareFunction: (value) => { return value.naziv },
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
    this.crudService.getData("energent").subscribe(
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
          console.log("Selektovana uloga"+item.naziv);
          this.energent.energentTip = item;
          console.log("Upisan tip energenta"+this.energent.energentTip.naziv);
        }
      }
    }

  }

  public onJedinicaMereSelected(selectedId: number){
    console.log(selectedId);
    if(this.isJedinicaMereLoaded) {
      for (var item of this.jediniceMere) {
        if (item.id == selectedId) {
          console.log("Selektovana uloga"+item.naziv);
          this.energent.jedMere = item;
          console.log("Upisan tip energenta"+this.energent.jedMere.naziv);
        }
      }
    }

  }

  naliranje() {
    // this.energent.id = null;
    // this.jedinicaMereId = null;
    // this.energentTipId = null;
    // this.energent.naziv = null;
    // this.energent.version = null;
    //this.energent = null;
  }

  ngOnInit() {

  }

  onCreate(): void{
    this.energent = new Energent();
    this.energent.energentTip = this.tipoviEnergenta[0];
    this.energent.jedMere = this.jediniceMere[0];
    //this.energent = null;
    //this.isKreiranjeNovogEnergenta = true;
    this.izbor = true;
  }

  onEdit(event): void{
    this.energent = new Energent();
    this.energent = event.data;
    //this.energentTipId = this.energent.energentTip.id;
    //this.jedinicaMereId = this.energent.jedMere.id;
    this.izbor = true;
    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.energent = null;
    this.getData();
    //this.naliranje();
    this.izbor = false;
  }

  onSubmit(objekat) {


      // for(var item of this.tipoviEnergenta){
      //   if(item.id==this.energentTipId){
      //     this.energent.energentTip = item;
      //   }
      // }
      // for(var item of this.jediniceMere){
      //   if(item.id==this.jedinicaMereId){
      //     this.energent.jedMere = item;
      //   }
      // }

      // this.energent.emisija = 4;
      // this.energent.version = 0;
      // console.log(this.energent);


    this.crudService.sendData("energent", objekat)
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
