import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {Router} from "@angular/router";
import {JavnoPreduzece} from "./javno_preduzece.data";
import {CompleterItem, CompleterData, CompleterService} from "ng2-completer";
import {Mesto, Opstina} from "../korisnik/korisnikdata";

@Component({
  selector: 'isem-javno-preduzece',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './javno_preduzece.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class JavnoPreduzeceComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  javnoPreduzece: JavnoPreduzece;
  brisanjeId: number;
  izbor: boolean = false;

  source: LocalDataSource = new LocalDataSource();

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
      naziv: {
        title: 'Naziv',
        type: 'string'
      },
      opstina: {
        title: 'Opština',
        type: 'string'
      },
      mesto: {
        title: 'Mesto',
        type: 'string'
      },
      adresa: {
        title: 'Adresa',
        type: 'string'
      },
      kontaktOsoba: {
        title: 'Kontakt osoba',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      opstina: [''],
      mesto: [''],
      adresa: [''],
      koIme: [''],
      koPrezime: [''],
      koZanimanje: [''],
      koTel: [''],
      koFaks: [''],
      koMob: [''],
      koMail: [''],
      version: ['']
    });
  }

  getData() {
    this.crudService.getData("javno_pred/tab").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  ngOnInit() {
    this.getData();
    this.getOpstine();
  }

  onCreate(): void{

    this.javnoPreduzece = new JavnoPreduzece();

    this.javnoPreduzece.mesto = new Mesto();
    this.javnoPreduzece.mesto.opstina = new Opstina();

    this.selectedOpstina = "-- Opština --";
    this.selectedMesto = "-- Mesto --";

    this.izbor = true;
  }

  onEdit(event): void{

    this.javnoPreduzece = new JavnoPreduzece();
    this.crudService.getSingle("javno_pred/jedan?id="+event.data.id).subscribe(
      data => {this.javnoPreduzece = data;
        console.log(data);
        this.izbor = true;
        this.selectedMesto = this.javnoPreduzece.mesto.naziv;
        this.selectedOpstina = this.javnoPreduzece.mesto.opstina.naziv;
        },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {

    this.crudService.sendData("javno_pred", this.javnoPreduzece)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.javnoPreduzece = new JavnoPreduzece();

  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("javno_pred", this.brisanjeId)
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
      this.javnoPreduzece.mesto=selected.originalObject;

      console.log(this.javnoPreduzece);
    }
  }

}

