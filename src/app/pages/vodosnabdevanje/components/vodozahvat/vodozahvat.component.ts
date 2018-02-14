import {Component, OnInit, ViewEncapsulation, ViewChild} from "@angular/core";
import {ModalDirective} from "ng2-bootstrap";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";
import {CrudService} from "../../../services/crud.service";
import {Router} from "@angular/router";
import {JavnoPreduzece} from "../../../admin/components/javno_preduzece/javno_preduzece.data";
import {Vodozahvat} from "./vodozahvat.data";
import {CompleterData, CompleterService, CompleterItem} from "ng2-completer";
import {Opstina, Mesto} from "../../../admin/components/opstina/opstinadata";
import {PregledRacunaVodozahvatComponent} from "../pregled_racuna/pregled_racuna.component";
import {VodozahvatGrupa} from "../../../admin/components/vodozahvat_grupa/vodozahvat_grupa.data";

@Component({
  selector: 'vodozahvat',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'vodozahvat.component.html',
  styleUrls: ['../../styles/table.component.scss']
})

export class VodozahvatComponent {
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild(PregledRacunaVodozahvatComponent) pregledRacunaVodozahvat: PregledRacunaVodozahvatComponent;

  vodozahvat: Vodozahvat;
  brisanjeId: number;
  izbor: boolean = false;
  isJavnoPredLoaded: boolean = false;
  javnaPred: JavnoPreduzece[];
  javnoPredId: number = 0;

  vodozahvatGrupaSve: VodozahvatGrupa[];
  vodozahvatGrupaId: number;
  isVodozahvatGrupaLoaded: boolean = false;

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

  private tabNaslov: string;


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
      grupa: {
        title: 'Grupa',
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

  constructor(private crudService: CrudService, private fb: FormBuilder, private completerService: CompleterService, private router: Router) {
    this.myForm = this.fb.group({
      id: [''],
      naziv: [''],
      javnoPreduzece: [''],
      vodozahvatGrupa: [''],
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
    this.getOpstine();
    this.getDataVodozahvatGrupa();
  }

  getData() {
    this.crudService.getData("vodozahvat/tab").subscribe(
      data => {this.source.load(data); console.log(data);},
      error => {console.log(error); this.router.navigate(['/login']);}
    );
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
      this.vodozahvat.mesto=selected.originalObject;

      console.log(this.vodozahvat);
    }
  }

  getDataVodozahvatGrupa() {
    this.crudService.getData("vodozahvat_grupa/sve").subscribe(
      data => {
        this.vodozahvatGrupaSve = data;
        this.isVodozahvatGrupaLoaded = true;
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }

  onCreate(): void{
    this.vodozahvat = new Vodozahvat();

    this.vodozahvat.mesto = new Mesto();
    this.vodozahvat.mesto.opstina = new Opstina();

    this.selectedOpstina = "-- Opština --";
    this.selectedMesto = "-- Mesto --";

    this.javnoPredId = this.javnaPred[0].id;
    this.vodozahvatGrupaId = this.vodozahvatGrupaSve[0].id;
    this.izbor = true;
  }

  onEdit(event): void{

    this.vodozahvat = new Vodozahvat();
    this.crudService.getSingle("vodozahvat/jedan?id="+event.data.id).subscribe(
      data => {this.vodozahvat = data;
        console.log(data);
        this.izbor = true;

        this.selectedMesto = this.vodozahvat.mesto.naziv;
        this.selectedOpstina = this.vodozahvat.mesto.opstina.naziv;

        if (!this.vodozahvat.javnoPreduzece){
          this.javnoPredId = null;
        } else {
          this.javnoPredId = this.vodozahvat.javnoPreduzece.id;
        }

        if (!this.vodozahvat.vodozahvatGrupa){
          this.vodozahvatGrupaId = null;
        } else {
          this.vodozahvatGrupaId = this.vodozahvat.vodozahvatGrupa.id;

          if (this.vodozahvatGrupaId == 1) {
            this.tabNaslov = "Vodozahvat";
          } else if (this.vodozahvatGrupaId == 2) {
            this.tabNaslov = "Fekalna stanica";
          }
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
        this.vodozahvat.javnoPreduzece = null;
      } else {
        for (let item of this.javnaPred) {
          if (item.id == this.javnoPredId) {
            this.vodozahvat.javnoPreduzece = item;
          }
        }
      }
    }

    if (this.isVodozahvatGrupaLoaded) {
      if (this.vodozahvatGrupaId.toString() == "0: null") {
        this.vodozahvat.vodozahvatGrupa = null;
      } else {
        for (let item of this.vodozahvatGrupaSve) {
          if (item.id == this.vodozahvatGrupaId) {
            this.vodozahvat.vodozahvatGrupa = item;
          }
        }
      }
    }

    this.crudService.sendData("vodozahvat", this.vodozahvat)
      .subscribe(
        data => {console.log(data); this.getData();},
        error => console.log(error)
      );

    this.izbor = false;
    this.vodozahvat = new Vodozahvat();

  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("vodozahvat", this.brisanjeId)
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
    this.pregledRacunaVodozahvat.getBrojila(this.vodozahvat.id);
  }

}
