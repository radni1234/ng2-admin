import {NgModule, ModuleWithProviders} from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import {TranslateModule, TranslateService, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";



@NgModule({
  imports: [TranslateModule],
  exports: [TranslateModule],
  providers: []
})
export class AppTranslationModule {

  static forRoot(): ModuleWithProviders {

    function translateLoader(http: Http) {
      return new TranslateStaticLoader(http, 'i18n', '.json');
    }
    return {
      ngModule: AppTranslationModule,
      providers: [{
        provide: TranslateLoader,
        useFactory: translateLoader,
        deps: [Http]
      },
        TranslateService],
    };
  }

  // static forRoot(): ModuleWithProviders{
  //   return{
  //     ngModule: AppTranslationModule,
  //     providers:[TranslateService]
  //   }
  // }
  // constructor(private translate: TranslateService) {
  //   translate.addLangs(["en"]);
  //   translate.setDefaultLang('en');
  //   translate.use('en');
  // }
}
