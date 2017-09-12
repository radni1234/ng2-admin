import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Login } from './login.component';
import { routing }       from './login.routing';
import {AuthenticationService} from "../services/authentication.service";
import {AppTranslationModule} from "../../app.translation.module";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    AppTranslationModule
  ],
  declarations: [
    Login
  ],
  providers: [
    AuthenticationService
  ]
})
export default class LoginModule {}
