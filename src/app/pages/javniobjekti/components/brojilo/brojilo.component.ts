import {Component, ViewEncapsulation, ViewChild, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";

import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";

import {CrudService} from "../../../services/crud.service";
import {BrojiloVrsta} from "../../../admin/components/brojilo_vrsta/brojilo_vrstadata";
import {BrojiloTip, RezimMerenja, Brojilo} from "../racuni/racundata";
import {Objekat} from "../objekti/objekatdata";


@Component({
  selector: 'isem-brojilo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'brojilo.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class BrojiloComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() objekat: Objekat;

  sourceBrojila: LocalDataSource = new LocalDataSource();

  brojilo: Brojilo;

  brojiloVrstaSve: BrojiloVrsta[];
  brojiloVrstaId: number;
  isBrojiloVrstaLoaded: boolean = false;
  brojiloVrstaIzbor: BrojiloVrsta;

  brojiloTipSve: BrojiloTip[];
  brojiloTipId: number;
  isBrojiloTipLoaded: boolean = false;

  rezimMerenjaSve: RezimMerenja[];
  rezimMerenjaId: number;
  isRezimMerenjaLoaded: boolean = false;

  brojiloVodeceSve: Brojilo[];
  brojiloVodeceNaziv: string;
  brojiloVodeceObjekatNaziv: string;
  brojiloVodeceId: number;
  isBrojiloVodeceLoaded: boolean = false;

  brisanjeBrojiloId: number;

  prikaziBrojiloUnos: boolean = false;

  proveraUloga: boolean = false;

  myFormBrojilo: FormGroup;

  // objIzbor: number[] = []; // Default selection

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

  // 1.	Izbor taba brojila

  ngOnInit() {
    this.proveraUloga = (JSON.parse(localStorage.getItem('currentUser')).uloga === 'Manager' || JSON.parse(localStorage.getItem('currentUser')).uloga === 'Admin');
    this.getDataBrojila();
  }

  getDataBrojila() {
    this.crudService.getData("brojilo/tab?obj_id="+this.objekat.id).subscribe(
      data => {
        this.sourceBrojila.load(data);
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////


  // 2.	Kreiranje novog brojila

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

    this.crudService.getData("rezim_merenja/sve").subscribe(
      data => {
        this.rezimMerenjaSve = data;
        this.isRezimMerenjaLoaded = true;
        this.rezimMerenjaId = this.rezimMerenjaSve[2].id;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );

    this.brojilo = new Brojilo();
    this.brojilo.objekat = this.objekat;

    this.brojiloVodeceId = null;
    this.brojiloVodeceNaziv = null;
    this.brojiloVodeceObjekatNaziv = null;

    this.prikaziBrojiloUnos = true;

  }
  /////////////////////////////////////////////////////////////////////////////////////////////////


  // 3.	Izmena postojeceg brojila
  onEditBrojilo(event){
    this.brojilo = new Brojilo();

    this.crudService.getData("rezim_merenja/sve").subscribe(
      data => {
        this.rezimMerenjaSve = data;
        this.isRezimMerenjaLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );

    this.crudService.getData("brojilo_vrsta/sve").subscribe(
      data => {
        this.brojiloVrstaSve = data;
        this.isBrojiloVrstaLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );

    this.crudService.getData("brojilo_tip/sve").subscribe(
      data => {
        this.brojiloTipSve = data;
        this.isBrojiloTipLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );

    this.crudService.getSingle("brojilo/jedan?id="+event.data.id).subscribe(
      data => {this.brojilo = data;
        console.log(data);


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
          this.brojiloVodeceNaziv = null;
          this.brojiloVodeceObjekatNaziv = null;
        } else {
          this.brojiloVodeceNaziv = this.brojilo.vodeceBrojilo.naziv;
          this.brojiloVodeceObjekatNaziv = this.brojilo.vodeceBrojilo.objekat.naziv;
          this.brojiloVodeceId = this.brojilo.vodeceBrojilo.id;

          this.crudService.getData("brojilo/sve?obj_id="+this.brojilo.objekat.id+"&ene_tip_id="+this.brojilo.brojiloVrsta.energentTip.id).subscribe(
            data => {
              this.brojiloVodeceSve = data;
              this.isBrojiloVodeceLoaded = true;
            },
            error => {console.log(error); this.router.navigate(['/login']);}
          );
        }

        if (this.brojilo.brojiloTip.id==3) {
          this.myFormBrojilo.get('brojiloVrsta').disable();
        }
        else {
          this.myFormBrojilo.get('brojiloVrsta').enable();
        }

        this.prikaziBrojiloUnos = true;

      },
      error => {console.log(error); });

    this.sourceBrojila.setFilter([{ field: 'sifra_brojila', search: '' }]);

  }
  /////////////////////////////////////////////////////////////////////////////////////////////////


  // 4.	Snimanje novog/izmenjenog brojila
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

    if (this.brojiloTipId == 3) {
      if (String(this.brojiloVodeceId) == "0: null") {
        this.brojilo.vodeceBrojilo = null;
      } else {
        for (let item of this.brojiloVodeceSve) {
          if (item.id == this.brojiloVodeceId) {
            this.brojilo.vodeceBrojilo = item;
          }
        }
      }
    }

    this.crudService.sendData("brojilo", this.brojilo)
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
  /////////////////////////////////////////////////////////////////////////////////////////////////


  // 5.	Dugme odustani
  onCancelBrojilo() {
    this.brojilo = null;
    this.prikaziBrojiloUnos = false;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////


  // 6.	Brisanje postojeceg brojila

  onDeleteBrojilo(event){
    this.brisanjeBrojiloId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirmBrojilo() {
    this.crudService.delete("brojilo", this.brisanjeBrojiloId)
      .subscribe(
        data => {console.log(data); this.getDataBrojila();},
        error => {console.log(error); this.router.navigate(['/login']);}
      );

    this.hideChildModal();
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////


  // 7.	Kreiranje novog virtuelnog brojila

  getDataBrojiloVodece(obj_id: number) {

    if (String(this.brojiloVrstaId) == "0: null") {
      this.brojiloVrstaIzbor = null;
    } else {
      for (let item of this.brojiloVrstaSve) {
        if (item.id == this.brojiloVrstaId) {
          this.brojiloVrstaIzbor = item;
        }
      }
    }

    this.crudService.getData("brojilo/sve?obj_id="+obj_id+"&ene_tip_id="+this.brojiloVrstaIzbor.energentTip.id).subscribe(
      data => {
        this.brojiloVodeceSve = data;
        this.isBrojiloVodeceLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onVodeceBrojiloSelected(event) {
    if (String(this.brojiloVodeceId) == "0: null") {
      this.brojiloVodeceNaziv = null;
      this.brojiloVodeceObjekatNaziv = null;
    } else {
      for (let item of this.brojiloVodeceSve) {
        if (item.id == this.brojiloVodeceId) {
          this.brojiloVodeceNaziv = item.naziv;
          this.brojiloVodeceObjekatNaziv = item.objekat.naziv;
        }
      }
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////


  // 8.	Izmena postojeceg virtuelnog brojila

  onBrojiloTipSelected(brojiloTip) {
    if (brojiloTip != 3) {
      this.brojilo.procenat = null;
      this.brojilo.vodeceBrojilo = null;
      this.brojiloVodeceId = null;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////


}
