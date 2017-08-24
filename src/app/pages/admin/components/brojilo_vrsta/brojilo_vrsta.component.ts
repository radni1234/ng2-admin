import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {BrojiloVrsta, EnergentTip, JedMere, BrojiloVrstaKolone} from "./brojilo_vrstadata";
import {KolonaTip} from "../../../javniobjekti/components/racuni/racundata";
import {Router} from "@angular/router";

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
  jedMere: JedMere[];
  kolonaTip: KolonaTip[];

  jedinicaMereId: number;
  kolonaTipId: number;

  brisanjeId: number;
  brisanjeIdKolone: number;

  izbor1: boolean = true;
  izbor2: boolean = false;
  izbor3: boolean = false;

  source: LocalDataSource = new LocalDataSource();
  sourceKolone: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;
  myFormKolone: FormGroup;

  isVrstaBrojilaLoaded: boolean = false;
  isVrstaBrojilaKoloneLoaded: boolean = false;
  isTipEnergentaLoaded: boolean = false;
  isJedinicaMereLoaded: boolean = false;
  isKolonaTipLoaded: boolean = false;

  // ----------------------------------------------------------------------------------- //

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
      },
      obavezno: {
        title: 'Obavezno',
        type: 'string'
      },
      formula: {
        title: 'Formula',
        type: 'string'
      }
    }
  };

  // ----------------------------------------------------------------------------------- //


  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.getData();
    this.getTipoveEnergenta();
    this.getJedinicaMere();
    this.getKolonaTip();


    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      energentTip: [''],
      version: ['']
    });

    this.buildFormKolone();
  }

  buildFormKolone(): void {
    this.myFormKolone = this.fb.group({
      'naziv': ['', Validators.required],
      'opis': [''],
      'rbr': ['', Validators.required],
      'jedinica_mere': [''],
      'kolona_tip': ['', Validators.required],
      'obavezno': [''],
      'formula': ['']
    });

    this.myFormKolone.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }


  // ----------------------------------------------------------------------------------- //
  getData() {
    this.crudService.getData("brojilo_vrsta/sve").subscribe(
      data => {this.source.load(data);
        console.log(data);
        this.isVrstaBrojilaLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getDataKolone() {
    this.crudService.getData("bro_vrs_kol/tab?bro_vrs_id="+this.brojiloVrsta.id).subscribe(
      data => {this.sourceKolone.load(data);
        console.log(data);
        this.isVrstaBrojilaKoloneLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getTipoveEnergenta() {
    this.crudService.getData("energent_tip/sve").subscribe(
      data => {
        this.tipoviEnergenta = data;
        console.log(data);
        this.isTipEnergentaLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
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
    this.crudService.getData("jedmere/sve").subscribe(
      data => {
        this.jedMere = data;
        console.log(data);

        this.isJedinicaMereLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getKolonaTip() {
    this.crudService.getData("kolona_tip/sve").subscribe(
      data => {
        this.kolonaTip = data;
        console.log("kolona tip");
        console.log(data);
        this.isKolonaTipLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getBrojiloVrstaKolone(id: number) {
    this.crudService.getSingle("bro_vrs_kol/jedan?id=" + id).subscribe(
      data => {
        console.log('getBrojiloVrstaKolone');
        this.brojiloVrstaKolone = data;
        console.log(data);
        // this.isJednaKolonaLoaded = true;

        if (!this.brojiloVrstaKolone.jedMere){
          this.jedinicaMereId = null;
          //this.brojiloVrstaKolone.jedMere = null;
        } else {
          this.jedinicaMereId = this.brojiloVrstaKolone.jedMere.id;
        }

        if (!this.brojiloVrstaKolone.kolonaTip){
          this.kolonaTipId = -1;
          //this.brojiloVrstaKolone.kolonaTip = null;
        } else {
          this.kolonaTipId = this.brojiloVrstaKolone.kolonaTip.id;
        }

        console.log(this.jedinicaMereId);
        console.log(this.kolonaTipId);
        this.buildFormKolone();

        this.myFormKolone.setValue({
          'naziv': this.brojiloVrstaKolone.naziv,
          'opis': this.brojiloVrstaKolone.opis,
          'rbr': this.brojiloVrstaKolone.rbr,
          'jedinica_mere': this.jedinicaMereId,
          'kolona_tip': this.kolonaTipId,
          'obavezno': this.brojiloVrstaKolone.obavezno,
          'formula': this.brojiloVrstaKolone.formula
        });
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  // ----------------------------------------------------------------------------------- //
  onCreate(): void{
    this.brojiloVrsta = new BrojiloVrsta();
    this.brojiloVrsta.energentTip = this.tipoviEnergenta[0];
    this.sourceKolone = null;

    this.izbor1 = false;
    this.izbor2 = true;
    this.izbor3 = false;
  }

  onCreateKolone(): void{
    this.brojiloVrstaKolone = new BrojiloVrstaKolone();
    this.brojiloVrstaKolone.brojiloVrsta = this.brojiloVrsta;
    // this.brojiloVrstaKolone.jedMere = this.jedMere[0];
    // this.brojiloVrstaKolone.kolonaTip = this.kolonaTip[0];

    this.buildFormKolone();

    this.izbor1 = false;
    this.izbor2 = false;
    this.izbor3 = true;
  }

  // ----------------------------------------------------------------------------------- //
  onEdit(event): void{
    this.brojiloVrsta = new BrojiloVrsta();
    this.brojiloVrsta = event.data;
    this.getDataKolone();

    console.log('brojiloVrsta');
    console.log(this.brojiloVrsta);

    this.izbor1 = false;
    this.izbor2 = true;
    this.izbor3 = false;

    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }


  onEditKolone(event): void{
    //this.buildFormKolone();
    this.jedinicaMereId = null;
    this.kolonaTipId = null;
    this.brojiloVrstaKolone = new BrojiloVrstaKolone();


  //  this.brojiloVrstaKolone.jedMere = new JedMere();
  // this.brojiloVrstaKolone.kolonaTip = new KolonaTip();
    this.getBrojiloVrstaKolone(event.data.id);
    console.log(event);
    console.log('brojiloVrstaKolone');
    console.log(this.brojiloVrstaKolone);

    this.izbor1 = false;
    this.izbor2 = false;
    this.izbor3 = true;

    this.source.setFilter([{ field: 'naziv', search: '' }]);

    console.log('brojiloVrstaKolone - kraj');
  }

  // ----------------------------------------------------------------------------------- //
  onCancel() {
    this.brojiloVrsta = null;
    //this.getData();

    this.izbor1 = true;
    this.izbor2 = false;
    this.izbor3 = false;
  }

  onCancelKolone() {
    //this.brojiloVrstaKolone = null;
    //this.getData();

    this.izbor1 = false;
    this.izbor2 = true;
    this.izbor3 = false;
  }

  // ----------------------------------------------------------------------------------- //
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

    console.log('pre snimanja kolone');
    // console.log(this.myFormKolone.value);

    const formModel = this.myFormKolone.value;

    this.onSubmitValidation(formModel);

    if (this.myFormKolone.valid) {
      console.log(formModel);

      if (this.isJedinicaMereLoaded) {
        if (formModel.jedinica_mere == "0: null") {
          this.brojiloVrstaKolone.jedMere = null;
        } else {
          for (var item of this.jedMere) {
            if (item.id == formModel.jedinica_mere) {
              this.brojiloVrstaKolone.jedMere = item;
            }
          }
        }
      }

      if (this.isKolonaTipLoaded) {
        if (formModel.kolona_tip == "0: null") {
          this.brojiloVrstaKolone.kolonaTip = null;
        } else {
          for (var item of this.kolonaTip) {
            if (item.id == formModel.kolona_tip) {
              this.brojiloVrstaKolone.kolonaTip = item;
            }
          }
        }
      }

      const saveBrojiloVrstaKolone: BrojiloVrstaKolone = {
        id: this.brojiloVrstaKolone.id,
        naziv: formModel.naziv,
        opis: formModel.opis,
        brojiloVrsta: this.brojiloVrstaKolone.brojiloVrsta,
        rbr: formModel.rbr,
        jedMere: this.brojiloVrstaKolone.jedMere,
        kolonaTip: this.brojiloVrstaKolone.kolonaTip,
        obavezno: formModel.obavezno,
        formula: formModel.formula,
        version: this.brojiloVrstaKolone.version
      };

      console.log(saveBrojiloVrstaKolone);

      this.crudService.sendData("bro_vrs_kol", saveBrojiloVrstaKolone)
        .subscribe(
          data => {
            console.log(data);
            this.getDataKolone();
          },
          error => console.log(error)
        );

      this.izbor1 = false;
      this.izbor2 = true;
      this.izbor3 = false;

      //this.brojiloVrstaKolone = null;
    }
  }

  // ----------------------------------------------------------------------------------- //
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
        data => {console.log(data); this.getDataKolone();},
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

  // ----------------------------------------------------------------------------------- //

  onValueChanged(data?: any) {
    if (!this.myFormKolone) { return; }
    const form = this.myFormKolone;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  };
  isDisabled: boolean = true;
  onChangeObavezno(event :any){
    console.log(event);
  };

  onSubmitValidation(data?: any) {
    if (!this.myFormKolone) { return; }
    const form = this.myFormKolone;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      // if (control && control.dirty && !control.valid) {
      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  };

  formErrors = {
    'naziv': '',
    'rbr': '',
    'kolona_tip': ''
  };

  validationMessages = {
    'naziv': {
      'required': 'Polje naziv je obavezno.'
    },
    'rbr': {
      'required': 'Polje redni broj je obavezno.'
    },
    'kolona_tip': {
      'required': 'Polje tip kolone je obavezno.'
    }
  };
}

// ----------------------------------------------------------------------------------- //

