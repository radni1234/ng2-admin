import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import {CanActivateAuthGuard} from "./services/can-activate.authguard";
import {AuthenticationService} from "./services/authentication.service";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {AppTranslationModule} from "../app.translation.module";
import {CrudService} from "./services/crud.service";


@NgModule({
  imports: [CommonModule, NgaModule, routing, AppTranslationModule],
  exports: [],
  declarations: [Pages],
  providers: [CanActivateAuthGuard, AuthenticationService, CrudService,]
})
export class PagesModule {
}
