import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
  // private authUrl = 'http://localhost:8080/auth';
  private authUrl = 'http://178.222.245.73:8090/auth';
  private headers = new Headers({'Content-Type': 'application/json'});
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) {
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
      .map((response: Response) => {
        // login successful if there's a jwt token in the response

        let token = response.json() && response.json().token;
        console.log(this.jwtHelper.decodeToken(token));
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ uloga: this.jwtHelper.decodeToken(token).auth[0].authority, username: username, token: token }));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getToken(): String {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
    console.log(currentUser);
    var token = currentUser && currentUser.token;
    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
    console.log(token);
    return token ? token : "";
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU");
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);


  }

  isLoggedIn(): boolean {
    var token: String = this.getToken();
    return token && token.length > 0;
  }
}
