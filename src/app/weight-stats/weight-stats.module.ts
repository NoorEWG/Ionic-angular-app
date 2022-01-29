import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentModule} from '../component.module';
import { WeightStatsComponent } from './weight-stats.component';


const routes: Routes = [
  {
    path: '',
    component: WeightStatsComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    // CommonModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    WeightStatsComponent
  ]
})

export class WeightStatsPageModule {}


