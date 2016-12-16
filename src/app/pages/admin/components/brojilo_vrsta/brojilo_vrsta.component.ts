import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocalDataSource} from 'ng2-smart-table';
import {CrudService} from '../../../services/crud.service';
import {ViewChild} from "@angular/core/src/metadata/di";
import {ModalDirective} from "ng2-bootstrap";
import {VrstaBrojila, EnergentTip} from "./brojilo_vrstadata";

@Component({
  selector: 'isem-vrstabrojila',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'brojilo_vrsta.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class BrojiloVrstaComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;

  vrstaBrojila: VrstaBrojila = new VrstaBrojila();
  isVrstaBrojilaLoaded: boolean = true;
  tipoviEnergenta: EnergentTip[];
  isTipEnergentaLoaded: boolean = false;
  energentTipId: number;
  isKreiranjeNovogEnergenta: boolean = true;

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
      energentTip: {
        title: 'Tip energenta',
        valuePrepareFunction: (value) => {
          return value.naziv
        },
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      energentTip: [''],
      version: ['']
    });

    this.getData();
    this.getTipoveEnergenta();

  }

  getData() {
    this.crudService.getData("brojilo_vrsta").subscribe(
      data => {this.source.load(data);
        console.log(data);
        this.isVrstaBrojilaLoaded = true;
      },
      error => console.log(error)
    );
  }

  getTipoveEnergenta() {
    this.crudService.getData("energent_tip").subscribe(
      data => {
        this.tipoviEnergenta = data;
        console.log(data);
        this.isTipEnergentaLoaded = true;
      },
      error => console.log(error)
    );
  }

  public onEnergentTipSelected(selectedId: number){
    console.log(selectedId);
    if(this.isTipEnergentaLoaded) {
      for (var item of this.tipoviEnergenta) {
        if (item.id == selectedId) {
          console.log("Selektovana uloga"+item.naziv);
          this.vrstaBrojila.energentTip = item;
          console.log("Upisan tip energenta"+this.vrstaBrojila.energentTip.naziv);
        }
      }
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
    this.vrstaBrojila = new VrstaBrojila();
    this.vrstaBrojila.energentTip = this.tipoviEnergenta[0];
        //this.dobavljac = null;
    //this.isKreiranjeNovogEnergenta = true;
    this.izbor = true;
  }

  onEdit(event): void{
    this.vrstaBrojila = new VrstaBrojila();
    this.vrstaBrojila = event.data;
    //this.energentTipId = this.dobavljac.energentTip.id;
    //this.jedinicaMereId = this.dobavljac.jedMere.id;
    this.izbor = true;
    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.vrstaBrojila = null;
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
      console.log();

    this.crudService.sendData("brojilo_vrsta", this.vrstaBrojila)
      .subscribe(
        data => {
          console.log(data);
          this.getData();
        },
        error => console.log(error)
      );

    this.izbor = false;
    this.vrstaBrojila = null;
  }

  onDelete(event){
    this.brisanjeId = event.data.id
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("brojilo_vrsta", this.brisanjeId)
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
