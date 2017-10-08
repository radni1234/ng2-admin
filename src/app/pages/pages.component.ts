import {Component, ViewEncapsulation} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';
import {Router, Routes} from "@angular/router";
import {LangChangeEvent} from "ng2-translate";
import {KorisnikMeni} from "./admin/components/korisnik/korisnikdata";
import {MENU} from "../app.menu";
import {CrudService} from "./services/crud.service";
import {BaMenuService} from "../theme/services/baMenu/baMenu.service";


@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [`
.marquee .spacer{
  display: inline-block;
  width: 200px;
}
.marquee {
    width: 100%;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
}
.marquee span {
    display: inline-block;
    padding-left: 100%;
    text-indent: 0;
    animation: marquee 15s linear infinite;
}
.marquee span:hover {
    animation-play-state: paused
}
.marquee.time-5s span  { animation-duration: 5s;  }
.marquee.time-10s span { animation-duration: 10s; }
.marquee.time-20s span { animation-duration: 20s; }
.marquee.time-30s span { animation-duration: 30s; }
.marquee.time-40s span { animation-duration: 40s; }
.marquee.time-50s span { animation-duration: 50s; }
.marquee.time-1m span  { animation-duration: 60s; }
.marquee.time-2m span  { animation-duration: 120s;}
.marquee.time-5m span  { animation-duration: 300s;}


/* Make it move */
@keyframes marquee {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-100%, 0); }
}
`
  ],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top (languageSelected)="onLanguageSelected($event)"></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <!--<marquee behavior="scroll" direction="left" scrollamount="12" >-->
          <!--<span style="margin-left:100%"*ngFor="let savet of saveti; let i = index"> -->
          <!--{{savet}}       -->
          <!--</span>-->
        <!--</marquee>-->
        <p class="marquee time-30s"><span [innerHTML]="proba">
        
        </span></p>
        <!--<div class="marquee">-->
          <!--<div>-->
            <!--{{proba}}-->
            <!--&lt;!&ndash;<span *ngFor="let savet of saveti; let i = index">{{savet}}</span>&ndash;&gt;-->
          <!--</div>-->
        <!--</div>-->
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

  proba: String;
  savetiBuffer: String[]= new Array<String>();

  saveti: String[]= new Array<String>();

  noviMenu = _.cloneDeep(MENU);
  korisnikMeni: KorisnikMeni;



  constructor(private translate: TranslateService, private crudService: CrudService, private router: Router, private _menuService: BaMenuService,) {
    console.log("Pages component: ");
    console.log(translate.getLangs());

    this.getData();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {

      this.noviMenu["0"].children["0"].data.menu.title = this.translate.instant('general.menu.administration');
      this.noviMenu["0"].children["1"].data.menu.title = this.translate.instant('general.menu.publicbuildings');
      this.noviMenu["0"].children["1"].children["1"].data.menu.title = this.translate.instant('general.menu.eff_app_meas');

      this._menuService.updateMenuByRoutes(<Routes>this.noviMenu);

      this.saveti.splice(0,this.saveti.length);
      this.proba = '';

      for (var j = 0; j < this.savetiBuffer.length; j++) {
        this.saveti[j] = this.savetiBuffer[j]['savet_'+this.translate.currentLang];
        this.proba = this.saveti.join('<i class="spacer"></i>');

      }
      console.log("AAAAAAAAAAAAAAAAAAAAAAA PAGES"+this.saveti);


    });
    this.getKorisnik(JSON.parse(localStorage.getItem('currentUser')).username);
  }

  ngOnInit() {
  }

  getKorisnik(korisnik: string){

    this.crudService.getSingle("korisnik/meni?username="+korisnik).subscribe(
      data => {this.korisnikMeni = data;
        console.log(data);

        // podsistemi
        this.noviMenu["0"].children["0"].data.menu.hidden = !this.korisnikMeni.psAdmin;
        this.noviMenu["0"].children["1"].data.menu.hidden = !this.korisnikMeni.psObjekti;
        this.noviMenu["0"].children["3"].data.menu.hidden = !this.korisnikMeni.psGrejanje;
        this.noviMenu["0"].children["4"].data.menu.hidden = !this.korisnikMeni.psRasveta;
        this.noviMenu["0"].children["5"].data.menu.hidden = !this.korisnikMeni.psVozila;
        this.noviMenu["0"].children["6"].data.menu.hidden = !this.korisnikMeni.psVodosnabdevanje;

        this._menuService.updateMenuByRoutes(<Routes>this.noviMenu);
      },
      error => {console.log(error); });

  }

  getData() {
    this.crudService.getData("saveti/sve").subscribe(
      data => {this.savetiBuffer = data;

        for (var j = 0; j < this.savetiBuffer.length; j++) {
          this.saveti[j] = this.savetiBuffer[j]['savet_'+this.translate.currentLang];
          this.proba = this.saveti.join('<i class="spacer"></i>');


        }

      console.log(data);
      },
      error => {console.log(error); this.router.navigate(['/login']);}
    );
  }
}
