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
// import {KorisniciService} from "./korisnici.services";
import {LocalDataSource} from "ng2-smart-table/build/ng2-smart-table";
import { Uloga, Opstina, Mesto} from "./korisnikdata";
import { Router} from '@angular/router';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {CrudService} from "../../../services/crud.service";



@Component({
  selector: 'korisnik',
  templateUrl: 'korisnik.html',
  styles: [require('./modals.scss')],
})
export class Korisnik implements OnInit{

  private isRemember: number;
  id:string;
  selectedOpstina: string;
  selectedMesto: string;
  selektovanaOpstina: Opstina;
  myForm:FormGroup;
  korisnik;
  // : Korisnik = new Korisnik();
  uloge: Uloga[];
  private opstine: Opstina[];
  private mesta: Mesto[];
  private opstina: Opstina;
  private mesto: Mesto;
  private uloga: Uloga;
  private ulogaId: number;
  public isUlogeLoaded:boolean = false;
  public isDataLoaded:boolean = false;
  public isMestaLoaded:boolean = false;
  public isKorisnikLoaded:boolean = false;



  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
    };

  errorMessage:string;
  source:LocalDataSource = new LocalDataSource();
  private ime: string;
  private opstinaNaziv: string;
  private searchStr: string;
  private dataService: CompleterData;
  private dataServiceMesta: CompleterData;


  constructor(private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute, protected service:CrudService,
              private router: Router, private completerService: CompleterService
  ) {
    // this.isRemember = 0;
    //
    // this.id = activatedRoute.snapshot.params['id'];
    //
    // console.log('Routin parametar: '+this.id);
    // if (this.id==null){
    //   this.selektovanaOpstina = new Opstina();
    //   this.selektovanaOpstina.naziv = "Ada";
    //   this.opstina = new Opstina();
    //   this.opstina.naziv = "Ada";
    //   this.mesto = new Mesto();
    //   this.mesto.naziv = "Ada";
    //   this.uloga = new Uloga();
    //   this.uloga.naziv = "Korisnik";
    //   this.mesto.opstina = this.opstina;
    //
    //   this.korisnik = new Korisnik();
    //
    //   this.korisnik.mesto = this.mesto;
    //   this.korisnik.uloga = this.uloga;
    //   this.isKorisnikLoaded = true;
    //   console.log(this.korisnik);
//     }
//     this.service.getListaUloga()
//       .subscribe(
//         listaUloga => {
//
//           this.uloge = listaUloga;
//           this.isUlogeLoaded = true;
// //        console.log(this.uloge[1]);
//         },
//         error => this.errorMessage = <any>error);
//
//
//     if(this.id!=null){
//
//       this.service.getKorisnik(this.id)
//         .subscribe(
//           korisnik => {
//             this.korisnik = korisnik;
//             this.ulogaId = korisnik.uloga.id;
//             this.selektovanaOpstina = korisnik.mesto.opstina;
//
//             this.isKorisnikLoaded = true;
//             this.napuniMesta(korisnik.mesto.opstina.id);
//           },
//           error => this.errorMessage = <any>error);
//
//     }


  }

  // odlazi() {
  //   this.router.navigate(['/pages/admin/korisnik']);
  // }
  // onDateChangedRacun(event:any) {
  //   console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  //   this.korisnik.alarmRacunStart = event.formatted;
  // }
  //
  // onDateChangedTrend(event:any) {
  //   console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  //   this.korisnik.alarmTrendStart = event.formatted;
  // }
  // onChangeRacun(event:any){
  //   console.log(event);
  //   var d = new Date();
  //   var curr_date = d.getDate();
  //   var curr_date_string;
  //   if (curr_date < 10 ){
  //     curr_date_string = "0" + curr_date;
  //     console.log(curr_date_string);
  //   }
  //   else{
  //     curr_date_string = curr_date;
  //   }
  //   var curr_month = d.getMonth() + 1; //Months are zero based
  //   var curr_month_string;
  //   if (curr_month < 10 ){
  //     curr_month_string = "0" + curr_month;
  //   }
  //   else{
  //     curr_month_string = curr_month;
  //   }
  //   var curr_year = d.getFullYear();
  //   var date = curr_date_string + "." + curr_month_string + "." + curr_year;
  //   if(event == true){
  //     this.korisnik.alarmRacunStart = date;
  //      }
  //
  // }
  // onChangeTrend(event:any){
  //   console.log(event);
  //   var d = new Date();
  //   var curr_date = d.getDate();
  //   var curr_date_string;
  //   if (curr_date < 10 ){
  //     curr_date_string = "0" + curr_date;
  //     console.log(curr_date_string);
  //   }
  //   else{
  //     curr_date_string = curr_date;
  //   }
  //   var curr_month = d.getMonth() + 1; //Months are zero based
  //   var curr_month_string;
  //   if (curr_month < 10 ){
  //     curr_month_string = "0" + curr_month;
  //   }
  //   else{
  //     curr_month_string = curr_month;
  //   }
  //   var curr_year = d.getFullYear();
  //   var date = curr_date_string + "." + curr_month_string + "." + curr_year;
  //   if(event == true){
  //     this.korisnik.alarmTrendStart = date;
  //   }
  //
  // }


  ngOnInit() {

    // this.myForm = new FormGroup({
    //   id: new FormControl(),
    //   opstina: new FormGroup({
    //     id: new FormControl(''),
    //     naziv: new FormControl(''),
    //   }),
    //   uloga: new FormGroup({
    //     id: new FormControl(''),
    //     naziv: new FormControl('')
    //   }),
    //   mesto: new FormGroup({
    //     id: new FormControl(''),
    //     naziv: new FormControl(''),
    //   }),
    //   username: new FormControl(),
    //   naziv: new FormControl(),
    //   tel: new FormControl('',Validators.required),
    //   fax: new FormControl(),
    //   mob: new FormControl(),
    //   mail: new FormControl('',[Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
    //   alarmRacun: new FormControl(),
    //   alarmRacun1: new FormControl(),
    //   alarmRacunStart: new FormControl(),
    //   alarmTrend: new FormControl(),
    //   alarmTrendStart: new FormControl(),
    //   password: new FormControl()
    //
    //
    // })
    // this.service.getListaOpstina()
    //   .subscribe(
    //     listaOpstina => {
    //       this.opstine = listaOpstina;
    //       console.log(this.opstine);
    //       this.dataService = this.completerService.local(this.opstine, 'naziv', 'naziv');
    //       this.isDataLoaded = true;
    //     },
    //     error => this.errorMessage = <any>error);
  }

  // onSubmit(){
  //   console.log(this.korisnik);
  //   this.service.sendKorisnik(this.korisnik).subscribe(
  //     data=> {
  //       console.log(data);
  //       this.router.navigate(['/pages/admin/korisnik']);
  //     }
  //   );
  //
  // }
  //
  // napuniMesta (id: number){
  //   this.service.getListaMesta(id)
  //     .subscribe(
  //            listaMesta => {
  //              this.mesta = listaMesta;
  //              console.log(this.mesta);
  //              this.dataServiceMesta = this.completerService.local(this.mesta, 'naziv', 'naziv');
  //              this.isMestaLoaded = true;
  //            },
  //       error => this.errorMessage = <any>error);
  //
  // }
  //
  // public onOpstinaSelected(selected: CompleterItem) {
  //   console.log(selected);
  //   if(selected!==null){
  //     console.log(selected.originalObject.id);
  //     this.napuniMesta(selected.originalObject.id);
  //     this.selektovanaOpstina=selected.originalObject;
  //     this.selectedMesto = "Biraj mesto";
  //     console.log(this.korisnik);
  //   }
  // }
  // public onMestoSelected(selected: CompleterItem) {
  //   console.log(selected);
  //   if(selected!==null){
  //     this.korisnik.mesto=selected.originalObject;
  //     this.korisnik.mesto.opstina=this.selektovanaOpstina;
  //     console.log(this.korisnik);
  //   }
  // }
  // public onUlogaSelected(selectedId: number){
  //   console.log(selectedId);
  //   if(this.isUlogeLoaded) {
  //     for (var item of this.uloge) {
  //       if (item.id == selectedId) {
  //         console.log("Selektovana uloga"+item.naziv);
  //         this.korisnik.uloga = item;
  //         console.log("Upisana uloga"+this.korisnik.uloga.naziv);
  //       }
  //     }
  //   }
  //
  // }


}

