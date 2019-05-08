import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WeightStatsPage } from './weight-stats.page';
import { ComponentModule} from '../component.module';


const routes: Routes = [
  {
    path: '',
    component: WeightStatsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    WeightStatsPage
  ]
})

export class WeightStatsPageModule {}


