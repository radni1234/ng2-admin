import {Component, OnInit, Input, ViewChild} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {CrudService} from '../../../../services/crud.service';
import {Brojilo, RnStavke, Racun, MesecLista, RnTip} from "../../racuni/racundata";
import {BrojiloVrstaKolone} from "../../../../admin/components/brojilo_vrsta/brojilo_vrstadata";
import {ModalDirective} from "ng2-bootstrap";
import {DatePipe} from "@angular/common";
import {FormArray, FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {Energent} from "../../../../admin/components/energent/energentdata";
import {Router} from "@angular/router";
import {DatumService} from "../../../../services/datum.service";
import {Dobavljac} from "../../../../admin/components/dobavljac/dobavljacdata";

@Component({
  selector: 'isem-pregled-racuna',
  templateUrl: 'pregled_racuna.component.html',
  styleUrls: ['../../../styles/table.component.scss']
})
export class PregledRacunaComponent implements OnInit {

  @Input() objekatId: number;

  @ViewChild('childModalRn') childModalRn: ModalDirective;

  datePipe = new DatePipe();

  formulaFunc: Function[] = [];

  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

  brojiloVrstaKolone : BrojiloVrstaKolone[];
  brojila: Brojilo[];
  brojilo: Brojilo;

  dobavljaci: Dobavljac[];
  dobavljac: Dobavljac;

  rnTipovi: RnTip[];

  formula;
  pdv = ['10','20'];


  brisanjeRnId: number;

  isBrojilaLoaded: boolean = false;
  prikaziObaveznaPolja: boolean = false;

  proveraRn: any = 0;

  source: LocalDataSource = new LocalDataSource();
  settings = {};
  mySettings = {
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
      godina: {
        title: 'Godina',
        type: 'string'
      },
      mesec: {
        title: 'Mesec',
        type: 'string'
      },
      brojRn: {
        title: 'Broj računa',
        type: 'string'
      },
      uneo: {
        title: 'Uneo',
        type: 'string'
      },
      datumu: {
        title: 'Datum unosa',
        type: 'string'
      }
    }
  };

  mySettingsOsnova = {
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
      godina: {
        title: 'Godina',
        type: 'string'
      },
      mesec: {
        title: 'Mesec',
        type: 'string'
      },
      brojRn: {
        title: 'Broj računa',
        type: 'string',
        width: '20px'
      },
      uneo: {
        title: 'Uneo',
        type: 'string'
      },
      datumu: {
        title: 'Datum unosa',
        type: 'string'
      }
    }
  };
  constructor(private crudService: CrudService, private router: Router, private ds: DatumService, private fb: FormBuilder){

    this.settings = Object.assign({}, this.mySettings);

    this.myFormRn1 = this.fb.group({
      id: [''],
      objekat: [''],
      brojilo: [''],
      version: [''],
      energent: [''],
      godina: [''],
      mesec: [''],
      dobavljac: [''],
      rnTip: [''],
      brojRn: [''],
      datumr: [''],
      napomena: [''],
    });

    this.myFormRn2 = this.fb.group({
      polja: fb.array([
      ])
    });
  }

  ngOnInit() {
    this.getBrojila(this.objekatId);
  }



  formule(){
    // if(this.formulaFunc) {
    //   for (var i = 0; i < this.formulaFunc.length; i++) {
    //     console.log(this.formulaFunc[i]);
    //     this.formulaFunc[i]();
    //
    //     console.log(this.myFormRn2);
    //   }
    // }

    this.brojiloVrstaKolone.forEach(element => {
      if(element.formula && element.formula.length > 0){
        this.formula = JSON.parse(element.formula) ;

        if(this.formula.t == '1'){
          console.log('polja');
          console.log(this.myFormRn2.get('controls.polja'));
          this.myFormRn2.controls.polja.controls[this.formula.r].setValue (this.myFormRn2.controls.polja.controls[this.formula.p1].value
                                                                          * this.myFormRn2.controls.polja.controls[this.formula.p2].value
                                                                          * (1 + this.myFormRn2.controls.polja.controls[this.formula.p3].value / 100));
        }
      }
    })
  }

  getDataRacuni(brojiloId: number) {
    this.crudService.getData("rn_prikaz?bro_id="+brojiloId).subscribe(
      data => {this.source.load(data);
        console.log(data);
      },
      error => {console.log(error);
        // this.router.navigate(['/login']);
      }
    );
  }

  getBrojila(objId: number) {
    this.crudService.getData("brojilo/sve?obj_id="+objId).subscribe(
      data => {
        this.brojila = data;
        this.isBrojilaLoaded = true;

        console.log(data);
        this.brojilo = this.brojila[0];
        this.dobavljaci = this.brojilo.dobavljaci;
        this.rnTipovi = this.brojilo.brojiloVrsta.rnTip;
        this.getDataRacuni(this.brojilo.id);
        this.getBrojiloVrstaKolone(this.brojilo.id);
        this.getEnergente(this.brojilo.brojiloVrsta.energentTip.id);
      },
      error => {console.log(error);}
    );
  }

  public onBrojiloSelected(selectedId: number){
    if(this.isBrojilaLoaded) {
      for (var item of this.brojila) {
        if (item.id == selectedId) {
          this.brojilo = item;
          this.dobavljaci = this.brojilo.dobavljaci;
          this.rnTipovi = this.brojilo.brojiloVrsta.rnTip;
        }
      }
    }

    this.getDataRacuni(this.brojilo.id);
    this.getBrojiloVrstaKolone(this.brojilo.id);
    this.getEnergente(this.brojilo.brojiloVrsta.energentTip.id);
    this.brisiFilterRacuni();
  }

  getBrojiloVrstaKolone(brojiloId: number) {
    this.crudService.getData("bro_vrs_kol/sve?bro_id="+brojiloId).subscribe(
      data => {this.brojiloVrstaKolone = data; console.log(data);

        this.mySettings = JSON.parse(JSON.stringify(this.mySettingsOsnova));

        this.formulaFunc = [];
        let deo1 = /\[/gi;
        let deo2 = /\]/gi;

        this.brojiloVrstaKolone.forEach(element => {
          this.mySettings.columns["k" + element.rbr] = { title: element.opis, type: 'string'};

          if (element.formula != null) {
            let rb = element.rbr - 1;

            // console.log("document.getElementById("
            //   + rb
            //   + ").value = Math.round(("
            //   + element.formula.replace(deo1, "Number(document.getElementById(").replace(deo2, ").value)")
            //   + ") * 100) / 100;");

            // this.formulaFunc.push(
            //   new Function( "document.getElementById("
            //     + rb
            //     + ").value = Math.round(("
            //     + element.formula.replace(deo1, "Number(document.getElementById(").replace(deo2, ").value)")
            //     + ") * 100) / 100;"
            //   )
            // );
          }

        });

        this.settings = Object.assign({}, this.mySettings);

      },
      error => {console.log(error);
        // this.router.navigate(['/login']);
      }
    );
  }

  onEditRacuni(event){
    this.formirajRn(event.data.id);
    this.brisiFilterRacuni();
  }

  brisiFilterRacuni(){
    this.source.setFilter([{ field: 'brojilo', search: '' }]);
    this.source.setFilter([{ field: 'godina', search: '' }]);
    this.source.setFilter([{ field: 'mesec', search: '' }]);
    this.source.setFilter([{ field: 'brojRn', search: '' }]);
    // this.source.setFilter([{ field: 'datumr', search: '' }]);
    this.source.setFilter([{ field: 'uneo', search: '' }]);
    this.source.setFilter([{ field: 'datumu', search: '' }]);
  }

  onDeleteRacuni(event){
    this.brisanjeRnId = event.data.id;
    this.showChildModalRn();
    // this.crudService.delete("rn", this.brisanjeRnId)
    //   .subscribe(
    //     data => {console.log(data); this.getDataRacuni(this.brojilo.id);},
    //     error => {console.log(error);}
    //   );
  }

  onDeleteConfirmRacuni() {
    this.crudService.delete("rn", this.brisanjeRnId)
      .subscribe(
        data => {console.log(data); this.getDataRacuni(this.brojilo.id);},
        error => {console.log(error);}
      );

    this.brisiFilterRacuni();
    this.hideChildModalRn();
  }

  showChildModalRn(): void {
    this.childModalRn.show();
  }

  hideChildModalRn(): void {
    this.childModalRn.hide();
  }

  // --------------------- R A C U N ---------------------------- //

  myFormRn1: FormGroup;
  myFormRn2: FormGroup;

  prikaziRn: boolean = false;
  prikaziBrojilo: boolean = true;
  noviRn: boolean = false;
  popunjenaPolja: boolean = false;

  rn: Racun = new Racun();
  rnStavke: Array<RnStavke> = new Array<RnStavke>();

  godine: number [] = new Array <number>();
  godina: number;
  brojGodinaUMeniju: number = 10;

  mesec: MesecLista = new MesecLista();
  meseci: Array<any> = [ {"id":0, "naz":"Januar"},
    {"id":1, "naz":"Februar"},
    {"id":2, "naz":"Mart"},
    {"id":3, "naz":"April"},
    {"id":4, "naz":"Maj"},
    {"id":5, "naz":"Jun"},
    {"id":6, "naz":"Jul"},
    {"id":7, "naz":"Avgust"},
    {"id":8, "naz":"Septembar"},
    {"id":9, "naz":"Oktobar"},
    {"id":10, "naz":"Novembar"},
    {"id":11, "naz":"Decembar"}
  ];

  stariMesec: number;
  staraGodina: number;

  datumRacuna: Date = new Date();
  datumRacuna2: string;

  // brojilaRn: Brojilo[];
  // isBrojilaRnLoaded: boolean = false;
  energenti: Energent[];

  // broVrsKol: Array<any>;
  vrednosti: Array<any> = new Array<any>();

  nazivKolone: Array<String> = new Array<String>();
  dozvoljeneVrednosti: Array<String[]> = new Array<String[]>();

  formirajRn(id:number){
    this.proveraRn = 0;
    this.rn = new Racun();

    this.crudService.getSingle("rn/jedan?id=" + id)
      .subscribe(
        data => {
          this.rn = data;

          console.log("racun");
          console.log(this.rn);

          this.nazivKolone = new Array<String>();

          const arrayControl = <FormArray>this.myFormRn2.controls['polja'];

          for (var k = (<FormArray>this.myFormRn2.controls['polja']).length; k > 0; k--){
            arrayControl.removeAt(k-1);
          }

          // console.log(this.broVrsKol);
          // console.log(this.rn.rnStavke);

          for(var j = 0; j < this.brojiloVrstaKolone.length; j++) {
            for (var i = 0; i < this.rn.rnStavke.length; i++) {
              if(this.rn.rnStavke[i].brojiloVrstaKolone.id == this.brojiloVrstaKolone[j].id) {
                if(this.rn.rnStavke[i].brojiloVrstaKolone.obavezno){
                  (<FormArray>this.myFormRn2.controls['polja']).push(new FormControl(this.rn.rnStavke[i].vrednost, Validators.required));
                } else {
                  (<FormArray>this.myFormRn2.controls['polja']).push(new FormControl(this.rn.rnStavke[i].vrednost));
                }

                if (this.brojiloVrstaKolone[j].jedMere) {
                  this.nazivKolone.push(this.brojiloVrstaKolone[j].opis + "(" + this.brojiloVrstaKolone[j].jedMere.naziv + ")");
                } else {
                  this.nazivKolone.push(this.brojiloVrstaKolone[j].opis);
                }

                if (this.brojiloVrstaKolone[j].dozvoljeneVrednosti) {

                  var temp = new Array();
                  temp = this.brojiloVrstaKolone[j].dozvoljeneVrednosti.split(",");

                  this.dozvoljeneVrednosti.push(temp);
                } else {
                  this.dozvoljeneVrednosti.push([]);
                }

              }
            }
          }
          console.log("racun2");
          console.log(this.dozvoljeneVrednosti);
          // odredjivanje god i mes na osnovu datumar
          this.datumRacuna = this.ds.toDate(this.rn.datumr);
          this.datumRacuna2 = this.rn.datumr;

          if (this.rn.brojilo.rezimMerenja.id == 3){
            this.popuniGodinaMesec(this.datumRacuna);
          }

          this.stariMesec = this.datumRacuna.getMonth();
          this.staraGodina = this.datumRacuna.getFullYear();

          this.popunjenaPolja = true;

          console.log("forma");
          console.log(this.myFormRn2);

        },
        error => {console.log(error);
          // this.router.navigate(['/login']);
        }
      );



    this.noviRn = false;
    this.prikaziRn = true;
    this.prikaziBrojilo = false;
  }

  onCreateNoviRn(){
    this.proveraRn = 0;
    this.popunjenaPolja = false;
    this.rn = new Racun();
    this.nazivKolone = new Array<String>();
    this.rn.brojilo = this.brojilo;

    this.rn.energent = this.energenti[0];
    this.rn.dobavljac = this.dobavljaci[0];
    this.rn.rnTip = this.rnTipovi[0];

    this.datumRacuna2 = null;

    // this.getBrojila(this.objekatId);

    const arrayControl = <FormArray>this.myFormRn2.controls['polja'];

    for (var k = (<FormArray>this.myFormRn2.controls['polja']).length; k > 0; k--){
      arrayControl.removeAt(k-1);
    }

    for(var i = 0; i < this.brojiloVrstaKolone.length; i++){
      if(this.brojiloVrstaKolone[i].obavezno){
        (<FormArray>this.myFormRn2.controls['polja']).push(new FormControl('', Validators.required));
      } else {
        (<FormArray>this.myFormRn2.controls['polja']).push(new FormControl(''));
      }

      if (this.brojiloVrstaKolone[i].jedMere) {
        this.nazivKolone.push(this.brojiloVrstaKolone[i].opis + "(" + this.brojiloVrstaKolone[i].jedMere.naziv + ")");
      } else {
        this.nazivKolone.push(this.brojiloVrstaKolone[i].opis);
      }

      if (this.brojiloVrstaKolone[i].dozvoljeneVrednosti) {
        var temp = new Array();
        temp = this.brojiloVrstaKolone[i].dozvoljeneVrednosti.split(",");

        this.dozvoljeneVrednosti.push(temp);
      } else {
        this.dozvoljeneVrednosti.push([]);
      }
    }

    console.log("racun2");
    console.log(this.dozvoljeneVrednosti);

    this.popunjenaPolja = true;

    this.popuniGodinaMesec(new Date());

    this.noviRn = true;
    this.prikaziRn = true;
    this.prikaziBrojilo = false;

    this.brisiFilterRacuni();

    console.log("forma");
    console.log(this.myFormRn2);
  }


  onSubmitRn(event) {

    if (this.myFormRn2.invalid) {
      this.prikaziObaveznaPolja = true;
    } else {
      this.prikaziObaveznaPolja = false;

      this.vrednosti = ((<FormArray>this.myFormRn2.controls['polja']).getRawValue());

      console.log(this.vrednosti);

      this.rnStavke = new Array<RnStavke>();

      if(this.noviRn){
        for(var i = 0; i < this.brojiloVrstaKolone.length; i++) {
          var rnStav = new RnStavke();
          rnStav.brojiloVrstaKolone = this.brojiloVrstaKolone[i];
          rnStav.vrednost = this.vrednosti[i];
          this.rnStavke.push(rnStav);
        }
      } else {
        for(var i = 0; i < this.rn.rnStavke.length; i++) {
          var rnStav = new RnStavke();
          rnStav.brojiloVrstaKolone = this.rn.rnStavke[i].brojiloVrstaKolone;
          rnStav.vrednost = this.vrednosti[i];
          this.rnStavke.push(rnStav);
        }
      }


      console.log(this.rnStavke);

      if (this.rn.brojilo.rezimMerenja.id == 3) {
        this.rn.datumr = this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy');
      }

      this.rn.rnStavke = this.rnStavke;

      this.crudService.sendData("rn", this.rn)
        .subscribe(
          data => {console.log(data); this.getDataRacuni(this.brojilo.id);},
          error => {console.log(error);
          // this.router.navigate(['/login']);
          }
        );

      this.prikaziRn = false;
      this.noviRn = false;
      this.prikaziBrojilo = true;
    }
  }

  onCancelRn() {
    this.prikaziRn = false;
    this.popunjenaPolja = false;
    this.prikaziBrojilo = true;
  }

  // getBrojilaRn(id: number) {
  //   this.crudService.getData("brojilo/sve?obj_id="+id).subscribe(
  //     data => {
  //       this.brojilaRn = data;
  //       console.log(data);
  //       this.rn.brojilo = this.brojilaRn[0];
  //       this.isBrojilaRnLoaded = true;
  //     },
  //     error => {console.log(error);
  //     // this.router.navigate(['/login']);
  //     }
  //   );
  // }

  // public onBrojiloRnSelected(selectedId: number){
  //   if(this.isBrojilaRnLoaded) {
  //     for (var item of this.brojilaRn) {
  //       if (item.id == selectedId) {
  //         this.rn.brojilo = item;
  //       }
  //     }
  //   }
  //
  //   this.getEnergente(this.rn.brojilo.brojiloVrsta.energentTip.id);
  //   this.getBrojiloVrstaKol(this.rn.brojilo.brojiloVrsta.id);
  // }

  getEnergente(id: number) {
    this.crudService.getData("energent/sve?en_tip_id="+id).subscribe(
      data => {
        this.energenti = data;
      },
      error => {console.log(error);
      // this.router.navigate(['/login']);
      }
    );
  }

  public onEnergentSelected(selectedId: number){

    for (var item of this.energenti) {
      if (item.id == selectedId) {
        this.rn.energent = item;
      }
    }
  }

  // getRnTip() {
  //   this.crudService.getData("rn_tip/sve").subscribe(
  //     data => {
  //       this.rnTipovi = data;
  //     },
  //     error => {console.log(error);
  //       // this.router.navigate(['/login']);
  //     }
  //   );
  // }

  public onRnTipSelected(selectedId: number){

    for (var item of this.rnTipovi) {
      if (item.id == selectedId) {
        this.rn.rnTip = item;
      }
    }
  }

  public onDobavljacSelected(selectedId: number){

    for (var item of this.dobavljaci) {
      if (item.id == selectedId) {
        this.rn.dobavljac = item;
      }
    }
  }


  // getBrojiloVrstaKol(id: number) {
  //   this.crudService.getData("bro_vrs_kol/sve?bro_vrs_id="+id).subscribe(
  //     data => {
  //
  //       this.broVrsKol = data;
  //
  //       const arrayControl = <FormArray>this.myFormRn2.controls['polja'];
  //
  //       for (var k = (<FormArray>this.myFormRn2.controls['polja']).length; k > 0; k--){
  //         arrayControl.removeAt(k-1);
  //       }
  //
  //       for(var i = 0; i < this.broVrsKol.length; i++){
  //         (<FormArray>this.myFormRn2.controls['polja']).push(new FormControl('', Validators.required));
  //       }
  //
  //       this.popunjenaPolja = true;
  //
  //       console.log(this.broVrsKol);
  //     },
  //     error => {console.log(error);
  //       // this.router.navigate(['/login']);
  //     }
  //   );
  // }

  napuniGodine(){
    let datum = new Date();
    let godina = datum.getFullYear();
    for(var i = 0; i < this.brojGodinaUMeniju; i++){
      this.godine.push(godina - i);
    }

  }

  public onGodinaSelected(selectedGodina: number){
    this.datumRacuna.setFullYear(selectedGodina);

    if (this.noviRn || (!this.noviRn && this.rn && (this.godina != this.staraGodina || this.mesec.id != this.stariMesec))) {

      this.proveriRacun("rn/provera?datumr="+this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy')+"&brojilo_id="+this.rn.brojilo.id);
    }

  }

  public onMesecSelected(selectedMesec: number){
    this.datumRacuna.setMonth(selectedMesec);
    this.datumRacuna.setDate(15);

    if (this.noviRn || (!this.noviRn && (this.godina != this.staraGodina || this.mesec.id != this.stariMesec))) {
      this.proveriRacun("rn/provera?datumr="+this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy')+"&brojilo_id="+this.rn.brojilo.id);
    }

  }

  popuniGodinaMesec(datum: Date){
    this.mesec.id = datum.getMonth();

    if(this.godine.length==0) {
      this.napuniGodine();
    }

    for (var item of this.godine) {
      if (item == datum.getFullYear()) {
        this.godina = item;
      }
    }
  }

  proveriRacun(url: string){
    if (this.brojilo.rezimMerenja.id == 3) {
      this.crudService.getData(url).subscribe(
        data => {
          this.proveraRn = data;
        },
        error => console.log(error)
      );
    } else {
      this.proveraRn = 0;
    }
  }

  onDateChangedDatumRacuna(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
      this.rn.datumr = event.formatted;
  }
}
