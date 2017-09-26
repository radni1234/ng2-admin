import {Component, ViewEncapsulation} from "@angular/core";
import {FormGroup, FormBuilder, FormArray} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {Opstina, Mesto} from "../../../admin/components/opstina/opstinadata";
import {CompleterData, CompleterItem, CompleterService} from "ng2-completer";
import {Trafo} from "../trafo/trafo.data";
import {RnTrafo} from "../rn_trafo/rn_trafo.data";

@Component({
  selector: 'isem-trafo-redosled',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'trafo_redosled.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class TrafoRedosledComponent {
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

  trafoi: Trafo[];

  // noviRacun: RnTrafo;
  // racuni: RnTrafo[];
  // racuniPrikaz: RnTrafo[] = new Array<RnTrafo>();
  //
  forma: FormGroup;


  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService, private router: Router) {

  }

  ngOnInit() {
    this.getOpstine();

    this.forma = new FormGroup({
      trafoi: new FormArray([])
    });
  }

  formirajRed(t?: Trafo) {
    return this.fb.group({
      id: [t.id],
      adresa: [t.adresa],
      redosled: [t.redosled],
      noviRedosled: []
    });
  }

  kreirajFormu() {
    const redovi = <FormArray>this.forma.controls['trafoi'];

    for (var i = 0; i < this.trafoi.length; i++) {
      redovi.push(this.formirajRed(this.trafoi[i]));
    }

    console.log(this.forma);
  };

  snimiIzmene() {

    // for (var i = 0; i < this.forma.controls.trafoi.controls.length; i++) {
    //   var noviRedosled = this.forma.controls.trafoi.controls[i].controls.noviRedosled.value;
    //   var stariRedosled = this.forma.controls.trafoi.controls[i].controls.redosled.value;
    //
    //   if (noviRedosled != null) {
    //     if (noviRedosled < stariRedosled) {
    //       for (var j = 0; j < this.forma.controls.trafoi.controls.length; j++) {
    //         if (this.forma.controls.trafoi.controls[j].controls.redosled.value >= noviRedosled
    //               && this.forma.controls.trafoi.controls[j].controls.redosled.value < stariRedosled) {
    //           this.forma.controls.trafoi.controls[j].controls.redosled.setValue(this.forma.controls.trafoi.controls[j].controls.redosled.value + 1);
    //         }
    //       }
    //     } else if (noviRedosled > stariRedosled) {
    //       for (var j = 0; j < this.forma.controls.trafoi.controls.length; j++) {
    //         if (this.forma.controls.trafoi.controls[j].controls.redosled.value <= noviRedosled
    //           && this.forma.controls.trafoi.controls[j].controls.redosled.value > stariRedosled) {
    //           this.forma.controls.trafoi.controls[j].controls.redosled.setValue(this.forma.controls.trafoi.controls[j].controls.redosled.value - 1);
    //         }
    //       }
    //     }
    //     this.forma.controls.trafoi.controls[i].controls.redosled.setValue(noviRedosled);
    //
    //   }
    // }
    //
    //
    // for (var i = 0; i < this.forma.controls.trafoi.controls.length; i++) {
    //   var trafoId = this.forma.controls.trafoi.controls[i].controls.id.value;
    //   var redosled = this.forma.controls.trafoi.controls[i].controls.redosled.value;
    //
    //   console.log('a ' + this.forma.controls.trafoi.controls[i].controls.id.value);
    //   // console.log(this.forma.controls.trafoi.controls[i].controls.redosled.value);
    //
    //   for (var j = 0; j < this.trafoi.length; j++) {
    //     if (trafoId == this.trafoi[j].id && redosled != this.trafoi[j].redosled) {
    //       console.log('b ' + this.trafoi[j].id);
    //       // console.log(this.trafoi[j].redosled);
    //       this.trafoi[j].redosled = redosled;
    //
    //       this.crudService.sendData("trafo", this.trafoi[j])
    //         .subscribe(
    //           data => {console.log(data);
    //           },
    //           error => console.log(error)
    //         );
    //     }
    //   }
    // }

    for (var i = 0; i < this.forma.controls.trafoi.controls.length; i++) {
      var trafoId = this.forma.controls.trafoi.controls[i].controls.id.value;
      var noviRedosled = this.forma.controls.trafoi.controls[i].controls.noviRedosled.value;

       for (var j = 0; j < this.trafoi.length; j++) {
        if (trafoId == this.trafoi[j].id) {
         this.trafoi[j].redosled = noviRedosled;

          this.crudService.sendData("trafo", this.trafoi[j])
            .subscribe(
              data => {console.log(data);
              },
              error => console.log(error)
            );
        }
      }
    }

    this.getDataTrafo();
  }

  odustani(){
    this.trafoi = new Array<Trafo>();
    this.forma = new FormGroup({
      trafoi: new FormArray([])
    });
    this.kreirajFormu();
  }


  getDataTrafo() {
    this.odustani();

    this.crudService.getData("trafo/sve?mesto_id="+this.mestoId).subscribe(
      data => {this.trafoi = data;
        console.log(data);
        this.kreirajFormu();
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
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


}
