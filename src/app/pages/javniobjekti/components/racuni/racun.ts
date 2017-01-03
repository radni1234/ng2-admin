import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'isem-jedmere',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './racun.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class RacunComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  myForm: FormGroup;
  stavke: Array<any>;
  vrsteBrojila: Array<any>;
  izbor: boolean = false;
  isVrsteLoaded: boolean = false;
  vrstaID: number;
  godine: number [] = new Array <number>();
  godina: number;
  brojGodinaUMeniju: number = 5;
  meseci: string [] = ["JANUAR","FEBRUAR","MART","APRIL","MAJ","JUN","JUL","AVGUST","SEPTEMBAR","OKTOBAR","NOVEMBAR","DECEMBAR"];
  mesec: string;
  datumRacuna: Date = new Date();

  constructor(private crudService: CrudService, private fb: FormBuilder) {
    this.myForm = this.fb.group({

      hobbies: fb.array([
        // ['Cooking', Validators.required]
      ])
    });
  }

  public onVrstaSelected(selectedId: number){
    this.vrstaID = selectedId;
    this.getData();
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

  getData() {
    this.crudService.getData("bro_vrs_kol").subscribe(
      data => {
        // console.log(data);
        this.stavke = data;
        console.log("STAVKE PREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        console.log(this.stavke);

        for(var i = 0; i < this.stavke.length; i++)
        {
          var obj = this.stavke[i];
          if(this.vrstaID == obj.brojiloVrsta.id)
          {
            console.log(obj.naziv);
            (<FormArray>this.myForm.controls['hobbies']).push(new FormControl('', Validators.required));
          }
          else{
            console.log("IZBACIVANJEEEEE");
            console.log(obj.naziv);
            this.stavke.splice(i,1);
            i--;
          }
        }
        console.log("STAVKE POSLEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        console.log(this.stavke);
        this.izbor = true;

      },
      error => console.log(error)
    );
  }
  getVrsteBrojila(){
    this.crudService.getData("brojilo_vrsta").subscribe(
      data => {
        console.log(data);
        this.vrsteBrojila = data;
        this.isVrsteLoaded = true;

      },
      error => console.log(error)
    );
  }

  napuniGodine(){
    let datum = new Date();
    let godina = datum.getFullYear();
    console.log(godina);
    for(var i = 0; i < this.brojGodinaUMeniju; i++){
      this.godine.push(godina - i);
    }

  }

  dodajGodine(){
    while(this.godine.length > 0) {
      this.godine.pop();
    }
    this.brojGodinaUMeniju += 5;
    this.napuniGodine();

  }

  ngOnInit() {
    this.getVrsteBrojila();
    this.napuniGodine();
    // this.getData();
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

}
