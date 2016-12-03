import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CrudService {

  private host: String = 'https://stormy-temple-40721.herokuapp.com/';
  private items: any[] = [];
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getData(entitet: string) : Observable<any[]> {
    return this.http.get(this.host + entitet + '/sve')
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getDataTab(entitet: string) : Observable<any[]> {
    return this.http.get(this.host + entitet + '/tab')
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getSingle(entitet: string, id: number): Observable<any> {
    return this.http.get(this.host + entitet + '/jedan?id=' + id)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public sendData(entitet: string, objekat: any) {

    const body = JSON.stringify(objekat);

    return this.http.post(this.host + entitet + '/dodaj', body, {
      headers: this.headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
      ;
  }

  public delete(entitet: string, id: number) {
    const body = JSON.stringify(id);

    return this.http.delete(this.host + entitet + '/obrisi?id=' + id)
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    console.log(error);
    return Observable.throw(error.json());
  }


}
