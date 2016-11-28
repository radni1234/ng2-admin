import { Routes, RouterModule }  from '@angular/router';
import { AdminComponent } from './admin.component';
import {Korisnici} from "./components/korisnici/korisnici.component.ts";
import {Korisnik} from "./components/korisnici/korisnik.component";
import {JediniceMere} from "./components/Jedinice_mere/jedinice_mere.component";
import {OpstinaComponent} from "./components/opstina/opstina.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'korisnici', component: Korisnici },
      { path: 'korisnik/:id', component: Korisnik },
      { path: 'korisnik', component: Korisnik },
      { path: 'jedinice_mere', component: JediniceMere },
      { path: 'opstina', component: OpstinaComponent }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
