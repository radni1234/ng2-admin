import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Rx";
import {Mesto} from "../admin/components/opstina/opstinadata";
import {Podgrupa} from "../javniobjekti/components/objekti/objekatdata";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class CrudService {

  // private host: String = 'https://stormy-temple-40721.herokuapp.com/';
  private host: String = 'http://178.222.245.73:8090/';
  // private host: String = 'http://localhost:8080/';
  private items: any[] = [];
  private headers: Headers;

  constructor(private http: Http, private authenticationService: AuthenticationService, private router: Router) {

  }

  public formirajHeader(){
    this.headers = new Headers();

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.authenticationService.getToken());
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  public getData(path: string) : Observable<any[]> {
    this.formirajHeader();
    // console.log(this.host + path, {headers: this.headers});

    return this.http.get(this.host + path, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getSingle(path: string): Observable<any> {
    this.formirajHeader();

    return this.http.get(this.host + path, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  // public getUslov(entitet: string, uslov: string) : Observable<any[]> {
  //   console.log('uslov ' + this.host + entitet + '/sve?' + uslov);
  //   return this.http.get(this.host + entitet + '/sve?' + uslov)
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }
  //
  // public getIzvestaj(entitet: string, uslov: string) : Observable<any[]> {
  //   console.log('uslov ' + this.host + entitet + '?' + uslov);
  //   return this.http.get(this.host + entitet + '?' + uslov)
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }
  //
  // public get(path: string) : Observable<any[]> {
  //   console.log('uslov ' + this.host + path);
  //   return this.http.get(this.host + path)
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }
  //
  // public getPodatke(url: string) : Observable<any[]> {
  //   console.log('uslov ' + this.host + url);
  //   return this.http.get(this.host + url)
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }
  //
  // public getDataTab(entitet: string) : Observable<any[]> {
  //   return this.http.get(this.host + entitet + '/tab')
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }
  //
  // public getUslovTab(entitet: string, uslov: string) : Observable<any[]> {
  //   console.log('uslov ' + this.host + entitet + '/tab?' + uslov);
  //   return this.http.get(this.host + entitet + '/tab?' + uslov)
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }

  // public getSingle(entitet: string, id: number): Observable<any> {
  //   return this.http.get(this.host + entitet + '/jedan?id=' + id)
  //     .map((response: Response) => response.json())
  //     .catch(this.handleError);
  // }

  public sendData(entitet: string, objekat: any) {

    this.formirajHeader();
    const body = JSON.stringify(objekat);

    console.log(body);

    return this.http.post(this.host + entitet + '/dodaj', body, {
      headers: this.headers
    })
      .map((data: Response) => data.json())
      .catch(this.handleError)
      ;
  }

  public delete(entitet: string, id: number) {
    this.formirajHeader();

    return this.http.delete(this.host + entitet + '/obrisi?id=' + id, {headers: this.headers})
      .catch(this.handleError);
  }

  private handleError (error: Response) {

    console.log(error);

    if ((error.status === 401 || error.status === 403)) {
      console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
      // this.router.navigateByUrl('/login');

    }

    return Observable.throw(error.json());
  }

  /*
   funkcija koja vraca listu svih mesta za zadati ID opstine
   */
  // getListaMesta(id: any) {
  //   let params=new URLSearchParams;
  //   params.set('ops_id', "" + id);
  //   let header1 = new Headers(
  //     {'Content-Type': 'application/x-www-form-urlencoded',
  //       'Accept': 'application/json',
  //       'Access-Control-Allow-Origin': '*'});
  //   return this.http.get('https://stormy-temple-40721.herokuapp.com/mesto/sve', {headers: header1, search:params})
  //     .map((res: Response) => <Mesto[]>res.json())
  //     .catch(this.handleError);
  //
  // }
  //
  // getListaPodgrupa(id: any) {
  //   let params=new URLSearchParams;
  //   params.set('gru_id', "" + id);
  //   let header1 = new Headers(
  //     {'Content-Type': 'application/x-www-form-urlencoded',
  //       'Accept': 'application/json',
  //       'Access-Control-Allow-Origin': '*'});
  //   return this.http.get('https://stormy-temple-40721.herokuapp.com/podgrupa/sve', {headers: header1, search:params})
  //     .map((res: Response) => <Podgrupa[]>res.json())
  //     .catch(this.handleError);
  //
  // }


}
