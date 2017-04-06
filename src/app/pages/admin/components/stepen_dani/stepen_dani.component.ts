import {Component, OnInit, ViewEncapsulation, EventEmitter} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {StepenDan, Opstina, Godina, Mesec} from "./stepen_danidata";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {Router} from "@angular/router";

@Component({
  selector: 'isem-stependani',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './stepen_dani.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class StepenDaniComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  stepenDan: StepenDan = new StepenDan();
  stepenDani: StepenDan[] = new Array<StepenDan>();
  selectedOpstina: Opstina;
  selectedGodina: Godina;
  selectedMesec: Mesec;

  private dataServiceOpstina: CompleterData;
  private dataServiceGodina: CompleterData;
  private dataServiceMesec: CompleterData;
  isOpstinaLoaded: boolean = false;
  isGodinaLoaded: boolean = false;
  isMesecLoaded: boolean = false;
  opstinaLoaded = new EventEmitter<Opstina>();
  godinaLoaded = new EventEmitter<Godina>();
  stepenDanaGodisnje: number;
  errorMessage:string;
  IDSelectedOpstina: number;
  IDSelectedGodina: number;
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
    pager: {
      perPage: 12
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

  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      stependan: [''],
      mesec: [''],
      version: ['']
    });
  }
  public onMesecSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      this.selectedMesec = selected.originalObject;
    }

  }

  napuniMesece (){
    this.crudService.getData("mesec/sve")
      .subscribe(
        listaMeseca => {
          console.log(listaMeseca);
          this.dataServiceMesec = this.completerService.local(listaMeseca, 'naziv', 'naziv');
          this.isMesecLoaded = true;
        },
        error => {console.log(error); this.router.navigate(['/login']);});

  }
  public onOpstinaSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      this.selectedOpstina = selected.originalObject;
      this.IDSelectedOpstina = selected.originalObject.id;
      this.stepenDanaGodisnje = 0;
      this.source.empty();
      while(this.stepenDani.length > 0) {
        this.stepenDani.pop();
      }
      if(this.selectedGodina!=null){
        console.log("EMITUJE OPSTINA AUTOOOOOOOOOOOOOOOOO");
        this.opstinaLoaded.emit(this.selectedOpstina);
      }


    }

  }

  napuniOpstine (){
    this.crudService.getData("opstina/sve")
      .subscribe(
        listaOpstina => {
          console.log(listaOpstina);
          this.dataServiceOpstina = this.completerService.local(listaOpstina, 'naziv', 'naziv');
          this.isOpstinaLoaded = true;
        },
        error => {console.log(error); this.router.navigate(['/login']);});

  }

  public onGodinaSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){

      this.IDSelectedGodina = selected.originalObject.id;
      this.selectedGodina = selected.originalObject;
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      console.log(this.selectedGodina);
      this.stepenDanaGodisnje = 0;
      this.source.empty();
      while(this.stepenDani.length > 0) {
        this.stepenDani.pop();
      }
      if(this.selectedOpstina!=null){
        console.log("EMITUJE GODINA AUTOOOOOOOOOOOOOOOOO");
        console.log("ID GODINE "+this.selectedGodina.id);
        this.godinaLoaded.emit(this.selectedGodina);
      }


    }

  }

  napuniGodine (){
    this.crudService.getData("godina/sve")
      .subscribe(
        listaGodina => {
          console.log(listaGodina);
          this.dataServiceGodina = this.completerService.local(listaGodina, 'naziv', 'naziv');
          this.isGodinaLoaded = true;
        },
        error => {console.log(error); this.router.navigate(['/login']);});

  }
  napuniStepenDane(){
    this.crudService.getData("stepen_dan/sve").subscribe(
      data => {


        for(var sd of data){
          // console.log("U Petlji");
          // console.log("ID GODINE U PETLJI " + sd.godina.id);
          // console.log("ID SELEKTOVANE GODINE " + this.selectedGodina.id);


          if(sd.godina.id == this.IDSelectedGodina && sd.opstina.id == this.IDSelectedOpstina){
            console.log("UPECANNNNNNNNNNNNNNNNNNNNNNNNNNNNN");
            this.stepenDani.push(sd);
            console.log(sd.sdIznos);
            this.stepenDanaGodisnje += sd.sdIznos;
          }
        }
        //this.stepenDani = data;
        this.source.load(this.stepenDani);
        console.log(data);
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getData() {

    this.opstinaLoaded.subscribe(
      selopstina => {
          this.napuniStepenDane();

      },
      error => console.log(error)
    );

    this.godinaLoaded.subscribe(
      selgodina => {
        this.napuniStepenDane();

      },
      error => console.log(error)
    );


  }

  naliranje() {
    this.stepenDan.id = null;
    this.stepenDan.opstina = null;
    this.stepenDan.mesec = null;
    this.stepenDan.sdIznos = null;
    this.stepenDan.version = null;
  }

  ngOnInit() {
    this.getData();
    this.napuniOpstine();
    this.napuniGodine();
    this.napuniMesece();
  }

  onCreate(): void{
    this.naliranje();
    this.izbor = true;
  }

  onEdit(event): void{
    this.naliranje();
    this.stepenDan = event.data;
//    this.selectedMesec = this.stepenDan.mesec;
    console.log("GGGGGGGGGGGGGGGGGGGGGG");
    console.log(this.stepenDan);
    this.izbor = true;


  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {
    console.log(this.selectedOpstina);
    this.stepenDan.opstina = this.selectedOpstina;
    this.stepenDan.godina = this.selectedGodina;
    this.stepenDan.mesec = this.selectedMesec;
    this.stepenDanaGodisnje = 0;

    console.log(this.stepenDan);

    this.crudService.sendData("stepen_dan", this.stepenDan)
      .subscribe(
        data => {
          console.log(data);
          this.source.empty();
          while(this.stepenDani.length > 0) {
            this.stepenDani.pop();
          }
          this.napuniStepenDane();
        },
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
        data => {
          console.log(data);
          this.source.empty();
          while(this.stepenDani.length > 0) {
            this.stepenDani.pop();
          }
          this.stepenDanaGodisnje = 0;
          this.napuniStepenDane();
        },
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
