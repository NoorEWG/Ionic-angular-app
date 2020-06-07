import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { UserLoginComponent } from './user-login/user-login.component';
import { WeightStatsComponent } from './weight-stats/weight-stats.component'; 
import { WeightUpdateComponent } from './weight-update/weight-update.component'; 

const routes: Routes = [
  { path: 'home', component:  UserLoginComponent },
  { path: 'weight-stats', component: WeightStatsComponent },
  { path: 'weight-stats/:graph', component: WeightStatsComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'weight-update', component: WeightUpdateComponent },
  { path: '', redirectTo: 'user-login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
