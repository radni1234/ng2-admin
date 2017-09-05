import {Component, OnInit, Input, ViewChild} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {ModalDirective} from "ng2-bootstrap";
import {KorisnikObjekat, KorisnikObjekatView} from "./korisnik_objekat.data";
import {Objekat} from "../../../javniobjekti/components/objekti/objekatdata";
import {Korisnik, User} from "../korisnik/korisnikdata";

@Component({
  selector: 'korisnik-objekat',
  template: require('./korisnik_objekat.component.html')
})
export class KorisnikObjekatComponent implements OnInit{
  @Input() korisnikId: number;

  korisnik: Korisnik;
  noviObjekat: Objekat;

  @ViewChild('childModal') childModal: ModalDirective;

  source: LocalDataSource = new LocalDataSource();

  izabraniObjekti : number[];

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>'
    },
    edit: {
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>'
    },
    mode: 'external',
    actions: {
      columnTitle: '',
      edit:false,
    },
    noDataMessage: 'Podaci nisu pronađeni',
    columns: {
      naziv: {
        title: 'Objekat',
        type: 'string'
      }
    }
  };

  myForm: FormGroup;

  isKorisnikObjekatLoaded: Boolean = false;
  isNoviUnos: Boolean = false;
  postojiObjekat: Boolean = false;
  idBrisanje: number;
  povezaniObjekti: Objekat[];

  constructor(protected crudService: CrudService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      id: [''],
      objekat: ['']
    });
  }

  ngOnInit(){
     this.getData();
  }

  upisiObjekte(event){
    this.izabraniObjekti = event;

    for (let i in this.izabraniObjekti) {
      console.log(this.izabraniObjekti[i]);
      this.postojiObjekat = false;

      for (let j in this.povezaniObjekti) {
        if (this.povezaniObjekti[j].id == this.izabraniObjekti[i]) {
          this.postojiObjekat = true;
        }
      }

      if(!this.postojiObjekat){

        this.noviObjekat = new Objekat();

        this.crudService.getSingle("objekat/jedan?id="+this.izabraniObjekti[i]).subscribe(
          data => {
            this.korisnik.objekti.push(data);

          },
          error => {console.log(error); }
        );

      }
    }
  }

  dodeliObjekte(){
    this.isNoviUnos = false;
    this.onSubmit();
  }

  getData() {
    this.crudService.getSingle("korisnik/jedan?id="+this.korisnikId).subscribe(
      data => {this.korisnik = data;
      this.povezaniObjekti = this.korisnik.objekti;
      this.source.load(this.korisnik.objekti);
      this.isKorisnikObjekatLoaded = true;},
      error => {console.log(error); }
    );
  }

  onSubmit() {

    this.crudService.sendData("korisnik", this.korisnik)
      .subscribe(
        data => {
          console.log(data);
          this.getData();
        },
        error => console.log(error)
      );

  }

  onCreate(){
    this.isNoviUnos = true;
  }

  onDelete(event){
    this.idBrisanje = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.korisnik.objekti = this.korisnik.objekti.filter(item => item.id !== this.idBrisanje);
    this.onSubmit();
    this.hideChildModal();
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }
}
