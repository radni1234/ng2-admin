import {Component, ViewEncapsulation, ViewChild, OnInit, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {ProizvodnjaVode} from "./proizvodnja_vode.data";
import {Vodozahvat} from "../vodozahvat/vodozahvat.data";
import {DatePipe} from "@angular/common";
import {MesecLista} from "../../../javniobjekti/components/racuni/racundata";
import {DatumService} from "../../../services/datum.service";


@Component({
  selector: 'isem-proizvodnja-vode',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'proizvodnja_vode.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class ProizvodnjaVodeComponent implements OnInit  {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() vodozahvat: Vodozahvat;

  proizvodnjaVode: ProizvodnjaVode = new ProizvodnjaVode();
  brisanjeId: number;
  izbor: boolean = false;

  source: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;

  provera: any = 0;
  datePipe = new DatePipe();

  godine: number [] = new Array <number>();
  godina: number;
  brojGodinaUMeniju: number = 10;

  mesec: MesecLista = new MesecLista();
  meseci: Array<any> = [ {"id":0, "naz":"Januar"},
    {"id":1, "naz":"Februar"},
    {"id":2, "naz":"Mart"},
    {"id":3, "naz":"April"},
    {"id":4, "naz":"Maj"},
    {"id":5, "naz":"Jun"},
    {"id":6, "naz":"Jul"},
    {"id":7, "naz":"Avgust"},
    {"id":8, "naz":"Septembar"},
    {"id":9, "naz":"Oktobar"},
    {"id":10, "naz":"Novembar"},
    {"id":11, "naz":"Decembar"}
  ];

  stariMesec: number;
  staraGodina: number;

  datumRacuna: Date = new Date();

  noviRn: boolean = false;

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
        type: 'string'
      },
      mesec: {
        title: 'Mesec',
        type: 'string'
      },
      proizvodnja: {
        title: 'Proizvodnja',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private ds: DatumService, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      datum: [''],
      godina: [''],
      mesec: [''],
      proizvodnja: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("proizvodnja_vode/tab?vodozahvat_id=" + this.vodozahvat.id).subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.proizvodnjaVode = new ProizvodnjaVode();
    this.proizvodnjaVode.vodozahvat = this.vodozahvat;
    this.popuniGodinaMesec(new Date());
    this.noviRn = true;
    this.izbor = true;
  }

  onEdit(event): void{
    this.proizvodnjaVode = new ProizvodnjaVode();
    this.crudService.getSingle("proizvodnja_vode/jedan?id="+event.data.id).subscribe(
      data => {this.proizvodnjaVode = data;
        // this.datum = this.proizvodnjaVode.datum;
        console.log(data);

        this.datumRacuna = this.ds.toDate(this.proizvodnjaVode.datum);

        this.popuniGodinaMesec(this.datumRacuna);

        this.stariMesec = this.datumRacuna.getMonth();
        this.staraGodina = this.datumRacuna.getFullYear();

        this.noviRn = false;
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
    this.proizvodnjaVode.datum = this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy');

    this.crudService.sendData("proizvodnja_vode", this.proizvodnjaVode)
      .subscribe(
        data => {console.log(data);
                this.getData();
                },
        error => console.log(error)
      );

    this.izbor = false;
    this.noviRn = false;
    this.proizvodnjaVode = new ProizvodnjaVode();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("proizvodnja_vode", this.brisanjeId)
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

  napuniGodine(){
    let datum = new Date();
    let godina = datum.getFullYear();
    for(var i = 0; i < this.brojGodinaUMeniju; i++){
      this.godine.push(godina - i);
    }

  }

  public onGodinaSelected(selectedGodina: number){
    this.provera = 0;
    this.datumRacuna.setFullYear(selectedGodina);

    if (this.noviRn || (!this.noviRn && (this.godina != this.staraGodina || this.mesec.id != this.stariMesec))) {
      this.proveriRacun("proizvodnja_vode/provera?datum="+this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy')+"&vodozahvat_id="+this.vodozahvat.id);
    }

  }

  public onMesecSelected(selectedMesec: number){
    this.provera = 0;
    this.datumRacuna.setMonth(selectedMesec);
    this.datumRacuna.setDate(15);

    if (this.noviRn || (!this.noviRn && (this.godina != this.staraGodina || this.mesec.id != this.stariMesec))) {
      this.proveriRacun("proizvodnja_vode/provera?datum="+this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy')+"&vodozahvat_id="+this.vodozahvat.id);
    }

  }

  popuniGodinaMesec(datum: Date){
    this.mesec.id = datum.getMonth();

    if(this.godine.length==0) {
      this.napuniGodine();
    }

    for (var item of this.godine) {
      if (item == datum.getFullYear()) {
        this.godina = item;
      }
    }
  }

  proveriRacun(url: string){

    this.crudService.getData(url).subscribe(
      data => {
        this.provera = data;
      },
      error => console.log(error)
    );

  }
}
