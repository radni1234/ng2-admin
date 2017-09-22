import {Component, ViewEncapsulation, ViewChild, Input} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {RnTrafo} from "./rn_trafo.data";
import {Trafo} from "../trafo/trafo.data";
import {MesecLista} from "../../../javniobjekti/components/racuni/racundata";
import {DatePipe} from "@angular/common";
import {DatumService} from "../../../services/datum.service";

@Component({
  selector: 'isem-rn-trafo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'rn_trafo.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class RnTrafoComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() trafo: Trafo;

  datePipe = new DatePipe();

  rnTrafo: RnTrafo = new RnTrafo();
  brisanjeId: number;
  izbor: boolean = false;

  proveraRn: any = 0;

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
        type: 'string'
      },
      mesec: {
        title: 'Mesec',
        type: 'string'
      },
      potrosnja: {
        title: 'Potrošnja',
        type: 'string'
      },
      iznos: {
        title: 'Iznos',
        type: 'string'
      }
    }
  };

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
  // datumRacuna2: string;

  noviRn: boolean = false;

  constructor(private crudService: CrudService, private fb: FormBuilder, private ds: DatumService, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      godina: [''],
      mesec: [''],
      potrosnja: [''],
      iznos: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("rn_trafo/tab?trafo_id="+this.trafo.id).subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.rnTrafo = new RnTrafo();
    this.rnTrafo.trafo = this.trafo;
    this.popuniGodinaMesec(new Date());
    this.izbor = true;
  }

  onEdit(event): void{
    this.rnTrafo = new RnTrafo();
    this.crudService.getSingle("rn_trafo/jedan?id="+event.data.id).subscribe(
      data => {this.rnTrafo = data;
        console.log(data);
        this.izbor = true;

        this.datumRacuna = this.ds.toDate(this.rnTrafo.datumr);
        // this.datumRacuna2 = this.rnTrafo.datumr;

        this.popuniGodinaMesec(this.datumRacuna);

        this.stariMesec = this.datumRacuna.getMonth();
        this.staraGodina = this.datumRacuna.getFullYear();
      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'datumr', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {
    this.rnTrafo.datumr = this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy');

    this.crudService.sendData("rn_trafo", this.rnTrafo)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.rnTrafo = new RnTrafo();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("rn_trafo", this.brisanjeId)
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
    this.proveraRn = 0;
    this.datumRacuna.setFullYear(selectedGodina);

    if (this.noviRn || (!this.noviRn && this.rnTrafo && (this.godina != this.staraGodina || this.mesec.id != this.stariMesec))) {

      this.proveriRacun("rn_trafo/provera?datumr="+this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy')+"&trafo_id="+this.rnTrafo.trafo.id);
    }

  }

  public onMesecSelected(selectedMesec: number){
    this.proveraRn = 0;
    this.datumRacuna.setMonth(selectedMesec);
    this.datumRacuna.setDate(15);

    if (this.noviRn || (!this.noviRn && (this.godina != this.staraGodina || this.mesec.id != this.stariMesec))) {
      this.proveriRacun("rn_trafo/provera?datumr="+this.datePipe.transform(this.datumRacuna, 'dd.MM.yyyy')+"&trafo_id="+this.rnTrafo.trafo.id);
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
