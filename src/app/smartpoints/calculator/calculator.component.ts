import { Component, OnInit } from '@angular/core';
import { NutritionService } from '../../api/nutrition.service'; 
import { Nutrition } from 'src/app/model/Nutrition';
import { NutritionType } from 'src/app/model/NutritionType';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})

export class CalculatorComponent implements OnInit {

  nutrition: string;
  unit: string;
  quantity: number;
  calories: number;
  carbs: number;
  sugar: number;
  fiber: number;
  fat: number;
  saturatedFat: number;
  protein: number;
  zeroPoints: boolean;
  nutritionType: NutritionType;
  nutritionTypeList: Array<NutritionType>;
  smartPoints: number;
  showPoints: boolean;
  searchText: string;
  sp_box: boolean;
  sat_fat_box: boolean;
  fiber_box: boolean;
  message;
  nutritionList: Array<Nutrition>;

  constructor(private nutritionService: NutritionService) {
    this.showPoints = false;
    this.nutrition = '';
    this.unit = 'gram';
    this.quantity = 100;
    this.calories = 0;
    this.carbs = 0;
    this.sugar = 0;
    this.fat = 0;
    this.fiber = 0;
    this.saturatedFat = 0;
    this.protein = 0;
    this.zeroPoints = false;
    this.smartPoints = 0;
    this.searchText = null;
    this.sp_box = true;
    this.sat_fat_box = false;
    this.fiber_box = false;
    this.message = {'errorCode' : 0, 'message' : ""};
    this.nutritionService.getNutritionTypeList().subscribe(data => {
      this.nutritionTypeList = data;
      this.nutritionType = this.nutritionTypeList[0];
    });
    this.getNutritionList();
  }

  public calculate() { 
    if(this.zeroPoints === true) {
      this.smartPoints = 0;
    }
    else {
      if( isNaN(this.calories) || isNaN(this.saturatedFat) || isNaN(this.sugar) || isNaN(this.protein) ) {
        console.log('nan');
      }
      else {
        this.smartPoints = Number(Math.round(this.calories * 0.0305 + this.saturatedFat * 0.275 + this.sugar * 0.12 - this.protein * 0.098)); 
      }
    }
    this.showPoints = true;
  }

  public addNutrition() {
    if(isNaN(this.calories) || isNaN(this.carbs) || 
      isNaN(this.sugar) || isNaN(this.fiber) || 
      isNaN(this.fat) || isNaN(this.saturatedFat) || 
      isNaN(this.quantity) || isNaN(this.protein) ) {
      this.message.message = 'Er zijn letters ingevuld ipv cijfers';
    }
    else if( !this.nutrition) {
      this.message.message = 'De naam van het voedingsmiddel ontbreekt';
    }
    else {    
      var nutrition = new Nutrition();
      nutrition.name = this.nutrition;
      nutrition.unit = this.unit;
      nutrition.quantity = this.quantity;
      nutrition.calories = this.calories;
      nutrition.carbs = this.carbs;
      nutrition.sugar = this.sugar;
      nutrition.fiber = this.fiber;
      nutrition.fat = this.fat;
      nutrition.saturatedFat = this.saturatedFat;
      nutrition.protein = this.protein;
      nutrition.zeroPoints = this.zeroPoints;
      nutrition.smartPoints = this.smartPoints;
      nutrition.nutritionType = this.nutritionType;
      this.nutritionService.addNutrition(nutrition).subscribe(data => {
        this.message = data.body;
      });
    }
  }

  public getNutritionList() {
    this.nutritionService.getNutritionList().subscribe(data => {
      this.nutritionList = data; 
    });
  }

  ngOnInit() {}

}
