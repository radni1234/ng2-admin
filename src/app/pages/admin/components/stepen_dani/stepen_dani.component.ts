import {Component, OnInit, ViewEncapsulation, EventEmitter} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {StepenDan, Opstina, Godina} from "./stepen_danidata";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';

@Component({
  selector: 'isem-stependani',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './stepen_dani.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class StepenDaniComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  stepenDani: StepenDan[];
  selectedOpstina: Opstina;
  selectedGodina: Godina;
  private dataServiceOpstina: CompleterData;
  private dataServiceGodina: CompleterData;
  isOpstinaLoaded: boolean = false;
  isGodinaLoaded: boolean = false;
  opstinaLoaded = new EventEmitter<Opstina>();
  godinaLoaded = new EventEmitter<Godina>();
  errorMessage:string;
  jedinicaMere = {
    id: null,
    naziv: null,
    version: null
  };

  brisanjeId: number;
  izbor: boolean = false;

  source: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>'
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>'
    },
    mode: 'external',
    actions: {
      columnTitle: ''
    },
    noDataMessage: 'Podaci nisu pronađeni',
    columns: {
      godina: {
        title: 'Godina',
        valuePrepareFunction: (value) => { return value.naziv},
        type: 'string'
      },
      mesec: {
        title: 'Mesec',
        valuePrepareFunction: (value) => { return value.naziv},
        type: 'string'
      },
      opstina: {
        title: 'Opstina',
        valuePrepareFunction: (value) => { return value.naziv},
        type: 'string'
      },
      sdIznos: {
        title: 'Stepen dani',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      version: ['']
    });
  }
  public onOpstinaSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      this.selectedOpstina = selected.originalObject;
      this.opstinaLoaded.emit(this.selectedOpstina);
    }

  }

  napuniOpstine (){
    this.crudService.getData("opstina")
      .subscribe(
        listaOpstina => {
          console.log(listaOpstina);
          this.dataServiceOpstina = this.completerService.local(listaOpstina, 'naziv', 'naziv');
          this.isOpstinaLoaded = true;
        },
        error => this.errorMessage = <any>error);

  }

  public onGodinaSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      this.selectedGodina = selected.originalObject;
      console.log("GGGGGGGGGGGGGGGGGGGGGGGG" + this.selectedGodina.id);
      this.godinaLoaded.emit(this.selectedGodina);
    }

  }

  napuniGodine (){
    this.crudService.getData("godina")
      .subscribe(
        listaGodina => {
          console.log(listaGodina);
          this.dataServiceGodina = this.completerService.local(listaGodina, 'naziv', 'naziv');
          this.isGodinaLoaded = true;
        },
        error => this.errorMessage = <any>error);

  }

  getData() {

    this.opstinaLoaded.subscribe(
      selopstina => {
        console.log("OPSTINA SELEKTOVANA");
        this.godinaLoaded.subscribe(
          selgodina => {
            console.log("GODINA SELEKTOVANA");
            this.crudService.getData("stepen_dan").subscribe(
              data => {

                console.log("ID SELEKTOVANE GODINE" + selopstina.id);
                for(var sd of data){
                  console.log("U Petlji");
                  console.log("ID GODINE U PETLJI" + sd.godina.id);


                  if(sd.godina.id==selopstina.id && sd.opstina.id ==selgodina.id){
                    console.log("UPECANNNNNNNN");
                    this.stepenDani.push(sd);
                  }
                }
                //this.stepenDani = data;
                this.source.load(data);
                console.log(data);
              },
              error => console.log(error)
            );
          },
          error => this.errorMessage = <any>error);
      },
      error => this.errorMessage = <any>error);


  }

  naliranje() {
    this.jedinicaMere.id = null;
    this.jedinicaMere.naziv = null;
    this.jedinicaMere.version = null;
  }

  ngOnInit() {
    this.getData();
    this.napuniOpstine();
    this.napuniGodine();
  }

  onCreate(): void{
    this.naliranje();
    this.izbor = true;
  }

  onEdit(event): void{
    this.jedinicaMere = event.data;
    this.izbor = true;
    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit(objekat) {

    this.crudService.sendData("stepen_dan", objekat)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.naliranje();
  }

  onDelete(event){
    this.brisanjeId = event.data.id
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("stepen_dan", this.brisanjeId)
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
