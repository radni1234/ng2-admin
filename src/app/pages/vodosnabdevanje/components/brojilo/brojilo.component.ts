import {Component, ViewEncapsulation, ViewChild, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";

import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";

import {CrudService} from "../../../services/crud.service";
import {BrojiloVrsta} from "../../../admin/components/brojilo_vrsta/brojilo_vrstadata";

import {RezimMerenja, BrojiloTip} from "../../../javniobjekti/components/racuni/racundata";
import {BrojiloVodozahvat} from "./brojilo.data";
import {Vodozahvat} from "../vodozahvat/vodozahvat.data";




@Component({
  selector: 'isem-brojilo-vodozahvat',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'brojilo.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class BrojiloKotlarnicaComponent {
  @ViewChild('childModalBrojilo') childModalBrojilo: ModalDirective;
  @Input() vodozahvat: Vodozahvat;

  sourceBrojila: LocalDataSource = new LocalDataSource();

  brojilo: BrojiloVodozahvat;

  brojiloVrstaSve: BrojiloVrsta[];
  brojiloVrstaId: number;
  isBrojiloVrstaLoaded: boolean = false;

  brojiloTipSve: BrojiloTip[];
  brojiloTipId: number;
  isBrojiloTipLoaded: boolean = false;

  rezimMerenjaSve: RezimMerenja[];
  rezimMerenjaId: number;
  isRezimMerenjaLoaded: boolean = false;

  brojiloVodeceSve: BrojiloVodozahvat[];
  brojiloVodeceId: number;
  isBrojiloVodeceLoaded: boolean = false;

  brisanjeBrojiloId: number;

  prikaziBrojiloUnos: boolean = false;

  proveraUloga: boolean = false;

  myFormBrojilo: FormGroup;

  settings_brojila = {
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
      sifra_brojila: {
        title: 'Naziv brojila',
        type: 'string'
      },
      opis: {
        title: 'Opis',
        type: 'string'
      },
      brojilo_vrsta: {
        title: 'Vrsta brojila',
        type: 'string'
      },
      brojilo_tip: {
        title: 'Tip brojila',
        type: 'string'
      },
      rezim_merenja: {
        title: 'Režim merenja',
        type: 'string'
      },
      vodece_brojilo: {
        title: 'Vodeće brojilo',
        type: 'string'
      },
      procenat: {
        title: 'Procenat',
        type: 'string'
      }

    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myFormBrojilo = this.fb.group({
      id: [''],
      naziv: [''],
      opis: [''],
      brojiloTip: [''],
      brojiloVrsta: [''],
      objekat: [''],
      rezimMerenja: [''],
      vodeceBrojilo: [''],
      procenat: [''],
      obracunskiPeriod: [''],
      automatski: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.proveraUloga = (JSON.parse(localStorage.getItem('currentUser')).uloga === 'Manager' || JSON.parse(localStorage.getItem('currentUser')).uloga === 'Admin');
    this.getDataBrojila();
  }

  getDataBrojila() {
    this.crudService.getData("brojilo_vodozahvat/tab?vodozahvat_id="+this.vodozahvat.id).subscribe(
      data => {
        this.sourceBrojila.load(data);
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getDataBrojiloVrsta() {
    this.crudService.getData("brojilo_vrsta/sve").subscribe(
      data => {
        this.brojiloVrstaSve = data;
        this.isBrojiloVrstaLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getDataBrojiloTip() {
    this.crudService.getData("brojilo_tip/sve").subscribe(
      data => {
        this.brojiloTipSve = data;
        this.isBrojiloTipLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onBrojiloTipSelected(brojiloTip) {
    if (brojiloTip != 3) {
      this.brojilo.procenat = null;
      this.brojilo.vodeceBrojilo = null;
      this.brojiloVodeceId = null;
    }
  }

  getDataRezimMerenja() {
    this.crudService.getData("rezim_merenja/sve").subscribe(
      data => {
        this.rezimMerenjaSve = data;
        this.isRezimMerenjaLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getDataBrojiloVodece(id: number) {
    this.crudService.getData("brojilo_vodozahvat/sve?vodozahvat_id="+id).subscribe(
      data => {
        this.brojiloVodeceSve = data;
        this.isBrojiloVodeceLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreateBrojilo() {
    this.crudService.getData("brojilo_vrsta/sve").subscribe(
      data => {
        this.brojiloVrstaSve = data;
        this.isBrojiloVrstaLoaded = true;
        this.brojiloVrstaId = this.brojiloVrstaSve[0].id;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );

    this.crudService.getData("brojilo_tip/sve").subscribe(
      data => {
        this.brojiloTipSve = data;
        this.isBrojiloTipLoaded = true;
        this.brojiloTipId = this.brojiloTipSve[0].id;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );

    this.getDataRezimMerenja();
    // this.getDataBrojiloVodece();

    this.brojilo = new BrojiloVodozahvat();
    this.brojilo.vodozahvat = this.vodozahvat;
    this.rezimMerenjaId = null;
    this.brojiloVodeceId = null;

    this.prikaziBrojiloUnos = true;

  }

  onEditBrojilo(event){
    this.brojilo = new BrojiloVodozahvat();

    this.getDataBrojiloVrsta();
    this.getDataBrojiloTip();
    this.getDataRezimMerenja();
    // this.getDataBrojiloVodece();

    this.crudService.getSingle("brojilo_vodozahvat/jedan?id="+event.data.id).subscribe(
      data => {this.brojilo = data;
        console.log(data);
        this.prikaziBrojiloUnos = true;

        if (!this.brojilo.brojiloTip){
          this.brojiloTipId = null;
        } else {
          this.brojiloTipId = this.brojilo.brojiloTip.id;
        }

        if (!this.brojilo.brojiloVrsta){
          this.brojiloVrstaId = null;
        } else {
          this.brojiloVrstaId = this.brojilo.brojiloVrsta.id;
        }

        if (!this.brojilo.rezimMerenja){
          this.rezimMerenjaId = null;
        } else {
          this.rezimMerenjaId = this.brojilo.rezimMerenja.id;
        }

        if (!this.brojilo.vodeceBrojilo){
          this.brojiloVodeceId = null;
        } else {
          this.getDataBrojiloVodece(this.brojilo.vodeceBrojilo.vodozahvat.id);
          this.brojiloVodeceId = this.brojilo.vodeceBrojilo.id;
        }
      },
      error => {console.log(error); });

    // this.source.setFilter([{ field: 'naziv', search: '' }]);
    // this.brisiFilterRacuni();
  }

  onSubmitBrojilo() {
    if (String(this.brojiloTipId) == "0: null") {
      this.brojilo.brojiloTip = null;
    } else {
      for (let item of this.brojiloTipSve) {
        if (item.id == this.brojiloTipId) {
          this.brojilo.brojiloTip = item;
        }
      }
    }

    if (String(this.brojiloVrstaId) == "0: null") {
      this.brojilo.brojiloVrsta = null;
    } else {
      for (let item of this.brojiloVrstaSve) {
        if (item.id == this.brojiloVrstaId) {
          this.brojilo.brojiloVrsta = item;
        }
      }
    }

    if (String(this.rezimMerenjaId) == "0: null") {
      this.brojilo.rezimMerenja = null;
    } else {
      for (let item of this.rezimMerenjaSve) {
        if (item.id == this.rezimMerenjaId) {
          this.brojilo.rezimMerenja = item;
        }
      }
    }
    //
    // if (String(this.brojiloVodeceId) == "0: null") {
    //   this.brojilo.vodeceBrojilo = null;
    // } else {
    //   for (let item of this.brojiloVodeceSve) {
    //     if (item.id == this.brojiloVodeceId) {
    //       this.brojilo.vodeceBrojilo = item;
    //     }
    //   }
    // }

    this.crudService.sendData("brojilo_vodozahvat", this.brojilo)
      .subscribe(
        data => {
          console.log(data);
          this.getDataBrojila();
        },
        error => console.log(error)
      );


    this.prikaziBrojiloUnos = false;

    this.brojilo = null;
  }

  onCancelBrojilo() {
    this.brojilo = null;
    this.prikaziBrojiloUnos = false;
  }

  onDeleteBrojilo(event){
    this.brisanjeBrojiloId = event.data.id;
    this.showChildModalBrojilo();
  }

  onDeleteConfirmBrojilo() {
    this.crudService.delete("brojilo_vodozahvat", this.brisanjeBrojiloId)
      .subscribe(
        data => {console.log(data); this.getDataBrojila();},
        error => {console.log(error); this.router.navigate(['/login']);}
      );

    this.hideChildModalBrojilo();
  }



  showChildModalBrojilo(): void {
    this.childModalBrojilo.show();
  }

  hideChildModalBrojilo(): void {
    this.childModalBrojilo.hide();
  }
}
