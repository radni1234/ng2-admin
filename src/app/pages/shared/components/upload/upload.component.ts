import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'file-upload',
  template: '<input type="file" [multiple]="multiple" #fileInput><button (click)="upload();">Prenos</button>'
})
export class UploadComponent {
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  private headers: Headers;

  constructor(private http: Http, private authenticationService: AuthenticationService) {}

  upload() {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    console.log('fileCount');
    console.log(fileCount);
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('file', inputEl.files.item(i));
      }

    // if (fileCount = 1) { // a file was selected
    //   formData.append('file', inputEl.files.item(0));

      this.headers = new Headers();

      // this.headers.append('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
      // this.headers.append('Content-Disposition', 'form-data; name="file"; filename="model.png"');
      this.headers.append('Authorization', 'Bearer ' + this.authenticationService.getToken());
      // this.headers.append('Access-Control-Allow-Origin', '*');

      return this.http.post('http://178.222.245.73:8090/upload/post', formData, {
        headers: this.headers
      }).subscribe(
          data => console.log(data),
          err => console.log(err))
        ;


    }
  }
}
