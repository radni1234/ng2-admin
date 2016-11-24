import { Routes, RouterModule }  from '@angular/router';
import { AdminComponent } from './admin.component';
import {Korisnici} from "./components/korisnici/korisnici.component.ts";
import {Korisnik} from "./components/korisnici/korisnik.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'korisnici', component: Korisnici },
      { path: 'korisnik/:id', component: Korisnik },
      { path: 'korisnik', component: Korisnik }

    ]
  }
];

export const routing = RouterModule.forChild(routes);
