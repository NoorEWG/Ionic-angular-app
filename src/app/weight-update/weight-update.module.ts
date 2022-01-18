import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { WeightObjectifUpdateComponent } from '../weight-objectif-update/weight-objectif-update.component';
import { AddEditNutritionComponent } from '../nutrition/add-edit-nutrition/add-edit-nutrition.component';
import { CalculatorComponent } from '../smartpoints/calculator/calculator.component';
import { IonicModule } from '@ionic/angular';
import { WeightUpdateComponent } from './weight-update.component';
import { MonthYearPipe } from 'src/app/month-year.pipe';
import { MealPipe } from 'src/app/meal.pipe';
import { NutritionPipe } from 'src/app/nutrition.pipe';
import { FilterNutritionPipe } from 'src/app/filter-nutrition.pipe';

const routes: Routes = [
  {
    path: '',
    component: WeightUpdateComponent
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
  declarations: [
    WeightUpdateComponent, 
    WeightObjectifUpdateComponent,
    AddEditNutritionComponent,
    CalculatorComponent,
    MonthYearPipe,
    MealPipe,
    NutritionPipe,
    FilterNutritionPipe
  ],
  providers: [MonthYearPipe, MealPipe, NutritionPipe, FilterNutritionPipe],
  exports: [MonthYearPipe, MealPipe, NutritionPipe, FilterNutritionPipe]
})
export class WeightUpdateModule {}
