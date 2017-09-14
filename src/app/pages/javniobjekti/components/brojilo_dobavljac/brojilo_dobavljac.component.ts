import {Component, OnInit, Input, ViewChild} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {ModalDirective} from "ng2-bootstrap";
import {Objekat} from "../../../javniobjekti/components/objekti/objekatdata";
import {Korisnik} from "../korisnik/korisnikdata";
import {Brojilo} from "../racuni/racundata";
import {Dobavljac} from "../../../admin/components/dobavljac/dobavljacdata";

@Component({
  selector: 'isem-brojilo-dobavljac',
  template: require('./brojilo_dobavljac.component.html')
})
export class BrojiloDobavljacComponent implements OnInit{
  @Input() brojiloId: number;

  brojilo: Brojilo;
  noviDobavljac: Dobavljac;

  @ViewChild('childModal') childModal: ModalDirective;

  source: LocalDataSource = new LocalDataSource();

  izabraniDobavljaci : number[];

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
        title: 'Dobavljači',
        type: 'string'
      }
    }
  };

  myForm: FormGroup;

  isBrojiloDobavljacLoaded: Boolean = false;
  isNoviUnos: Boolean = false;
  postojiDobavljac: Boolean = false;
  idBrisanje: number;
  povezaniDobavljaci: Dobavljac[];

  constructor(protected crudService: CrudService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      id: [''],
      dobavljac: ['']
    });
  }

  ngOnInit(){
    this.getData();
  }

  upisiDobavljace(event){
    this.izabraniDobavljaci = event;

    for (let i in this.izabraniDobavljaci) {
      console.log(this.izabraniDobavljaci[i]);
      this.postojiDobavljac = false;

      for (let j in this.povezaniDobavljaci) {
        if (this.povezaniDobavljaci[j].id == this.izabraniDobavljaci[i]) {
          this.postojiDobavljac = true;
        }
      }

      if(!this.postojiDobavljac){

        this.noviDobavljac = new Dobavljac();

        this.crudService.getSingle("dobavljac/jedan?id="+this.izabraniDobavljaci[i]).subscribe(
          data => {
            this.brojilo.dobavljaci.push(data);

          },
          error => {console.log(error); }
        );

      }
    }
  }

  dodeliDobavljace(){
    this.isNoviUnos = false;
    this.onSubmit();
  }

  getData() {
    this.crudService.getSingle("brojilo/jedan?id="+this.brojiloId).subscribe(
      data => {this.brojilo = data;
        this.povezaniDobavljaci = this.brojilo.dobavljaci;
        this.source.load(this.brojilo.dobavljaci);
        this.isBrojiloDobavljacLoaded = true;},
      error => {console.log(error); }
    );
  }

  onSubmit() {

    this.crudService.sendData("brojilo", this.brojilo)
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
    this.brojilo.dobavljaci = this.brojilo.dobavljaci.filter(item => item.id !== this.idBrisanje);
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
