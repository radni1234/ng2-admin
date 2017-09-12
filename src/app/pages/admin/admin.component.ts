import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'admin',
  template: `<router-outlet></router-outlet>`
})
export class AdminComponent {

  constructor(private translateService: TranslateService) {
    console.log("Admin component: ");
    console.log(translateService.getLangs());
  }
}
