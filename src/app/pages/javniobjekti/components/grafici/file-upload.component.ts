import { Component } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html'
})
export class FileUploadComponent {

  apiEndPoint = "http://178.222.245.73:8090/upload";

  constructor(private http: Http, private authenticationService: AuthenticationService) {
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file);
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();
      console.log(formData);
      headers.append('Content-Type', 'multipart/form-data;boundary=--gc0p4Jq0M2Yt08jU534c0p--');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer ' + this.authenticationService.getToken());
      headers.append('Access-Control-Allow-Origin', '*');
      let options = new RequestOptions({ headers: headers });
      this.http.post(`${this.apiEndPoint}`, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => console.log('success'),
          error => console.log(error)
        )
    }
  }
}
