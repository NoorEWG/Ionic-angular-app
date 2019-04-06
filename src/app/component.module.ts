import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeightStatsComponent } from './weight-stats/weight-stats.component';
//import { WeightAddComponent } from './weight-add/weight-add.component';
//import { WeightUpdateComponent } from './weight-update/weight-update.component';
import { WeightLossDataComponent } from './weight-loss-data/weight-loss-data.component';
import { WeightLossImgComponent } from './weight-loss-img/weight-loss-img.component';
import { WeightLossBadgesComponent } from './weight-loss-badges/weight-loss-badges.component';
import { WeightLossGraphComponent } from './weight-loss-graph/weight-loss-graph.component';
import { WeightLossOverviewComponent } from './weight-loss-overview/weight-loss-overview.component';
import { WeightLossPieChartComponent } from './weight-loss-pie-chart/weight-loss-pie-chart.component';

@NgModule({
  declarations: [
    WeightStatsComponent,
    //WeightAddComponent,
    //WeightUpdateComponent,
    WeightLossDataComponent,
    WeightLossImgComponent,
    WeightLossBadgesComponent,
    WeightLossGraphComponent,
    WeightLossOverviewComponent,
    WeightLossPieChartComponent
  ],
  exports: [
    WeightStatsComponent,
    //WeightAddComponent,
    //WeightUpdateComponent,
    WeightLossDataComponent,
    WeightLossImgComponent,
    WeightLossBadgesComponent,
    WeightLossGraphComponent,
    WeightLossOverviewComponent,
    WeightLossPieChartComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ]
})
export class ComponentModule {}
