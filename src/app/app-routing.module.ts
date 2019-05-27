import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'weight-stats', pathMatch: 'full' },
  { path: 'home', loadChildren:  './user-login/user-login.module#UserLoginPageModule' },
  { path: 'weight-stats', loadChildren: './weight-stats/weight-stats.module#WeightStatsPageModule' },
  { path: 'weight-stats/:graph', loadChildren: './weight-stats/weight-stats.module#WeightStatsPageModule' },
  { path: 'user-login', loadChildren: './user-login/user-login.module#UserLoginPageModule' },
  //{ path: 'weight-add', loadChildren: './weight-add/weight-add.module#WeightAddPageModule' },
  { path: 'weight-update', loadChildren: './weight-update/weight-update.module#WeightUpdatePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
