import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { WeightUpdateComponent } from '../weight-update/weight-update.component';
import { WeightObjectifUpdateComponent } from '../weight-objectif-update/weight-objectif-update.component';
import { AddEditNutritionComponent } from '../nutrition/add-edit-nutrition/add-edit-nutrition.component';
import { CalculatorComponent } from '../smartpoints/calculator/calculator.component';
import { IonicModule } from '@ionic/angular';
import { WeightUpdatePage } from './weight-update.page';
import { MonthYearPipe } from 'src/app/month-year.pipe';
import { MealPipe } from 'src/app/meal.pipe';
import { FilterNutritionPipe } from 'src/app/filter-nutrition.pipe';

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
  declarations: [
    WeightUpdatePage, 
    WeightUpdateComponent, 
    WeightObjectifUpdateComponent,
    AddEditNutritionComponent,
    CalculatorComponent,
    MonthYearPipe,
    MealPipe,
    FilterNutritionPipe
  ],
  providers: [MonthYearPipe, MealPipe, FilterNutritionPipe],
  exports: [MonthYearPipe, MealPipe, FilterNutritionPipe]
})
export class WeightUpdatePageModule {}
