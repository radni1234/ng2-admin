import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {Response, Headers, ResponseContentType, Http} from "@angular/http";
import {AuthenticationService} from "../../../services/authentication.service";
import * as FileSaver from 'file-saver';
import {CrudService} from "../../../services/crud.service";
import {Objekat} from "../objekti/objekatdata";
import {ObjekatDokument} from "./objekat_dokument.data";
import {ModalDirective} from "ng2-bootstrap";
import {LocalDataSource} from "ng2-smart-table";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'objekat-dokument',
  templateUrl: 'objekat_dokument.component.html',
  styleUrls: ['../../styles/table.component.scss']
})
export class ObjekatDokumentComponent implements OnInit {
  @ViewChild('childModal') childModal: ModalDirective;
  @Input() objekat: Objekat;

  fileUpload: string;
  private headers: Headers;
  objekatDokumenti: ObjekatDokument[];

  brisanjeId: number;
  izbor: boolean = false;

  source: LocalDataSource = new LocalDataSource();

  myForm: FormGroup;

  settings = {
    add: {
    },
    edit: {
      editButtonContent: '<i class="ion-archive"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>'
    },
    mode: 'external',
    actions: {
      columnTitle: '',
      add:false
    },
    noDataMessage: 'Podaci nisu pronađeni',
    columns: {
      dokument: {
        title: 'Dokument',
        type: 'string'
      }
    }
  };

  constructor(private http: Http, private fb: FormBuilder, private authenticationService: AuthenticationService, private crudService: CrudService) {
    this.myForm = this.fb.group({
      id: [''],
      dokument: [''],
      version: ['']
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.crudService.getData("obj_dok/sve?obj_id"+this.objekat.id)
      .subscribe(
        data => {
          this.objekatDokumenti = data;
          this.source.load(data);
        },
        error => {console.log(error);});
  }

  osvezi(){
    this.getData();
  }

  onDelete(event){
    this.brisanjeId = event.data.id;
    this.showChildModal();
  }

  onDeleteConfirm() {
    this.crudService.delete("obj_dok", this.brisanjeId)
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


  download(path: string): Observable<any> {

    this.formirajHeader();
    console.log(path, {headers: this.headers});

    // return this.http.get(path, {headers: this.headers, responseType: ResponseContentType.Blob})
    //   .map((res: Response) => res.blob())
    //   .catch(this.handleError);

    return this.http.get('http://178.222.245.73:8090/upload/files/IMG_20171030_0001.pdf', {headers: this.headers, responseType: ResponseContentType.Blob})
      .map((res: Response) => res.blob())
      .catch(this.handleError);
  }


  preuzmiDokument(path: string): void {
    this.download(path)
      .subscribe(
        data => {
          console.log('preuzmiDokument');
          console.log(data);

          FileSaver.saveAs(data, "myPDF.pdf");

          // let fileURL = URL.createObjectURL(data);
          // window.open(fileURL);
          // this.createFileFromBlob(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  createFileFromBlob(file: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      let fileBlob = reader.result;

      let blob = new Blob([fileBlob], {
        type: 'application/pdf' // must match the Accept type
      });

      let filename = 'mypdf.pdf';
      FileSaver.saveAs(blob, filename);
    }, false);


  }

  public formirajHeader(){
    this.headers = new Headers();

    // this.headers.append('Content-Type', 'application/json');
    // this.headers.append('Accept', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.authenticationService.getToken());
    // this.headers.append('Access-Control-Allow-Origin', '*');

    console.log('this.headers');
    console.log(this.headers);
  }

  private handleError (error: Response) {

    console.log(error);

    if ((error.status === 401 || error.status === 403)) {
      console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
    }

    return Observable.throw(error.json());
  }
}
