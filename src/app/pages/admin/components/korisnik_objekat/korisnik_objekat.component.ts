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
      objekat: {
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
  korisnikObjekat: KorisnikObjekat;
  povezaniObjekti: KorisnikObjekatView[];

  constructor(protected crudService: CrudService, private fb: FormBuilder) {
    console.log("korisnik konst " + this.korisnikId);
    this.myForm = this.fb.group({
      id: [''],
      objekat: ['']
    });
  }

  ngOnInit(){
    console.log("korisnik init " + this.korisnikId);
    this.getData();
  }

  upisiObjekte(event){
    this.izabraniObjekti = event;
  }

  dodeliObjekte(){

    for (let i in this.izabraniObjekti) {
      console.log(this.izabraniObjekti[i]);
      this.postojiObjekat = false;

      for (let j in this.povezaniObjekti) {
        if (this.povezaniObjekti[j].objekatId == this.izabraniObjekti[i]) {
          this.postojiObjekat = true;
        }
      }

      if(!this.postojiObjekat){

        this.korisnikObjekat = new KorisnikObjekat();
        this.korisnikObjekat.objekat = new Objekat();
        this.korisnikObjekat.korisnik = new User();

        this.korisnikObjekat.objekat.id = this.izabraniObjekti[i];
        this.korisnikObjekat.korisnik.id = this.korisnikId;
        this.korisnikObjekat.version = 0;
        this.korisnikObjekat.objekat.version = 0;
        this.korisnikObjekat.korisnik.version = 0;

        this.crudService.sendData("kor_obj", this.korisnikObjekat)
          .subscribe(
            data => {console.log(data); this.getData();},
            error => console.log(error)
          );
      }
    }
    this.isNoviUnos = false;
  }

  getData() {
    this.crudService.getData("kor_obj/tab?kor_id="+this.korisnikId).subscribe(
      data => {this.source.load(data); this.povezaniObjekti = data; this.isKorisnikObjekatLoaded = true;},
      error => {console.log(error); }
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
    this.crudService.delete("kor_obj", this.idBrisanje)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.hideChildModal();
  }

  showChildModal(): void {
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }
}
