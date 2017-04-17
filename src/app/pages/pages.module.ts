import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';

import { Pages } from './pages.component';
import {CanActivateAuthGuard} from "./services/can-activate.authguard";
import {AuthenticationService} from "./services/authentication.service";

@NgModule({
  imports: [CommonModule, NgaModule, routing],
  declarations: [Pages],
  providers: [CanActivateAuthGuard, AuthenticationService]
})
export class PagesModule {
}
