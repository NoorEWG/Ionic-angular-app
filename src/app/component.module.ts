import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeightStatsComponent } from './weight-stats/weight-stats.component';
import { WeightLossDataComponent } from './weight-loss-data/weight-loss-data.component';
import { WeightLossImgComponent } from './weight-loss-img/weight-loss-img.component';
import { WeightLossBadgesComponent } from './weight-loss-badges/weight-loss-badges.component';
import { WeightLossGraphComponent } from './weight-loss-graph/weight-loss-graph.component';
import { WeightLossOverviewComponent } from './weight-loss-overview/weight-loss-overview.component';
import { WeightLossPieChartComponent } from './weight-loss-pie-chart/weight-loss-pie-chart.component';
import { WeightLossMonthDataComponent } from './weight-loss-month-data/weight-loss-month-data.component';
import { WeightObjectifsComponent} from './weight-objectifs/weight-objectifs.component';
import { WeightLossWeightBmiDataComponent} from './weight-loss-weight-bmi-data/weight-loss-weight-bmi-data.component';
import { MonthYearPipe } from './month-year.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    WeightStatsComponent,
    WeightLossDataComponent,
    WeightLossImgComponent,
    WeightLossBadgesComponent,
    WeightLossMonthDataComponent,
    WeightLossGraphComponent,
    WeightLossOverviewComponent,
    WeightLossPieChartComponent,
    WeightObjectifsComponent,
    WeightLossWeightBmiDataComponent
  ],
  exports: [
    WeightStatsComponent,
    WeightLossDataComponent,
    WeightLossImgComponent,
    WeightLossBadgesComponent,
    WeightLossMonthDataComponent,
    WeightLossGraphComponent,
    WeightLossOverviewComponent,
    WeightLossPieChartComponent,
    WeightObjectifsComponent,
    WeightLossWeightBmiDataComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    
  ],
  providers: [MonthYearPipe]

})
export class ComponentModule {}
