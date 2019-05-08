import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserLoginPage } from './user-login.page';
import { UserLoginComponent } from '../user-login/user-login.component';
import { HealthComponent} from '../health/health.component';

const routes: Routes = [
  {
    path: '',
    component: UserLoginPage
  }
];

@NgModule({
  declarations: [
    UserLoginPage,
    UserLoginComponent,
    HealthComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
})

export class UserLoginPageModule {}
