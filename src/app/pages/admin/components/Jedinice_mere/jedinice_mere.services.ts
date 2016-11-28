import {Injectable} from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class JediniceMereService {

  private jediniceMereSve = 'https://stormy-temple-40721.herokuapp.com/jedmere/sve';
  private jediniceMereDodaj = 'https://stormy-temple-40721.herokuapp.com/jedmere/dodaj';
  constructor(private http:Http) {

  }


  /*
   funkcija koja vraca listu korisnika preradjenu za smart table (bez ugnjezdenja)
   */
  getListaJedinicaMere() {

    return this.http.get(this.jediniceMereSve)
      .map((response:Response) => response.json());
  }

  sendJedinicaMere(jedmere: any) {
    const body = JSON.stringify(jedmere);
    let header1 = new Headers(
      {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'});
    return this.http.post('https://stormy-temple-40721.herokuapp.com/jedmere/dodaj',body, {headers: header1})
      .map((res: Response) => <any[]>res.json());
  }

  obrisiJedMere(id: any) {
    const body = JSON.stringify(id);
    console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://stormy-temple-40721.herokuapp.com/jedmere/obrisi', body, {
      headers: headers
    })
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
