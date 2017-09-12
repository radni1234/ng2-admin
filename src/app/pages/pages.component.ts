import {Component, ViewEncapsulation} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top (languageSelected)="onLanguageSelected($event)"></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <marquee behavior="scroll" direction="left" scrollamount="12">Smanjenjem unutrašnje temperature za jedan stepen u zimskom periodu uštedećete 5% na računu za energiju<span style="margin-left:100%"> </span>Samo delovanjem sistema energetskog menadžmenta možete da uštedite i do 15% na računima za energiju<span style="margin-left:100%"> </span>Vodite računa o redovnom održavanju i servisiranju sistema koji troše energiju</marquee>
        <router-outlet></router-outlet>
      </div>
    </div>
    
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://eneplus.rs">Eneplus</a> 2017</div><h5>{{ 'login.title' | translate }}</h5>
        <ul class="al-share clearfix">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li><i class="socicon socicon-github"></i></li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private translateService: TranslateService) {
    console.log("Pages component: ");
    console.log(translateService.getLangs());
  }

  ngOnInit() {
  }
}
