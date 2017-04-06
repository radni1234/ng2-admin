import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {Dobavljac, Mesto, Opstina} from "./dobavljacdata";
import {CompleterData, CompleterService, CompleterItem} from 'ng2-completer';
import {Router} from "@angular/router";

@Component({
  selector: 'isem-dobavljac',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'dobavljac.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class DobavljacComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  dobavljac: Dobavljac = new Dobavljac();
  isDobavljacLoaded: boolean = true;
  energentTipId: number;
  isKreiranjeNovogEnergenta: boolean = true;

  mesta: Mesto[];
  isMestaLoaded: boolean = false;
  selectedMesto: string;
  jedinicaMereId: number;
  private dataServiceMesta: CompleterData;

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
      naziv: {
        title: 'Naziv',
        type: 'string'
      },
      mesto: {
        title: 'Mesto',
//        valuePrepareFunction: (value) => { return value.naziv },
        type: 'string'
      },
      tel: {
        title: 'Telefon',
        type: 'string'
      },
      mail: {
        title: 'Mail',
        type: 'string'
      },
      web: {
        title: 'Web',
        type: 'string'
      }

    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      mesto: [''],
      tel: [''],
      mail: [''],
      web: [''],
      version: ['']
    });

    this.getData();
    this.getMesta();
  }

  getData() {
    this.crudService.getData("dobavljac/tab").subscribe(
      data => {this.source.load(data);
        console.log(data);
        this.isDobavljacLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  getMesta() {
    this.crudService.getData("mesto/sve").subscribe(
      data => {
        this.mesta = data;
        console.log(data);
        this.dataServiceMesta = this.completerService.local(this.mesta, 'naziv', 'naziv');
        this.isMestaLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  public onMestoSelected(selected: CompleterItem) {
    console.log(selected);
    if(selected!==null){
      this.dobavljac.mesto=selected.originalObject;
   //   this.korisnik.mesto.opstina=this.selektovanaOpstina;
      console.log(this.dobavljac);
    }
  }

  naliranje() {
    // this.dobavljac.id = null;
    // this.jedinicaMereId = null;
    // this.energentTipId = null;
    // this.dobavljac.naziv = null;
    // this.dobavljac.version = null;
    //this.dobavljac = null;
  }

  ngOnInit() {

  }

  onCreate(): void{
    this.dobavljac = new Dobavljac();

    this.dobavljac.mesto = this.mesta[0];
    this.selectedMesto = "Biraj mesto";
    //this.dobavljac = null;
    //this.isKreiranjeNovogEnergenta = true;
    this.source.setFilter([{ field: 'naziv', search: '' },{ field: 'mesto', search: '' }]);
    this.izbor = true;
  }

  onEdit(event): void{
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    this.dobavljac = new Dobavljac();
    // this.dobavljac = event.data;
    // for(var item of this.mesta){
    //   if(event.data.mesto == item.naziv){
    //     this.dobavljac.mesto = item;
    //     this.selectedMesto = item.naziv;
    //   }
    // }
    this.crudService.getSingle('dobavljac/jedan?id=' +  event.data.id)
      .subscribe(
        data => {
          console.log(data);
          this.dobavljac = data;
          this.selectedMesto = this.dobavljac.mesto.naziv;
        },
        error => {console.log(error); this.router.navigate(['/login']);}
      );

    console.log(this.dobavljac);
    //this.energentTipId = this.dobavljac.energentTip.id;
    //this.jedinicaMereId = this.dobavljac.jedMere.id;
    this.izbor = true;
    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.dobavljac = null;
    this.getData();
    //this.naliranje();
    this.izbor = false;
  }

  onSubmit() {


      // for(var item of this.opstine){
      //   if(item.id==this.energentTipId){
      //     this.dobavljac.energentTip = item;
      //   }
      // }
      // for(var item of this.mesta){
      //   if(item.id==this.jedinicaMereId){
      //     this.dobavljac.jedMere = item;
      //   }
      // }

      // this.dobavljac.emisija = 4;
      // this.dobavljac.version = 0;
      // console.log(this.dobavljac);
      console.log(this.dobavljac);

    this.crudService.sendData("dobavljac", this.dobavljac)
      .subscribe(
        data => {
          console.log(data);
          this.getData();
        },
        error => console.log(error)
      );

    this.izbor = false;
    this.dobavljac = null;
  }

  onDelete(event){
    this.brisanjeId = event.data.id
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("dobavljac", this.brisanjeId)
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
