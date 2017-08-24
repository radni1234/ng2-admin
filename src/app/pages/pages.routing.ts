import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import {CanActivateAuthGuard} from "./services/can-activate.authguard";
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
  {
    path: 'register',
    loadChildren: () => System.import('./register/register.module')
  },
  {
    path: 'pages',
    component: Pages,
    canActivate: [CanActivateAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'editors', loadChildren: () => System.import('./editors/editors.module') },
      //{ path: 'components', loadChildren: () => System.import('./components/components.module') }
      { path: 'charts', loadChildren: () => System.import('./charts/charts.module') },
      { path: 'ui', loadChildren: () => System.import('./ui/ui.module') },
      { path: 'forms', loadChildren: () => System.import('./forms/forms.module') },
      { path: 'tables', loadChildren: () => System.import('./tables/tables.module') },
      { path: 'maps', loadChildren: () => System.import('./maps/maps.module') },
      { path: 'admin',  loadChildren: () => System.import('./admin/admin.module') },
      { path: 'javniobjekti',  loadChildren: () => System.import('./javniobjekti/javniobjekti.module') },
      { path: 'izvestaji',  loadChildren: () => System.import('./izvestaji/izvestaji.module') },
      { path: 'daljinskogrejanje',  loadChildren: () => System.import('./daljinskogrejanje/daljinskogrejanje.module') },
      { path: 'javnarasveta',  loadChildren: () => System.import('./javnarasveta/javnarasveta.module') },
      { path: 'voznipark',  loadChildren: () => System.import('./voznipark/voznipark.module') },
      { path: 'vodosnabdevanje',  loadChildren: () => System.import('./vodosnabdevanje/vodosnabdevanje.module') }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
