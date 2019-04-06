import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WeightAddPage } from './weight-add.page';
import { WeightAddComponent } from './weight-add.component';

const routes: Routes = [
  {
    path: '',
    component: WeightAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeightAddPage, WeightAddComponent]
})
export class WeightAddPageModule {}
