import {ModalDirective} from "ng2-bootstrap";
import {Component, ViewChild, ViewEncapsulation, Input} from "@angular/core";
import {Kotao} from "./kotao.data";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {Kotlarnica} from "../kotlarnica/kotlarnica.data";

@Component({
  selector: 'isem-kotao',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'kotao.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class KotaoComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() kotlarnica: Kotlarnica;

  kotao: Kotao = new Kotao();
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
      tip: {
        title: 'Tip',
        type: 'string'
      },
      proizvodjac: {
        title: 'Proizvođač',
        type: 'string'
      },
      godinaProizvodnje: {
        title: 'Godina proizvodnje',
        type: 'string'
      },
      nominalnaSnaga: {
        title: 'Nominalna snaga',
        type: 'string'
      },
      gorionikTip: {
        title: 'Tip gorionika',
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
      kotlarnica: [''],
      tip: [''],
      proizvodjac: [''],
      godinaProizvodnje: [''],
      nominalnaSnaga: [''],
      stepenKorisnosti: [''],
      gorionikTip: [''],
      gorionikProizvodjac: [''],
      nominalnaSnagaGorionika: [''],
      godinaProizvodnjeGorionika: [''],
      radniPritisak: [''],
      tempVodeNaPotisnomVodu: [''],
      tempVodeNaPovratnomVodu: [''],
      regulacijaKotla: [''],
      napomena: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("kotao/sve?kotlarnica_id="+this.kotlarnica.id).subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.kotao = new Kotao();
    this.izbor = true;
  }

  onEdit(event): void{

    this.kotao = new Kotao();
    this.crudService.getSingle("kotao/jedan?id="+event.data.id).subscribe(
      data => {this.kotao = data;
        console.log(data);
        this.izbor = true;
      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {
    this.kotao.kotlarnica = this.kotlarnica;

    this.crudService.sendData("kotao", this.kotao)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.kotao = new Kotao();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("kotao", this.brisanjeId)
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
