import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {BrojiloVrsta, EnergentTip} from "./brojilo_vrstadata";
import {BrojiloVrstaKolone, KolonaTip} from "../../../javniobjekti/components/racuni/racundata";
import {JedinicaMere} from "../energent/energentdata";

@Component({
  selector: 'isem-vrstabrojila',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'brojilo_vrsta.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class BrojiloVrstaComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('childModalKolone') childModalKolone: ModalDirective;

  brojiloVrsta: BrojiloVrsta = new BrojiloVrsta();
  brojiloVrstaKolone: BrojiloVrstaKolone = new BrojiloVrstaKolone();

  tipoviEnergenta: EnergentTip[];
  jedinicaMere: JedinicaMere[];
  kolonaTip: KolonaTip[];

  brisanjeId: number;
  brisanjeIdKolone: number;

  izbor1: boolean = true;
  izbor2: boolean = false;
  izbor3: boolean = false;

  source: LocalDataSource = new LocalDataSource();
  sourceKolone: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;
  myFormKolone: FormGroup;

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
        valuePrepareFunction: (value) => {
          return value.naziv
        },
        type: 'string'
      }
    }
  };


  settingsKolone = {
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
      rbr: {
        title: 'Rbr',
        type: 'string'
      },
      jedinicaMere: {
        title: 'Jedinica mere',
        type: 'string'
      },
      kolonaTip: {
        title: 'Tip kolone',
        type: 'string'
      }
    }
  };


  isVrstaBrojilaLoaded: boolean = false;
  isVrstaBrojilaKoloneLoaded: boolean = false;
  isTipEnergentaLoaded: boolean = false;
  isJedinicaMereLoaded: boolean = false;
  isKolonaTipLoaded: boolean = false;


  energentTipId: number;
  isKreiranjeNovogEnergenta: boolean = true;

  constructor(private crudService: CrudService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      energentTip: [''],
      version: ['']
    });

    this.myFormKolone = this.fb.group({
      id: [''],
      naziv: [''],
      opis: [''],
      rbr: [''],
      jedinica_mere: [''],
      kolona_tip: [''],
      version: ['']
    });

    // this.getData();
    // this.getDataKolone();
    // this.getTipoveEnergenta();

  }

  ngOnInit() {
    this.getData();
    this.getDataKolone();
    this.getTipoveEnergenta();
    this.getJedinicaMere();
    this.getKolonaTip();
  }

  getData() {
    this.crudService.getData("brojilo_vrsta").subscribe(
      data => {this.source.load(data);
        console.log(data);
        this.isVrstaBrojilaLoaded = true;
      },
      error => console.log(error)
    );
  }

  getDataKolone() {
    this.crudService.getDataTab("bro_vrs_kol").subscribe(
      data => {this.sourceKolone.load(data);
        console.log(data);
        this.isVrstaBrojilaKoloneLoaded = true;
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

  public onEnergentTipSelected(selectedId: number){
    console.log(selectedId);
    if(this.isTipEnergentaLoaded) {
      for (var item of this.tipoviEnergenta) {
        if (item.id == selectedId) {
          console.log("Selektovana uloga"+item.naziv);
          this.brojiloVrsta.energentTip = item;
          console.log("Upisan tip energenta"+this.brojiloVrsta.energentTip.naziv);
        }
      }
    }

  }

  getJedinicaMere() {
    this.crudService.getData("jedmere").subscribe(
      data => {
        this.jedinicaMere = data;
        console.log(data);
        this.isJedinicaMereLoaded = true;
      },
      error => console.log(error)
    );
  }

  public onJedinicaMereSelected(selectedId: number){
    console.log(selectedId);
    if(this.isJedinicaMereLoaded) {
      for (var item of this.jedinicaMere) {
        if (item.id == selectedId) {
          console.log("Selektovana jed mere"+item.naziv);
          this.brojiloVrstaKolone.jedinicaMere = item;
        }
      }
    }

  }

  getKolonaTip() {
    this.crudService.getData("kolona_tip").subscribe(
      data => {
        this.kolonaTip = data;
        console.log(data);
        this.isKolonaTipLoaded = true;
      },
      error => console.log(error)
    );
  }

  public onKolonaTipSelected(selectedId: number){
    console.log(selectedId);
    if(this.isKolonaTipLoaded) {
      for (var item of this.kolonaTip) {
        if (item.id == selectedId) {
          this.brojiloVrstaKolone.kolonaTip = item;
        }
      }
    }

  }


  onCreate(): void{
    this.brojiloVrsta = new BrojiloVrsta();
    this.brojiloVrsta.energentTip = this.tipoviEnergenta[0];

    this.izbor1 = false;
    this.izbor2 = true;
    this.izbor3 = false;
  }

  onCreateKolone(): void{
    this.brojiloVrstaKolone = new BrojiloVrstaKolone();
    this.brojiloVrstaKolone.brojiloVrsta = this.brojiloVrsta;
    this.brojiloVrstaKolone.jedinicaMere = this.jedinicaMere[0];
    this.brojiloVrstaKolone.kolonaTip = this.kolonaTip[0];

    this.izbor1 = false;
    this.izbor2 = false;
    this.izbor3 = true;
  }

  onEdit(event): void{
    this.brojiloVrsta = new BrojiloVrsta();
    this.brojiloVrsta = event.data;

    console.log('brojiloVrsta');
    console.log(this.brojiloVrsta);

    this.izbor1 = false;
    this.izbor2 = true;
    this.izbor3 = false;

    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }


  onEditKolone(event): void{
    this.brojiloVrstaKolone = new BrojiloVrstaKolone();
    this.brojiloVrstaKolone = event.data;

    console.log('brojiloVrstaKolone');
    console.log(this.brojiloVrstaKolone);

    this.izbor1 = false;
    this.izbor2 = false;
    this.izbor3 = true;

    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.brojiloVrsta = null;
    //this.getData();

    this.izbor1 = true;
    this.izbor2 = false;
    this.izbor3 = false;
  }

  onCancelKolone() {
    this.brojiloVrstaKolone = null;
    //this.getData();

    this.izbor1 = false;
    this.izbor2 = true;
    this.izbor3 = false;
  }

  onSubmit() {
   this.crudService.sendData("brojilo_vrsta", this.brojiloVrsta)
      .subscribe(
        data => {
          console.log(data);
          this.getData();
        },
        error => console.log(error)
      );

    this.izbor1 = true;
    this.izbor2 = false;
    this.izbor3 = false;

    this.brojiloVrsta = null;
  }


  onSubmitKolone() {
    this.crudService.sendData("bro_vrs_kol", this.brojiloVrstaKolone)
      .subscribe(
        data => {
          console.log(data);
          this.getData();
        },
        error => console.log(error)
      );

    this.izbor1 = false;
    this.izbor2 = true;
    this.izbor3 = false;

    this.brojiloVrstaKolone = null;
  }

  onDelete(event){
  this.brisanjeId = event.data.id
  this.showChildModal();
}

  onDeleteKolone(event){
    this.brisanjeIdKolone = event.data.id
    this.showChildModalKolone();
  }

  onDeleteConfirm() {
    this.crudService.delete("brojilo_vrsta", this.brisanjeId)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.hideChildModal();
  }

  onDeleteConfirmKolone() {
    this.crudService.delete("bro_vrs_kol", this.brisanjeIdKolone)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.hideChildModalKolone();
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  showChildModalKolone(): void {
    this.childModalKolone.show();
  }

  hideChildModalKolone(): void {
    this.childModalKolone.hide();
  }

}
