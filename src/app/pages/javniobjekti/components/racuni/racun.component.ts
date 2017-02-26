import {ModalDirective} from "ng2-bootstrap";
import {ViewChild} from "@angular/core/src/metadata/di";
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder, FormArray, Validators, FormControl} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Racun, Brojilo, BrojiloVrstaKolone, RnStavke} from "./racundata";
import {Energent} from "../../../admin/components/energent/energentdata";
import {Objekat} from "../objekti/objekatdata";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'isem-racun',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'racun.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class RacunComponent2 implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  obj: Objekat = new Objekat();
  rn: Racun = new Racun();
  // isRacunLoaded: boolean = true;
  //

  objekti: Objekat[];
  isObjektiLoaded: boolean = false;
  objekatId: number;

  brojila: Brojilo[];
  isBrojilaLoaded: boolean = false;
  brojiloId: number;

  energenti: Energent[];
  isEnergentiLoaded: boolean = false;
  energentId: number;

  godine: number [] = new Array <number>();
  godina: number;
  brojGodinaUMeniju: number = 5;

  meseci: string [] = ["Januar","Februar","Mart","April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"];
  mesec: string;

  datumRacuna: Date = new Date();

  stavke: Array<any>;
  rnStavke: Array<RnStavke> = new Array<RnStavke>();

  vrednosti: Array<any> = new Array<any>();



  //
  // source: LocalDataSource = new LocalDataSource();
  //
   myForm: FormGroup;
   myForm2: FormGroup;


  constructor(private crudService: CrudService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
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

    this.myForm2 = this.fb.group({
      polja: fb.array([
      ])
    });


      this.rn = new Racun();
      this.getObjekte();

    // this.getEnergente();
    //
    // this.rn.energent = this.energenti[0];
    //

  }

  ngOnInit() {
    this.napuniGodine();
  }

  onCreate(): void{
    this.rn = new Racun();
    this.rn.energent = this.energenti[0];
    this.isEnergentiLoaded = true;

  }

  // getData() {
  //   this.crudService.getData("rn").subscribe(
  //     data => {this.source.load(data); console.log(data);},
  //     error => console.log(error)
  //   );
  // }

  getBrojiloVrstaKol(uslov: string) {
    this.crudService.getUslov("bro_vrs_kol", uslov).subscribe(
      data => {

        this.stavke = data;

        for(var i = 0; i < this.stavke.length; i++)
        {

          (<FormArray>this.myForm2.controls['polja']).push(new FormControl('', Validators.required));
        }

        console.log(this.stavke);
      },
      error => console.log(error)
    );
  }

  getObjekte() {
    this.crudService.getData("objekat").subscribe(
      data => {
        this.objekti = data;
        this.obj = this.objekti[0];
        this.isObjektiLoaded = true;
      },
      error => console.log(error)
    );
  }

  public onObjekatSelected(selectedId: number){
    if(this.isObjektiLoaded) {
      for (var item of this.objekti) {
        if (item.id == selectedId) {
          this.obj = item;
        }
      }
    }

    this.getBrojila("obj_id="+this.obj.id);
  }

  getBrojila(uslov: string) {
    this.crudService.getUslov("brojilo", uslov).subscribe(
      data => {
        this.brojila = data;
        console.log(data);
        this.rn.brojilo = this.brojila[0];
        this.isBrojilaLoaded = true;
      },
      error => console.log(error)
    );
  }

  public onBrojiloSelected(selectedId: number){
    if(this.isBrojilaLoaded) {
      for (var item of this.brojila) {
        if (item.id == selectedId) {
          this.rn.brojilo = item;
        }
      }
    }

    this.getEnergente("en_tip_id="+this.rn.brojilo.brojiloVrsta.energentTip.id);
    this.getBrojiloVrstaKol("bro_vrs_id="+this.rn.brojilo.brojiloVrsta.id);
  }

  getEnergente(uslov: string) {
    this.crudService.getUslov("energent", uslov).subscribe(
      data => {
        this.energenti = data;
        this.rn.energent = this.energenti[0];
        this.isEnergentiLoaded = true;
      },
      error => console.log(error)
    );
  }

  public onEnergentSelected(selectedId: number){
    if(this.isEnergentiLoaded) {
      for (var item of this.energenti) {
        if (item.id == selectedId) {
          this.rn.energent = item;
        }
      }
    }
  }

  napuniGodine(){
    let datum = new Date();
    let godina = datum.getFullYear();
    for(var i = 0; i < this.brojGodinaUMeniju; i++){
      this.godine.push(godina - i);
    }

  }

  public onGodinaSelected(selectedGodina: number){
    console.log("Selektovana godina: " + selectedGodina);
    this.datumRacuna.setFullYear(selectedGodina);
    console.log("Izabrani datum je: " + this.datumRacuna);
  }

  public onMesecSelected(selectedMesec: number){
    console.log("Selektovani mesec: " + selectedMesec);
    this.datumRacuna.setMonth(selectedMesec);
    this.datumRacuna.setDate(15);
    console.log("Izabrani datum je: " + this.datumRacuna);
  }

  // onSubmit(objekat) {
  //
  //   this.crudService.sendData("rn", objekat)
  //     .subscribe(
  //       data => {console.log(data); },
  //       error => console.log(error)
  //     );
  //
  //   // this.izbor = false;
  //   // this.naliranje();
  // }
  //

  onCancel(): void {
   // console.log(this.myForm2.controls);
    this.vrednosti = ((<FormArray>this.myForm2.controls['polja']).getRawValue());

    for(var i = 0; i < this.stavke.length; i++)
    {
      var rnStav = new RnStavke();
      rnStav.brojiloVrstaKolone = this.rn.rnStavke[i].brojiloVrstaKolone;
      rnStav.vrednost = this.vrednosti[i];
      this.rnStavke.push(rnStav);
    }

    console.log(this.rnStavke);

    var datePipe = new DatePipe('fr-FR');


    this.rn.datumr = datePipe.transform(this.datumRacuna, 'dd.MM.yyyy');

    this.rn.rnStavke = this.rnStavke;

    this.crudService.sendData("rn", this.rn)
      .subscribe(
        data => {console.log(data);},
        error => console.log(error)
      );
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

}
