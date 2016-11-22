import {Injectable} from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import {Observable} from "rxjs/Observable";
import {KorisnikData, Mesto} from "./korisnikdata";

@Injectable()
export class KorisniciService {

  constructor(private http: Http){

  }



  private kk: KorisnikData;
  private korisnikSve = 'https://stormy-temple-40721.herokuapp.com/korisnik/sve';
  private ulogaSve = 'https://stormy-temple-40721.herokuapp.com/uloga/sve';
  private opstinaSve = 'https://stormy-temple-40721.herokuapp.com/opstina/sve';
  private mestaSve = 'https://stormy-temple-40721.herokuapp.com/mesto/sve';
  private korisnikJedan = 'https://stormy-temple-40721.herokuapp.com/korisnik/jedan';

  getListaKorisnika(): Observable<any[]> {
    let header1 = new Headers(
      {'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'});
    return this.http.get(this.korisnikSve, {headers: header1})
      .map((res: Response) => <any[]>res.json())
      .catch(this.handleError);
  }

  getKorisnik(id: any) {
    let params=new URLSearchParams;
    params.set('id', "" + id);
    let header1 = new Headers(
      {'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'});
    return this.http.get(this.korisnikJedan, {headers: header1, search:params})
      .map((res: Response) => <KorisnikData>res.json())
      .catch(this.handleError);

  }

    obrisiKorisnika(id: any) {
    const body = JSON.stringify(id);
      console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://stormy-temple-40721.herokuapp.com/korisnik/obrisi', body, {
      headers: headers
    })
      .map((data: Response) => <any[]>data.json())
      .catch(this.handleError);
  }

  getListaUloga(): Observable<any[]> {
    let header1 = new Headers(
      {'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'});
    return this.http.get(this.ulogaSve, {headers: header1})
      .map((res: Response) => <any[]>res.json())
      .catch(this.handleError);
  }

  getListaOpstina(): Observable<any[]> {
    let header1 = new Headers(
      {'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'});
    return this.http.get(this.opstinaSve, {headers: header1})
      .map((res: Response) => <any[]>res.json())
      .catch(this.handleError);
  }

  sendKorisnik(korisnik: any) {
    const body = JSON.stringify(korisnik);
    let header1 = new Headers(
      {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'});
    return this.http.post('https://stormy-temple-40721.herokuapp.com/korisnik/dodaj',body, {headers: header1})
      .map((res: Response) => <any[]>res.json());
  }

  getListaMesta(id: any) {
    let params=new URLSearchParams;
    params.set('ops_id', "" + id);
    let header1 = new Headers(
      {'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'});
    return this.http.get(this.mestaSve, {headers: header1, search:params})
      .map((res: Response) => <Mesto[]>res.json())
      .catch(this.handleError);

  }



  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
