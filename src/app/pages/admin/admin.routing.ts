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
import {TipSvetiljkeComponent} from "./components/tip_svetiljke/tip_svetiljke.component";
import {TipStubaComponent} from "./components/tip_stuba/tip_stuba.component";
import {EnergentTipComponent} from "./components/energent_tip/energent_tip.component";
import {BrojiloTipComponent} from "./components/brojilo_tip/brojilo_tip.component";
import {RezimMerenjaComponent} from "./components/rezim_merenja/rezim_merenja.component";
import {EnergentComponent} from "./components/energent/energent.component";
import {BrojiloVrstaComponent} from "./components/brojilo_vrsta/brojilo_vrsta.component";
import {TipRacunaComponent} from "./components/racun_tip/tip_racuna.component";
import {KolonaTipComponent} from "./components/kolona_tip/kolona_tip.component";
import {DobavljacComponent} from "./components/dobavljac/dobavljac.component";

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
      { path: 'tip_svetiljke', component: TipSvetiljkeComponent },
      { path: 'tip_stuba', component: TipStubaComponent },
      { path: 'energent_tip', component: EnergentTipComponent },
      { path: 'brojilo_tip', component: BrojiloTipComponent },
      { path: 'brojilo_vrsta', component: BrojiloVrstaComponent },
      { path: 'rezim_merenja', component: RezimMerenjaComponent },
      { path: 'energent', component: EnergentComponent },
      { path: 'tip_racuna', component: TipRacunaComponent },
      { path: 'kolona_tip', component: KolonaTipComponent },
      { path: 'dobavljac', component: DobavljacComponent },

    ]
  }
];

export const routing = RouterModule.forChild(routes);
