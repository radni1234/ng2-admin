import {Component, ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'pages',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <marquee behavior="scroll" direction="left" scrollamount="12">Uklonite Vučića sa vlasti jer nam jeba majku.....<span style="margin-left:100%"> </span>Okrečite Beograd<span style="margin-left:100%"> </span>Vrbaške pi...</marquee>
        <router-outlet></router-outlet>
      </div>
    </div>
    
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="http://eneplus.rs">Eneplus</a> 2017</div>
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

  constructor() {
  }

  ngOnInit() {
  }
}
