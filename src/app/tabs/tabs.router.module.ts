import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { UserLoginComponent} from '../user-login/user-login.component';
import { WeightStatsComponent} from '../weight-stats/weight-stats.component';
import { WeightAddComponent} from '../weight-add/weight-add.component';
import { WeightUpdateComponent} from '../weight-update/weight-update.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'user-login',
        //redirectTo: '/tabs/(user-login:user-login)',
        pathMatch: 'full',
      },
      {
        path: 'user-login',
        outlet: 'user-login',
        component: UserLoginComponent
      },
      {
        path: 'weight-stats',
        outlet: 'weight-stats',
        component: WeightStatsComponent
      },
      {
        path: 'weight-add',
        outlet: 'weight-add',
        component: WeightAddComponent
      },
      {
        path: 'weight-update',
        outlet: 'weight-update',
        component: WeightUpdateComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(user-login:user-login)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
