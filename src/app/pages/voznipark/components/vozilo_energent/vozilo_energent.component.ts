import {Component, OnInit, Input, ViewChild} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {ModalDirective} from "ng2-bootstrap";
import {Vozilo} from "../vozilo/vozilo.data";
import {Energent} from "../../../admin/components/energent/energentdata";
import { IMultiSelectTexts, IMultiSelectSettings, IMultiSelectOption } from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import {Router} from "@angular/router";

@Component({
  selector: 'isem-vozilo-energent',
  template: require('./vozilo_energent.component.html')
})
export class VoziloEnegentComponent implements OnInit{
  @Input() voziloId: number;
  vozilo: Vozilo;

  @ViewChild('childModal') childModal: ModalDirective;

  source: LocalDataSource = new LocalDataSource();
  myForm: FormGroup;

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
        title: 'Energent',
        type: 'string'
      }
    }
  };

  isVoziloLoaded: Boolean = false;
  isNoviUnos: Boolean = false;
  postojiEnergent: Boolean = false;
  idBrisanje: number;
  povezaniEnergenti: Energent[];
  izabraniEnergenti : number[];
  noviEnergent: Energent;


  isEneLoaded: boolean;

  eneData: IMultiSelectOption[];

  eneIzbor: number[] = [];

  mySettingsEne: IMultiSelectSettings = {
    pullRight: true,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: true,
    showUncheckAll: true,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  };

  myTextsEne: IMultiSelectTexts = {
    checkAll: 'Uključi sve',
    uncheckAll: 'Isključi sve',
    checked: 'odabrano',
    checkedPlural: 'odabrano',
    searchPlaceholder: 'Pretraga...',
    defaultTitle: 'Izaberite energente',
  };


  constructor(protected crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      energent: ['']
    });
  }

  ngOnInit(){
    this.getData();
    this.getEnergent();
  }

  dodeliEnergente(){
    this.izabraniEnergenti = this.eneIzbor;

    for (let i in this.izabraniEnergenti) {
      console.log("this.izabraniEnergenti[i]");
      console.log(this.izabraniEnergenti[i]);
      this.postojiEnergent = false;

      for (let j in this.povezaniEnergenti) {
        if (this.povezaniEnergenti[j].id == this.izabraniEnergenti[i]) {
          this.postojiEnergent = true;
        }
      }

      if(!this.postojiEnergent){
        console.log("dodavanje");
        this.noviEnergent = new Energent();

        this.crudService.getSingle("energent/jedan?id="+this.izabraniEnergenti[i]).subscribe(
          data => {
            this.vozilo.energenti.push(data);
            console.log("push");
            console.log(JSON.stringify(this.vozilo));
            this.onSubmit();
          },
          error => {console.log(error); }
        );

      }
    }

    console.log("pre submit");
    console.log(JSON.stringify(this.vozilo));
    this.isNoviUnos = false;

  }

  getData() {
    this.crudService.getSingle("vozilo/jedan?id="+this.voziloId).subscribe(
      data => {this.vozilo = data;
        this.povezaniEnergenti = this.vozilo.energenti;
        this.source.load(this.vozilo.energenti);
        this.isVoziloLoaded = true;},
      error => {console.log(error); }
    );
  }

  getEnergent() {
    this.crudService.getData("energent/lov_vozilo").subscribe(
      data => {
        this.eneData = data;
        console.log(data);

        this.isEneLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onChangeEne() {
    console.log(this.eneIzbor);
  }

  onSubmit() {
    console.log("submit");
    console.log(JSON.stringify(this.vozilo));
    this.crudService.sendData("vozilo", this.vozilo)
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
    this.vozilo.energenti = this.vozilo.energenti.filter(item => item.id !== this.idBrisanje);
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
