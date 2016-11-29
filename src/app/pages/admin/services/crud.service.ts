import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
//import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class CrudService {

  private host: String = 'https://stormy-temple-40721.herokuapp.com/';
  private items: any[] = [];

  constructor(private http: Http) {

  }

  getData(entitet: string) {

    return this.http.get(this.host + entitet + '/sve')
      .map((response: Response) => response.json());
  }

  sendData(entitet: string, objekat: any) {

    const body = JSON.stringify(objekat);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + entitet + '/dodaj', body, {
      headers: headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
      ;
  }

  delete(entitet: string, id: number) {
    const body = JSON.stringify(id);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.host + entitet + '/obrisi', body, {
      headers: headers
    })
      .catch(this.handleError);
  }

  private handleError (error: any) {
    console.log(error);
    return Observable.throw(error.json());
  }


}
