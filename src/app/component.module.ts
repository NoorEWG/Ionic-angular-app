import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeightLossDataComponent } from './weight-loss-data/weight-loss-data.component';
import { WeightLossImgComponent } from './weight-loss-img/weight-loss-img.component';
import { WeightLossBadgesComponent } from './weight-loss-badges/weight-loss-badges.component';
import { WeightLossGraphComponent } from './weight-loss-graph/weight-loss-graph.component';
import { WeightLossOverviewComponent } from './weight-loss-overview/weight-loss-overview.component';
import { WeightLossPieChartComponent } from './weight-loss-pie-chart/weight-loss-pie-chart.component';
import { WeightLossGaugeComponent } from './weight-loss-gauge/weight-loss-gauge.component';
import { WeightLossMonthDataComponent } from './weight-loss-month-data/weight-loss-month-data.component';
import { WeightObjectifsComponent} from './weight-objectifs/weight-objectifs.component';
import { WeightLossWeightBmiDataComponent} from './weight-loss-weight-bmi-data/weight-loss-weight-bmi-data.component';
import { WeightObjectifUpdateComponent } from './weight-objectif-update/weight-objectif-update.component';
import { WeightUpdateWeightComponent } from './weight-update/weight-update-weight.component';
import { AddEditNutritionComponent } from './nutrition/add-edit-nutrition/add-edit-nutrition.component';
import { CalculatorComponent } from './smartpoints/calculator/calculator.component';
import { MonthYearPipe } from './month-year.pipe';
import { MealPipe } from 'src/app/meal.pipe';
import { NutritionPipe } from 'src/app/nutrition.pipe';
import { FilterNutritionPipe } from 'src/app/filter-nutrition.pipe';
import { YearPipe } from './year.pipe';
import { ObjectifPipe } from './objectif.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    WeightLossDataComponent,
    WeightLossImgComponent,
    WeightLossBadgesComponent,
    WeightLossMonthDataComponent,
    WeightLossGraphComponent,
    WeightLossOverviewComponent,
    WeightLossPieChartComponent,
    WeightLossGaugeComponent,
    WeightObjectifsComponent,
    WeightLossWeightBmiDataComponent,
    WeightObjectifUpdateComponent,
    WeightUpdateWeightComponent,
    AddEditNutritionComponent,
    CalculatorComponent,
    MonthYearPipe,
    MealPipe,
    NutritionPipe,
    FilterNutritionPipe,
    YearPipe,
    ObjectifPipe
  ],
  exports: [
    WeightLossDataComponent,
    WeightLossImgComponent,
    WeightLossBadgesComponent,
    WeightLossMonthDataComponent,
    WeightLossGraphComponent,
    WeightLossOverviewComponent,
    WeightLossPieChartComponent,
    WeightLossGaugeComponent,
    WeightObjectifsComponent,
    WeightLossWeightBmiDataComponent, 
    WeightObjectifUpdateComponent,
    WeightUpdateWeightComponent,
    AddEditNutritionComponent,
    CalculatorComponent,
    MonthYearPipe,
    MealPipe,
    NutritionPipe,
    FilterNutritionPipe,
    YearPipe
  ],
  imports: [
    IonicModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [MonthYearPipe, MealPipe, NutritionPipe, FilterNutritionPipe, YearPipe, ObjectifPipe]
})
export class ComponentModule {}
