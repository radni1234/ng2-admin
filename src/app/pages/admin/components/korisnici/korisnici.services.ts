import {Injectable} from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import {Observable} from "rxjs/Observable";
import {KorisnikData, Mesto} from "./korisnikdata";

@Injectable()
export class KorisniciService {

  constructor(private http: Http){

  }



  private kk: KorisnikData;
  // private korisnikSve = 'https://stormy-temple-40721.herokuapp.com/korisnik/sve';
  // private korisnikSveTab = 'https://stormy-temple-40721.herokuapp.com/korisnik/tab';
  // private ulogaSve = 'https://stormy-temple-40721.herokuapp.com/uloga/sve';
  // private opstinaSve = 'https://stormy-temple-40721.herokuapp.com/opstina/sve';
  // private mestaSve = 'https://stormy-temple-40721.herokuapp.com/mesto/sve';
  // private korisnikJedan = 'https://stormy-temple-40721.herokuapp.com/korisnik/jedan';

  private korisnikSve = 'http://178.222.245.73:8090/korisnik/sve';
  private korisnikSveTab = 'http://178.222.245.73:8090/korisnik/tab';
  private ulogaSve = 'http://178.222.245.73:8090/uloga/sve';
  private opstinaSve = 'http://178.222.245.73:8090/opstina/sve';
  private mestaSve = 'http://178.222.245.73:8090/mesto/sve';
  private korisnikJedan = 'http://178.222.245.73:8090/korisnik/jedan';

  /*
   funkcija koja vraca listu korisnika preradjenu za smart table (bez ugnjezdenja)
   */
  getListaKorisnikaTab() {

    return this.http.get(this.korisnikSveTab)
      .map((response: Response) => response.json());
  }

  /*
   funkcija koja vraca listu svih korisnika
   */
  getListaKorisnika(): Observable<any[]> {
    let header1 = new Headers(
      {'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'});
    return this.http.get(this.korisnikSve, {headers: header1})
      .map((res: Response) => <any[]>res.json())
      .catch(this.handleError);
  }
  /*
  funkcija koja za zadati ID vraca odgovarajuceg korisnika
   */

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
  /*
  funkcija koja za zadati ID brise odgovarajuceg korisnika
   */

    obrisiKorisnika(id: any) {
    const body = JSON.stringify(id);
      console.log(body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete('http://178.222.245.73:8090/korisnik/obrisi?id=' + id)
      .catch(this.handleError);
  }
  /*
  funkcija koja vraca listu svih uloga
   */

  getListaUloga(): Observable<any[]> {
    let header1 = new Headers(
      {'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'});
    return this.http.get(this.ulogaSve, {headers: header1})
      .map((res: Response) => <any[]>res.json())
      .catch(this.handleError);
  }
  /*
   funkcija koja vraca listu svih opstina
   */

  getListaOpstina(): Observable<any[]> {
    let header1 = new Headers(
      {'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'});
    return this.http.get(this.opstinaSve, {headers: header1})
      .map((res: Response) => <any[]>res.json())
      .catch(this.handleError);
  }
  /*
  funkcija koja salje korisnika, koristi se za kreiranje novog korisnika i editovanje postojeceg.
  Ako se posalje json korisnika sa ID vrsi se UPDATE postojeceg u bazi, ako se posalje json korisnika bez ID
   vrsi se CREATE novog u bazi
   */

  sendKorisnik(korisnik: any) {
    const body = JSON.stringify(korisnik);
    let header1 = new Headers(
      {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'});
    return this.http.post('http://178.222.245.73:8090/korisnik/dodaj',body, {headers: header1})
      .map((res: Response) => <any[]>res.json());
  }


  /*
   funkcija koja vraca listu svih mesta za zadati ID opstine
   */
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
