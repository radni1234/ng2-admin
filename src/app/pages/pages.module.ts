import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import {CanActivateAuthGuard} from "./services/can-activate.authguard";
import {AuthenticationService} from "./services/authentication.service";
import {TranslateModule, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';


@NgModule({
  imports: [CommonModule, NgaModule, routing, TranslateModule],
  exports: [TranslateModule],
  declarations: [Pages],
  providers: [CanActivateAuthGuard, AuthenticationService]
})
export class PagesModule {
}
