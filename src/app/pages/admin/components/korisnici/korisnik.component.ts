import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import {KorisniciService} from "./korisnici.services";
import {LocalDataSource} from "ng2-smart-table/build/ng2-smart-table";
import {KorisnikData, Uloga, Opstina, Mesto} from "./korisnikdata";
import { Router} from '@angular/router';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';



@Component({
  selector: 'korisnik',
  templateUrl: 'korisnik.html',
  styles: [require('./modals.scss')],
})
export class Korisnik implements OnInit{

  private isRemember: number;
  id:string;
  selectedOpstina: string;
  selektovanaOpstina: Opstina;
  myForm:FormGroup;
  korisnik: KorisnikData = new KorisnikData();
  uloge: Uloga[];
  private opstine: Opstina[];
  private mesta: Mesto[];
  private opstina: Opstina;
  private mesto: Mesto;
  private uloga: Uloga;
  private ulogaId: number;
  public isDataLoaded:boolean = false;
  public isMestaLoaded:boolean = false;
  public isKorisnikLoaded:boolean = false;
  public isUlogeLoaded:boolean = false;



  genders = [
    'male',
    'female'
  ];
  errorMessage:string;
  source:LocalDataSource = new LocalDataSource();
  private ime: string;
  private opstinaNaziv: string;
//  private uloga: string;

  private searchStr: string;
  private dataService: CompleterData;
  private dataServiceMesta: CompleterData;
 // private CMPService: CompleterService;
  private searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  private searchOpstine = [
    { naziv: 'Kula', value: '#f00' },
    { naziv: 'Vrbas', value: '#0f0' },
    { naziv: 'Sombor', value: '#00f' },
    { naziv: 'Bačka Palanka', value: '#0ff' },
    { naziv: 'Novi Sad', value: '#f0f' },
    { naziv: 'Kragujevac', value: '#ff0' },
    { naziv: 'Subotica', value: '#000' }
  ];

  constructor(private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute, protected service:KorisniciService,
              private router: Router, private completerService: CompleterService
  ) {
 //     this.CMPService = completerService;
 //   console.log(this.opstine);
 //   this.dataService = completerService.local(this.searchOpstine, 'naziv', 'naziv');
//    this.dataService = completerService.local(this.searchData, 'color', 'color');

    this.isRemember = 0;
//    this.dataService = completerService.remote('https://stormy-temple-40721.herokuapp.com/opstina/sve', 'naziv', 'naziv');

    this.id = activatedRoute.snapshot.params['id'];

    console.log('Routin parametar: '+this.id);
    if (this.id==null){
      console.log("NEDEFINISAN");
      this.selektovanaOpstina = new Opstina();
      this.selektovanaOpstina.naziv = "Ada";
      this.opstina = new Opstina();
      this.opstina.naziv = "Ada";
      this.mesto = new Mesto();
      this.mesto.naziv = "Ada";
      this.uloga = new Uloga();
      this.uloga.naziv = "Korisnik";
      this.mesto.opstina = this.opstina;

      this.korisnik = new KorisnikData();

      this.korisnik.mesto = this.mesto;
      this.korisnik.uloga = this.uloga;
      console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPP");
      this.isKorisnikLoaded = true;
      console.log(this.korisnik);
    }
    this.service.getListaUloga()
      .subscribe(
        listaUloga => {

          this.uloge = listaUloga;
          this.isUlogeLoaded = true;
//        console.log(this.uloge[1]);
        },
        error => this.errorMessage = <any>error);


    if(this.id!=null){

      this.service.getKorisnik(this.id)
        .subscribe(
          // korisnik => console.log(korisnik),
          //
          korisnik => {
//          this.ime = korisnik.username;
//          this.opstinaNaziv = korisnik.opstina.naziv;
//          this.uloga= korisnik.uloga.naziv;
//          this.opstina = korisnik.opstina.naziv;
            this.korisnik = korisnik;
            this.ulogaId = korisnik.uloga.id;
            this.selektovanaOpstina = korisnik.mesto.opstina;
//          this.korisnik.opstina.id = korisnik.opstina.id;
            //this.korisnik.password = korisnik.password;
//         console.log(korisnik.opstina.naziv);
            this.isKorisnikLoaded = true;
            this.napuniMesta(korisnik.mesto.opstina.id);
          },
          error => this.errorMessage = <any>error);

    }





 //   console.log(this.korisnik.toString());



}

  odlazi() {
    this.router.navigate(['/pages/admin/korisnici']);
  }
  onDateChangedRacun(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.korisnik.alarmRacunStart = event.formatted;
  }

  onDateChangedTrend(event:any) {
    console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    this.korisnik.alarmTrendStart = event.formatted;
  }
  onChangeRacun(event:any){
    console.log(event);
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var date = curr_year + "-" + curr_month + "-" + curr_date;
    if(event == true){
      this.korisnik.alarmRacunStart = date;
       }

  }
  onChangeTrend(event:any){
    console.log(event);
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var date = curr_year + "-" + curr_month + "-" + curr_date;
    if(event == true){
      this.korisnik.alarmTrendStart = date;
    }

  }


  ngOnInit() {

    if (this.isKorisnikLoaded) {
      console.log("ucitao gaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }

    // id: number;
    // opstina: Opstina;
    // uloga: Uloga;
    // mesto: Mesto;
    // username: string;
    // naziv: string;
    // tel: string;
    // fax: string;
    // mob: string;
    // mail: string;
    // blokiran: string;
    // rasveta: string;
    // alarmRacun: string;
    // alarmRacunStart: string;
    // alarmTrend: string;
    // alarmTrendStart: string;
    // password: string;
    // version: number;

    this.myForm = new FormGroup({
      id: new FormControl(),
      opstina: new FormGroup({
        id: new FormControl(''),
        naziv: new FormControl(''),
      }),
      uloga: new FormGroup({
        id: new FormControl(''),
        naziv: new FormControl('')
      }),
      mesto: new FormGroup({
        id: new FormControl(''),
        naziv: new FormControl(''),
      }),
      username: new FormControl(),
      naziv: new FormControl(),
      tel: new FormControl('',Validators.required),
      fax: new FormControl(),
      mob: new FormControl(),
      mail: new FormControl('',[Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
      alarmRacun: new FormControl(),
      alarmRacun1: new FormControl(),
      alarmRacunStart: new FormControl(),
      alarmTrend: new FormControl(),
      alarmTrendStart: new FormControl(),
      password: new FormControl()


    })
//    console.log(this.korisnik.opstina.naziv+'khjghjhughjgjhg');
    this.service.getListaOpstina()
      .subscribe(
        listaOpstina => {
          this.opstine = listaOpstina;
          console.log(this.opstine);
          this.dataService = this.completerService.local(this.opstine, 'naziv', 'naziv');
          this.isDataLoaded = true;
        },
        error => this.errorMessage = <any>error);
    //called after the constructor and called  after the first ngOnChanges()

//    console.log(this.ime);



  }


  onSubmit(){


    console.log(this.korisnik);
    this.service.sendKorisnik(this.korisnik).subscribe(
      data=> {
        console.log(data);
        this.router.navigate(['/pages/admin/korisnici']);
      }
    );

  }

  napuniMesta (id: number){
    this.service.getListaMesta(id)
      .subscribe(
             listaMesta => {
               this.mesta = listaMesta;
               console.log(this.mesta);
               this.dataServiceMesta = this.completerService.local(this.mesta, 'naziv', 'naziv');
               this.isMestaLoaded = true;
             },
        error => this.errorMessage = <any>error);

  }

  public onOpstinaSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      console.log(selected.originalObject.id);
      this.napuniMesta(selected.originalObject.id);
      this.selektovanaOpstina=selected.originalObject;
      console.log(this.korisnik);
    }
//    console.log(selected.originalObject);
  }
  public onMestoSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
//      console.log(selected.originalObject.id);
 //     this.napuniMesta(selected.originalObject.id);
      this.korisnik.mesto=selected.originalObject;
      this.korisnik.mesto.opstina=this.selektovanaOpstina;
      console.log(this.korisnik);
    }
//    console.log(selected.originalObject);
  }

  public onUlogaSelected(selectedId: number){
    console.log(selectedId);
    if(this.isUlogeLoaded) {
      for (var item of this.uloge) {
        if (item.id == selectedId) {
          console.log("Selektovana uloga"+item.naziv);
          this.korisnik.uloga = item;
          console.log("Upisana uloga"+this.korisnik.uloga.naziv);
        }
      }
    }

  }


}

