import {Component, OnInit, ViewEncapsulation, ViewChild} from "@angular/core";
import {Kotlarnica} from "./kotlarnica.data";
import {ModalDirective} from "ng2-bootstrap";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {JavnoPreduzece} from "../../../admin/components/javno_preduzece/javno_preduzece.data";

import {PregledRacunaKotlarnicaComponent} from "../pregled_racuna/pregled_racuna.component";

@Component({
  selector: 'kotlarnica',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'kotlarnica.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class KotlarnicaComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild(PregledRacunaKotlarnicaComponent) pregledRacunaKotlarnica: PregledRacunaKotlarnicaComponent;


  kotlarnica: Kotlarnica;
  brisanjeId: number;
  izbor: boolean = false;
  isJavnoPredLoaded: boolean = false;
  javnaPred: JavnoPreduzece[];
  javnoPredId: number = 0;

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
      javnoPreduzece: {
        title: 'Javno preduzeće',
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
      napomena: {
        title: 'Napomena',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      javnoPreduzece: [''],
      opstina: [''],
      mesto: [''],
      adresa: [''],
      napomena: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
    this.getDataJavnoPred();
  }

  getData() {
    this.crudService.getData("kotlarnica/tab").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.kotlarnica = new Kotlarnica();
    this.javnoPredId = this.javnaPred[0].id;
    this.izbor = true;
  }

  onEdit(event): void{

    this.kotlarnica = new Kotlarnica();
    this.crudService.getSingle("kotlarnica/jedan?id="+event.data.id).subscribe(
      data => {this.kotlarnica = data;
        console.log(data);
        this.izbor = true;

        if (!this.kotlarnica.javnoPreduzece){
          this.javnoPredId = null;
        } else {
          this.javnoPredId = this.kotlarnica.javnoPreduzece.id;
        }

      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {

    if (this.isJavnoPredLoaded) {
      if (this.javnoPredId.toString() == "0: null") {
        this.kotlarnica.javnoPreduzece = null;
      } else {
        for (let item of this.javnaPred) {
          if (item.id == this.javnoPredId) {
            this.kotlarnica.javnoPreduzece = item;
          }
        }
      }
    }

    this.crudService.sendData("kotlarnica", this.kotlarnica)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.kotlarnica = new Kotlarnica();

  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("kotlarnica", this.brisanjeId)
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

  getDataJavnoPred() {
    this.crudService.getData("javno_pred/sve").subscribe(
      data => {this.javnaPred = data;
              console.log(data);
              this.isJavnoPredLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  public onJavnoPredSelected(selectedId: number) {
    console.log("ID selektovani je: " + selectedId);
  }

  onTabRacuniSelect(){
    this.pregledRacunaKotlarnica.getBrojila(this.kotlarnica.id);
  }

}
