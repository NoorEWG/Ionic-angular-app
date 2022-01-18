import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// import { ComponentModule} from '../component.module';
import { AppModule} from '../app.module';
import { WeightStatsComponent } from './weight-stats.component';


const routes: Routes = [
  {
    path: '',
    component: WeightStatsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    WeightStatsComponent
  ]
})

export class WeightStatsPageModule {}


