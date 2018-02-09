import {Component, ViewEncapsulation, OnInit, ViewChild} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap";
import {CrudService} from "../../../services/crud.service";
import {FormBuilder, FormGroup, FormArray} from "@angular/forms";
import {CompleterService, CompleterItem, CompleterData} from "ng2-completer";
import {Router} from "@angular/router";
import {Opstina} from "../opstina/opstinadata";
import {StepenDan, Mesec} from "./stepen_dani.data";
import {LocalDataSource} from "ng2-smart-table";

@Component({
  selector: 'isem-stepen-dani',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'stepen_dani.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class StepenDaniComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  popunjenaPolja: boolean = true;

  private opstina: Opstina;
  private opstine: Opstina[];
  public isOpstineLoaded:boolean = false;
  private dataServiceOpstine: CompleterData;
  private opstinaId: number;

  years: number[] =[];
  private yy : number;
  meseci: Mesec[];
  god: String;

  stepenDanForma: FormGroup;

  noviStepenDan: StepenDan;
  stepenDani: StepenDan[];
  stepenDaniPrikaz: StepenDan[] = new Array<StepenDan>();


  brisanjeId: number;
  izbor: boolean = false;

  source: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;

  ngOnInit(){
    this.getOpstine();
    this.getMesece();
    this.getYear();

    this.stepenDanForma = new FormGroup({
      stepenDani: new FormArray([])
    });
  }

  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      opstina: [''],
      godina: [''],
      mesec: [''],
      sd_iznos: [''],
      version: ['']
    });
  }


  getData(){

    if  (this.areNullOrUndefined([this.opstina, this.god])) {
      this.popunjenaPolja = false;
    } else {
      this.popunjenaPolja = true;
      this.odustani();

      this.crudService.getData("stepen_dan/sve?ops_id="+this.opstinaId+"&god="+this.god).subscribe(
        data => { this.stepenDani = data; this.odustani(); this.popuniStepenDaniPrikaz(); console.log(data);},
        error => {console.log(error); this.router.navigate(['/login']);}
      );

    }
  }

  popuniStepenDaniPrikaz(){
    this.stepenDaniPrikaz = new Array<StepenDan>();
    let uneto: boolean = false;

    console.log(" -- prikaz OPS -- ");
    console.log(this.opstina.id);

    for (var i = 0; i < this.meseci.length; i++) {
      for (var j = 0; j < this.stepenDani.length; j++){
        if (this.meseci[i].id == this.stepenDani[j].mesec.id){
          this.stepenDaniPrikaz.push(this.stepenDani[j]);
          uneto = true;
          break;
        }
      }

      if (!uneto) {
        this.noviStepenDan = new StepenDan();
        this.noviStepenDan.mesec = this.meseci[i];
        this.noviStepenDan.godina = Number(this.god);
        this.noviStepenDan.opstina = this.opstina;
        this.stepenDaniPrikaz.push(this.noviStepenDan);
      }

      uneto = false;
    }

    console.log(" -- prikaz -- ");
    console.log(this.stepenDaniPrikaz);
    this.kreirajFormu();
  }

  formirajRed(s?: StepenDan) {
    return this.fb.group({
      id: [s.id],
      mesecId: [s.mesec.id],
      mesec: [s.mesec.naziv],
      sdIznos: [s.sdIznos]
    });
  }

  kreirajFormu(){
    const redovi = <FormArray>this.stepenDanForma.controls['stepenDani'];

    for (var i = 0; i < this.stepenDaniPrikaz.length; i++) {
      redovi.push(this.formirajRed(this.stepenDaniPrikaz[i]));
    }

    console.log(this.stepenDanForma);
  }

  odustani(){
    this.stepenDaniPrikaz = new Array<StepenDan>();
    this.stepenDanForma = new FormGroup({
      stepenDani: new FormArray([])
    });
    this.kreirajFormu();
  }

  snimiStepenDane(){
    console.log(" -- ulaz -- ");
    console.log(this.stepenDaniPrikaz);
    console.log(this.stepenDanForma.controls);

    for (var i = 0; i < this.stepenDaniPrikaz.length; i++) {

      for (var j = 0; j < (this.stepenDanForma.controls as any).stepenDani.controls.length; j++) {

        // console.log((this.stepenDanForma.controls as any).stepenDani.controls[j].controls.sdIznos.value);
        // console.log(this.stepenDaniPrikaz[i].sdIznos);

        // console.log(this.stepenDaniPrikaz[i].id);
        // console.log(this.areNullOrUndefined([this.stepenDaniPrikaz[i].id]));
        //
        // console.log((this.stepenDanForma.controls as any).stepenDani.controls[j].controls.sdIznos.value);
        // console.log(!this.areNullOrUndefined([(this.stepenDanForma.controls as any).stepenDani.controls[j].controls.sdIznos.value]));
        //
        // console.log((this.areNullOrUndefined([this.stepenDaniPrikaz[i].id]) && !this.areNullOrUndefined([(this.stepenDanForma.controls as any).stepenDani.controls[j].controls.sdIznos.value])));
        //
        // console.log(this.stepenDaniPrikaz[i].sdIznos);

        if (this.stepenDaniPrikaz[i].mesec.id === (this.stepenDanForma.controls as any).stepenDani.controls[j].controls.mesecId.value)

        {

          // insert
          if (((this.areNullOrUndefined([this.stepenDaniPrikaz[i].id]) && !this.areNullOrUndefined([(this.stepenDanForma.controls as any).stepenDani.controls[j].controls.sdIznos.value])))
          // update
          || (!this.areNullOrUndefined([this.stepenDaniPrikaz[i].id])
          && !this.areNullOrUndefined([(this.stepenDanForma.controls as any).stepenDani.controls[j].controls.sdIznos.value])
          && this.stepenDaniPrikaz[i].sdIznos != (this.stepenDanForma.controls as any).stepenDani.controls[j].controls.sdIznos.value)){


          this.stepenDaniPrikaz[i].sdIznos = (this.stepenDanForma.controls as any).stepenDani.controls[j].controls.sdIznos.value;

          console.log(this.stepenDaniPrikaz[i]);
          this.crudService.sendData("stepen_dan", this.stepenDaniPrikaz[i])
            .subscribe(
              data => {
                console.log(data);
                this.getData();
              },
              error => console.log(error)
            );

          } else if (!this.areNullOrUndefined([this.stepenDaniPrikaz[i].id]) && this.areNullOrUndefined([(this.stepenDanForma.controls as any).stepenDani.controls[j].controls.sdIznos.value])){

            this.crudService.delete("stepen_dan", this.stepenDaniPrikaz[i].id)
              .subscribe(
                data => {console.log(data); this.getData();},
                error => console.log(error)
              );
          }

        }
      }
    }


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

    if(selected!==null){
      this.opstinaId = selected.originalObject.id;
      this.opstina=selected.originalObject;
      console.log(" -- opstina -- ");
      console.log(selected.originalObject);
      console.log(this.opstina);
    }

  }

  getYear(){
    var today = new Date();
    this.yy = today.getFullYear();
    for(var i = (this.yy-15); i <= this.yy; i++){
      this.years.push(i);
    }
  }

  getMesece (){
    this.crudService.getData("mesec/sve")
      .subscribe(
        data => {
          this.meseci = data;
          console.log(this.meseci);
         },
        error => {console.log(error);});
  }

  areNullOrUndefined(arr) {
    for (var i = 0; i < arr.length; i++) {
      var itm = arr[i];
      if (itm === null || itm === undefined || itm === "") {
        return true;
      }
    }
    return false;
  }

}
