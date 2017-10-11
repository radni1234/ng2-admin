import {Component, OnInit} from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../../../services/authentication.service";
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'file-upload-test',
  templateUrl: 'file-upload.component.html'
})
export class FileUploadComponent implements OnInit{

  name: String = 'Zeljko'

  apiEndPoint = "http://178.222.245.73:8090/upload";

  constructor(private http: Http, private authenticationService: AuthenticationService, private translate: TranslateService) {

    console.log(translate.getLangs());
    translate.addLangs(["en", "sr"]);
    translate.setDefaultLang('en');
    //
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|sr/) ? browserLang : 'en');

    // console.log(translate.getLangs());
    // translate.setTranslation('en', {
    //   "HELLO": "hello {{value}}",
    //   "TITLE": "Hello Angular 2 with ng2-translate!"
    // });
    //
    // translate.setTranslation('it', {
    //   "HELLO": "Ciao {{value}}",
    //   "TITLE": "Ciao Angular 2 con ng2-translate!"
    // });
    //
    // translate.setDefaultLang('en');
    //
    //
    //
    // let browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|it/) ? browserLang : 'en');
    // //translate.use('en');
    // translate.get('HELLO').subscribe((res: string) => {
    //   console.log(res);
    //   //=> 'hello world'
    // });

  }

  ngOnInit(){
//    this.translate.addLangs(["en", "it"]);
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
