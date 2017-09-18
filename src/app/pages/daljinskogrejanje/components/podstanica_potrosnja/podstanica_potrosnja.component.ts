import {Component, ViewEncapsulation, ViewChild, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {PodstanicaPotrosnja} from "./podstanica_potrosnja.data";
import {DatumService} from "../../../services/datum.service";
import {Podstanica} from "../podstanica/podstanica.data";
import {MesecLista} from "../../../javniobjekti/components/racuni/racundata";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'isem-podstanica-potrosnja',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'podstanica_potrosnja.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class PodstanicaPotrosnjaComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() podstanica: Podstanica;

  podstanicaPotrosnja: PodstanicaPotrosnja = new PodstanicaPotrosnja();
  brisanjeId: number;
  izbor: boolean = false;

  source: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;
  datum: string;
  myDatePickerOptions = {
    dateFormat: 'dd.mm.yyyy'
  };

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
  datumRacuna2: string;

  noviRn: boolean = false;
  proveraRn: any = 0;

  datePipe = new DatePipe();

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
      datum: {
        title: 'Datum',
        type: 'string'
      },
      potrosnjaKwh: {
        title: 'Potrošnja (kWh)',
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
      potrosnjaKwh: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("potrosnja_podstanice/sve?podstanica_id="+this.podstanica.id).subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.podstanicaPotrosnja = new PodstanicaPotrosnja();
    this.podstanicaPotrosnja.podstanica = this.podstanica;
    this.izbor = true;
    this.noviRn = true;
    this.proveraRn = 0;
    this.datumRacuna2 = null;
    this.popuniGodinaMesec(new Date());
  }

  onEdit(event): void{
    this.podstanicaPotrosnja = new PodstanicaPotrosnja();
    this.crudService.getSingle("potrosnja_podstanice/jedan?id="+event.data.id).subscribe(
      data => {this.podstanicaPotrosnja = data;
        console.log(data);
        this.izbor = true;
        this.noviRn = false;
        this.proveraRn = 0;

        this.datumRacuna = this.ds.toDate(this.podstanicaPotrosnja.datum);
        this.datumRacuna2 = this.podstanicaPotrosnja.datum;
        this.popuniGodinaMesec(this.datumRacuna);
        this.stariMesec = this.datumRacuna.getMonth();
        this.staraGodina = this.datumRacuna.getFullYear();

      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'naziv', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {
    this.podstanicaPotrosnja.podstanica = this.podstanica;
    this.podstanicaPotrosnja.datum = this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy');

    this.crudService.sendData("potrosnja_podstanice", this.podstanicaPotrosnja)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.noviRn = false;
    this.podstanicaPotrosnja = new PodstanicaPotrosnja();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("potrosnja_podstanice", this.brisanjeId)
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
    this.datumRacuna.setFullYear(selectedGodina);

    if (this.noviRn || (!this.noviRn && this.podstanicaPotrosnja && (this.godina != this.staraGodina || this.mesec.id != this.stariMesec))) {

      this.proveriRacun("potrosnja_podstanice/provera?datum="+this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy')+"&podstanica_id="+this.podstanicaPotrosnja.podstanica.id);
    }

  }

  public onMesecSelected(selectedMesec: number){
    this.datumRacuna.setMonth(selectedMesec);
    this.datumRacuna.setDate(15);

    if (this.noviRn || (!this.noviRn && (this.godina != this.staraGodina || this.mesec.id != this.stariMesec))) {
      this.proveriRacun("potrosnja_podstanice/provera?datum="+this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy')+"&podstanica_id="+this.podstanicaPotrosnja.podstanica.id);
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
          this.proveraRn = data;
        },
        error => console.log(error)
      );

  }

}
