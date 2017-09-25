import {Component, ViewEncapsulation, ViewChild} from "@angular/core";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {ModalDirective} from "ng2-bootstrap";
import {Trafo} from "./trafo.data";
import {CompleterData, CompleterItem, CompleterService} from "ng2-completer";
import {Mesto, Opstina} from "../../../admin/components/opstina/opstinadata";


@Component({
  selector: 'isem-trafo',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'trafo.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class TrafoComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('childModalStub') childModalStub: ModalDirective;
  stubovi: any[]= new Array<any>();
  marker = {
    display: true,
    lat: null,
    lng: null,
  };
  private selectedStub: string;
  private selectedSvetiljka: string;


  trafo: Trafo = new Trafo();
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
      lonD: {
        title: 'Geografska širina',
        type: 'string'
      },
      latD: {
        title: 'Geografska dužina',
        type: 'string'
      },
      brojIntalisanihSvetiljki: {
        title: 'Broj instalisanih svetiljki',
        type: 'string'
      },
      snagaIntalisanihSvetiljki: {
        title: 'Snaga intalisanih svetiljki',
        type: 'string'
      }
    }
  };

  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      opstina: [''],
      mesto: [''],
      adresa: [''],
      lonD: [''],
      latD: [''],
      gausX: [''],
      gausY: [''],
      noviRedosled: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
    this.getOpstine();
  }

  getData() {
    this.crudService.getData("trafo/tab").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.trafo = new Trafo();
    this.trafo.mesto = new Mesto();
    this.trafo.mesto.opstina = new Opstina();

    this.selectedOpstina = "-- Opština --";
    this.selectedMesto = "-- Mesto --";
    this.izbor = true;
  }

  onEdit(event): void{
    this.trafo = new Trafo();
    this.crudService.getSingle("trafo/jedan?id="+event.data.id).subscribe(
      data => {this.trafo = data;
        console.log(data);

        this.selectedMesto = this.trafo.mesto.naziv;
        this.selectedOpstina = this.trafo.mesto.opstina.naziv;
        this.izbor = true;
        this.stubovi.splice(0,this.stubovi.length);
        this.crudService.getData("stub/tab?trafo_id="+this.trafo.id).subscribe(
          data => {
            for(var i=0; i<data.length; i++){
              this.stubovi[i] = data[i];
              this.stubovi[i].rbr = "rb. " + String(data[i].rbr);
            }

          console.log(this.stubovi);},
          error => {console.log(error); this.router.navigate(['/login']);}
        );
      },
      error => {console.log(error); });

    this.source.setFilter([{ field: 'adresa', search: '' }]);
  }

  onCancel() {
    this.getData();
    this.izbor = false;
  }

  onSubmit() {
    this.crudService.sendData("trafo", this.trafo)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.trafo = new Trafo();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("trafo", this.brisanjeId)
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

  showChildModalStub(): void {
    this.childModalStub.show();
  }

  hideChildModalStub(): void {
    this.childModalStub.hide();
    this.selectedStub = "";
    this.selectedSvetiljka = "";
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
      this.trafo.mesto=selected.originalObject;

    }
  }

  clicked(stub: any) {
    this.selectedStub = "";
    this.selectedSvetiljka = "";
    console.log(stub.id);
    this.selectedStub = stub.stubTip;
    this.crudService.getData("svetiljka/tab?stub_id="+stub.id).subscribe(
      data => {console.log(data);
        for(var i=0; i<data.length; i++){
          this.selectedSvetiljka = data[i].svetiljkaTip;
          console.log(data[i].svetiljkaTip);
        }
        if(data.length==0){
          this.selectedSvetiljka = "nema svetiljke na stubu";
        }

       },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
    this.showChildModalStub();
  }
}
