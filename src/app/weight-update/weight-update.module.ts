import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { WeightUpdateComponent } from '../weight-update/weight-update.component';
import { IonicModule } from '@ionic/angular';
import { WeightUpdatePage } from './weight-update.page';

const routes: Routes = [
  {
    path: '',
    component: WeightUpdatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeightUpdatePage,WeightUpdateComponent]
})
export class WeightUpdatePageModule {}
