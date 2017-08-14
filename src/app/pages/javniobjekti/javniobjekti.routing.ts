import { Routes, RouterModule }  from '@angular/router';
import { JavniObjektiComponent } from './javniobjekti.component.ts';
import {ObjektiComponent} from "./components/objekti/objekti.component";
import {ObjekatComponent} from "./components/objekti/objekat.component";
import {ObjekatTabComponent} from "./components/objekti/objekat_tabovi.component";
import {EfekatPrimMera} from "./components/grafici/efek_prim_mera.component";
import {Cusum} from "./components/grafici/cusum.component";
import {Rasturanje} from "./components/grafici/rasturanje.component";
import {EnergyMix} from "./components/grafici/energymix.component";
import {EnergyMixPie} from "./components/grafici/energymixpie.component";
import {SelectionTool} from "../shared/components/selection_tool/selection_tool.component";
import {CanActivateAuthGuard} from "../services/can-activate.authguard";
import {EnergyMixGod} from "./components/grafici/energymixgod.component";
import {FileUploadComponent} from "./components/grafici/file-upload.component";


const routes: Routes = [
  {
    path: '',
    component: JavniObjektiComponent,
    children: [
      { path: 'objekti', component: ObjektiComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'objekat', component: ObjekatComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'objekat_tab', component: ObjekatTabComponent, canActivate: [CanActivateAuthGuard] },
      { path: 'grafici', component: EfekatPrimMera, canActivate: [CanActivateAuthGuard] },
      { path: 'cusum', component: Cusum, canActivate: [CanActivateAuthGuard] },
      { path: 'rasturanje', component: Rasturanje, canActivate: [CanActivateAuthGuard] },
      { path: 'energymix', component: EnergyMix, canActivate: [CanActivateAuthGuard] },
      { path: 'energymixgod', component: EnergyMixGod, canActivate: [CanActivateAuthGuard] },
      { path: 'energymixpie', component: EnergyMixPie, canActivate: [CanActivateAuthGuard] },
      { path: 'selectiontool', component: SelectionTool, canActivate: [CanActivateAuthGuard] },
      { path: 'fileupload', component: FileUploadComponent, canActivate: [CanActivateAuthGuard] },

    ]
  }
];

export const routing = RouterModule.forChild(routes);
