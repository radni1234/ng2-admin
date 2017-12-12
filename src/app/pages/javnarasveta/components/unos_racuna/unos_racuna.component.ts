import {Component, ViewEncapsulation} from "@angular/core";
import {FormGroup, FormBuilder, FormArray} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {Opstina, Mesto} from "../../../admin/components/opstina/opstinadata";
import {CompleterData, CompleterItem, CompleterService} from "ng2-completer";
import {Trafo} from "../trafo/trafo.data";
import {RnTrafo} from "../rn_trafo/rn_trafo.data";

@Component({
  selector: 'isem-trafo-unos-racuna',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'unos_racuna.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class UnosRacunaComponent {
  myForm: FormGroup;

  private opstina: Opstina;
  private opstine: Opstina[];
  private selectedOpstina: string;
  public isOpstineLoaded:boolean = false;
  private dataServiceOpstine: CompleterData;

  private mesta: Mesto[];
  private mesto: Mesto;
  private selectedMesto: string;
  public isMestaLoaded:boolean = false;
  private dataServiceMesta: CompleterData;
  mestoId: number;

  mes: String;
  god: String;

  months = [
    { val: '01',  name: 'Januar' },
    { val: '02',  name: 'Februar' },
    { val: '03',  name: 'Mart' },
    { val: '04',  name: 'April' },
    { val: '05',  name: 'Maj' },
    { val: '06',  name: 'Jun' },
    { val: '07',  name: 'Jul' },
    { val: '08',  name: 'Avgust' },
    { val: '09',  name: 'Septembar' },
    { val: '10',  name: 'Oktobar' },
    { val: '11',  name: 'Novembar' },
    { val: '12',  name: 'Decembar' }
  ];

  years: number[] =[];
  private yy : number;

  trafoi: Trafo[];

  noviRacun: RnTrafo;
  racuni: RnTrafo[];
  racuniPrikaz: RnTrafo[] = new Array<RnTrafo>();

  racuniForma: FormGroup;

  popunjenaPolja: boolean = true;


  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService, private router: Router) {

  }

  ngOnInit() {
    this.getOpstine();
    this.getYear();
    this.postaviDatume();

    this.racuniForma = new FormGroup({
      racuni: new FormArray([])
    });
  }

  formirajRed(r?: RnTrafo) {
    return this.fb.group({
      trafoId: [r.trafo.id],
      adresa: [r.trafo.adresa],
      potrosnja: [r.potrosnja],
      iznos: [r.iznos]
    });
  }

  kreirajFormu() {
    const redovi = <FormArray>this.racuniForma.controls['racuni'];

    for (var i = 0; i < this.racuniPrikaz.length; i++) {
      redovi.push(this.formirajRed(this.racuniPrikaz[i]));
    }

    console.log(this.racuniForma);
  };

  snimiRacune() {
    for (var i = 0; i < this.racuniPrikaz.length; i++) {
      // console.log(this.racuniForma.controls['racuni'].controls[i].iznos.value);
      console.log(this.racuniForma.controls.racuni.controls[i].controls.iznos.value);
      for (var j = 0; j < this.racuniForma.controls.racuni.controls.length; j++) {
        if (this.racuniPrikaz[i].trafo.id == this.racuniForma.controls.racuni.controls[j].controls.trafoId.value) {
          this.racuniPrikaz[i].iznos = this.racuniForma.controls.racuni.controls[i].controls.iznos.value;
          this.racuniPrikaz[i].potrosnja = this.racuniForma.controls.racuni.controls[i].controls.potrosnja.value;

          this.crudService.sendData("rn_trafo", this.racuniPrikaz[i])
            .subscribe(
              data => {
                console.log(data);
                // this.getData();
              },
              error => console.log(error)
            );
        }
      }
    }

    this.getDataRacuni();
  }

  odustani(){
    this.racuniPrikaz = new Array<RnTrafo>();
    this.racuniForma = new FormGroup({
      racuni: new FormArray([])
    });
    this.kreirajFormu();
  }

  getDataRacuni() {
    if  (this.areNullOrUndefined([this.mestoId, this.mes, this.god])) {
      this.popunjenaPolja = false;
    } else {
      this.popunjenaPolja = true;
      this.odustani();

      this.crudService.getData("rn_trafo/sve?mesto_id=" + this.mestoId + "&datumr=15." + this.mes + "." + this.god).subscribe(
        data => {
          this.racuni = data;
          console.log(data);
          this.getDataTrafo()
        },
        error => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      );
    }
  }

  getDataTrafo() {
    this.crudService.getData("trafo/sve?mesto_id="+this.mestoId).subscribe(
      data => {this.trafoi = data;
              console.log(data);
              this.popuniRacune();},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  popuniRacune() {
    let uneto: boolean = false;

    for (var i = 0; i < this.trafoi.length; i++) {
      for (var j = 0; j < this.racuni.length; j++){
        if (this.trafoi[i].id == this.racuni[j].trafo.id){
          this.racuniPrikaz.push(this.racuni[j]);
          uneto = true;
          break;
        }
      }

      if (!uneto) {
        this.noviRacun = new RnTrafo();
        this.noviRacun.trafo = this.trafoi[i];
        this.noviRacun.datumr = "15." + this.mes + "." + this.god;
        this.racuniPrikaz.push(this.noviRacun);
      }

      uneto = false;
    }

    console.log(this.racuniPrikaz);
    this.kreirajFormu();
  }
  public getOpstine (){
    this.crudService.getData("opstina/sve")
      .subscribe(
        data => {
          this.opstine = data;
          console.log(this.opstine);
          this.dataServiceOpstine = this.completerService.local(this.opstine, 'naziv', 'naziv');
          this.isOpstineLoaded = true;
        },
        error => {console.log(error);});
  }

  public onOpstinaSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      console.log(selected.originalObject.id);
      this.getMesta(selected.originalObject.id);
      this.selectedOpstina=selected.originalObject;
      this.selectedMesto = "Biraj mesto";
    }
  }

  public getMesta (id: number){
    this.crudService.getData("mesto/sve?ops_id=" + id)
      .subscribe(
        listaMesta => {
          this.mesta = listaMesta;
          console.log(this.mesta);
          this.dataServiceMesta = this.completerService.local(this.mesta, 'naziv', 'naziv');
          this.isMestaLoaded = true;
        },
        error => {console.log(error); }
      );
  }


  public onMestoSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      this.mestoId = selected.originalObject.id;

    }
  }

  getYear(){
    var today = new Date();
    this.yy = today.getFullYear();
    for(var i = (this.yy-15); i <= this.yy; i++){
      this.years.push(i);
    }
  }

  postaviDatume() {
    var today = new Date();

    this.god = today.getFullYear().toString();

    var mesec = today.getMonth() + 1;

    if (mesec < 10) {
      this.mes = '0' + mesec;
    }
  }

  areNullOrUndefined(arr) {
    for (var i = 0; i < arr.length; i++) {
      var itm = arr[i];
      if (itm === null || itm === undefined) {
        return true;
      }
    }
    return false;
}
}
