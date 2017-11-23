import { Injectable } from '@angular/core';
import {Http, Response, Headers, ResponseContentType} from "@angular/http";
import { Observable } from "rxjs/Rx";
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class CrudService {

  // private host: String = 'https://stormy-temple-40721.herokuapp.com/';
  private host: String = 'http://178.222.245.73:8090/';
  private hostTemp: String = 'http://109.92.176.105:9000/isc/get_var_js.aspx?Tspv';
  // private host: String = 'http://localhost:8080/';

  private headers: Headers;
  private headersTemp: Headers;

  constructor(private http: Http,
              private authenticationService: AuthenticationService,
              private router: Router
              ) {

  }

  public formirajHeader(){
    this.headersTemp = new Headers();
    // this.headersTemp.append('Content-Type', 'application/json');
    // this.headersTemp.append('Accept', 'application/json');

    this.headers = new Headers();

    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + this.authenticationService.getToken());
    this.headers.append('Access-Control-Allow-Origin', '*');

    console.log('this.headers');
    console.log(this.headers);
  }

  public getDataTemp() : Observable<any[]> {
    this.formirajHeader();
    console.log(this.hostTemp, {headers: this.headersTemp});

    return this.http.get(this.hostTemp + '', {headers: this.headersTemp})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getData(path: string) : Observable<any[]> {
    this.formirajHeader();
    console.log(this.host + path, {headers: this.headers});

    return this.http.get(this.host + path, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getSingle(path: string): Observable<any> {
    this.formirajHeader();
    console.log(this.host + path, {headers: this.headers});

    return this.http.get(this.host + path, {headers: this.headers})
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getSlika(path: string): Observable<any> {
    this.formirajHeader();
    console.log(this.host + path, {headers: this.headers});

    return this.http.get(this.host + path, {headers: this.headers, responseType: ResponseContentType.Blob})
      .map((res: Response) => res.blob())
      .catch(this.handleError);
  }

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
    console.log(this.host + entitet + '/obrisi?id=' + id, {headers: this.headers});
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


}
