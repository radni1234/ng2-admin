import { Routes, RouterModule }  from '@angular/router';
import { AdminComponent } from './admin.component';
import {Korisnici} from "./components/korisnici/korisnici.component.ts";
import {Korisnik} from "./components/korisnici/korisnik.component";
import {JediniceMereComponent} from "./components/jedinice_mere/jedinice_mere.component";
import {OpstinaComponent} from "./components/opstina/opstina.component";
import {UlogaComponent} from "./components/uloga/uloga.component";
import {GrupaComponent} from "./components/grupe/grupa.component";
import {NacinFinansiranjaComponent} from "./components/nacin_finansiranja/nacin_finansiranja.component";
import {GodinaComponent} from "./components/godine/godine.component";
import {StepenDaniComponent} from "./components/stepen_dani/stepen_dani.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'korisnici', component: Korisnici },
      { path: 'korisnik/:id', component: Korisnik },
      { path: 'korisnik', component: Korisnik },
      { path: 'jedinice_mere', component: JediniceMereComponent },
      { path: 'opstina', component: OpstinaComponent },
      { path: 'uloga', component: UlogaComponent },
      { path: 'grupe', component: GrupaComponent },
      { path: 'nacin_finansiranja', component: NacinFinansiranjaComponent },
      { path: 'godine', component: GodinaComponent },
      { path: 'stepen_dani', component: StepenDaniComponent },

    ]
  }
];

export const routing = RouterModule.forChild(routes);
