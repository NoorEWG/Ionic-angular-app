import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from './component.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { WeightStatsComponent } from './weight-stats/weight-stats.component'; 
import { WeightUpdateComponent } from './weight-update/weight-update.component'; 

const routes: Routes = [
  { path: 'home', component:  UserLoginComponent },
  { path: 'weight-stats', component: WeightStatsComponent },
  { path: 'weight-stats/:graph', component: WeightStatsComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'weight-update',  component: WeightUpdateComponent },
  { path: '', redirectTo: 'user-login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule, CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, ComponentModule],
  declarations: [UserLoginComponent, WeightUpdateComponent, WeightStatsComponent]
})
export class AppRoutingModule {}
