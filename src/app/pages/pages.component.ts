import {Component, ViewEncapsulation} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {CrudService} from "./services/crud.service";
import {Router} from "@angular/router";
import {LangChangeEvent} from "ng2-translate";
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
        <marquee behavior="scroll" direction="left" scrollamount="12" >
        <!--<div *ngFor="let savet of saveti; let i = index">-->
        <!--<div *ngFor="let savet of saveti; let i = index">-->
        <!--{{savet}}-->
        <span style="margin-left:100%"*ngFor="let savet of saveti; let i = index"> 
        {{savet}}
        
        </span>
        <!--</div>-->
        <!--</div>-->
        <!--{{savet}} {{i}}-->
        <!--<span style="margin-left:100%"> </span>-->
        <!--*ngFor="let savet of saveti; let i = index"-->
        
        <!--Smanjenjem unutrašnje temperature za jedan stepen u zimskom periodu uštedećete 5% na računu za energiju -->
        <!--<span style="margin-left:100%"> </span>-->
        <!--Samo delovanjem sistema energetskog menadžmenta možete da uštedite i do 15% na računima za energiju -->
        <!--<span style="margin-left:100%"> </span>-->
        <!--Vodite računa o redovnom održavanju i servisiranju sistema koji troše energiju -->
        
        </marquee>
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


  savetiBuffer: String[]= new Array<String>();

  saveti: String[]= new Array<String>();

  constructor(private translate: TranslateService, private crudService: CrudService, private router: Router) {
    console.log("Pages component: ");
    console.log(translate.getLangs());

    this.getData();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {

      this.saveti.splice(0,this.saveti.length);

      for (var j = 0; j < this.savetiBuffer.length; j++) {
        this.saveti[j] = this.savetiBuffer[j]['savet_'+this.translate.currentLang]

      }
      console.log("AAAAAAAAAAAAAAAAAAAAAAA"+this.saveti);


    });

  }

  ngOnInit() {
  }

  getData() {
    this.crudService.getData("saveti/sve").subscribe(
      data => {this.savetiBuffer = data;

        for (var j = 0; j < this.savetiBuffer.length; j++) {
          this.saveti[j] = this.savetiBuffer[j]['savet_'+this.translate.currentLang]

        }

      console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK");
      console.log(data);
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }
}
