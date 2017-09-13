import { Routes, RouterModule }  from '@angular/router';
import { AdminComponent } from './admin.component';
import {Korisnici} from "./components/korisnik/korisnici.component";
import {Korisnik} from "./components/korisnik/korisnik.component";
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
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {JavnoPreduzeceComponent} from "./components/javno_preduzece/javno_preduzece.component";


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'korisnik', component: Korisnici, canActivate: [CanActivateAuthGuard] },
      // { path: 'korisnik/:id', component: Korisnik, canActivate: [CanActivateAuthGuard] },
      // { path: 'korisnik', component: Korisnik, canActivate: [CanActivateAuthGuard] },
      { path: 'jedinice_mere', component: JediniceMereComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'opstina', component: OpstinaComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'uloga', component: UlogaComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'grupe', component: GrupaComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'nacin_finansiranja', component: NacinFinansiranjaComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'godine', component: GodinaComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'stepen_dani', component: StepenDaniComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'tip_svetiljke', component: TipSvetiljkeComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'tip_stuba', component: TipStubaComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'energent_tip', component: EnergentTipComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'brojilo_tip', component: BrojiloTipComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'brojilo_vrsta', component: BrojiloVrstaComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'rezim_merenja', component: RezimMerenjaComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'energent', component: EnergentComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'tip_racuna', component: TipRacunaComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'kolona_tip', component: KolonaTipComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'dobavljac', component: DobavljacComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'javno_preduzece', component: JavnoPreduzeceComponent, canActivate: [CanActivateAuthGuard] }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
