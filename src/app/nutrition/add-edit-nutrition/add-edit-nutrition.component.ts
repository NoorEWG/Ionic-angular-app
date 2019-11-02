import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as moment from 'moment'; 
import { NutritionService } from '../../api/nutrition.service'; 
import { Nutrition } from 'src/app/model/Nutrition';
import { NutritionData } from 'src/app/model/NutritionData';
import { MealType } from 'src/app/model/MealType';
import { NutritionType } from 'src/app/model/NutritionType';
import { UserNutritionDay } from 'src/app/model/UserNutritionDay';
import { UserData } from 'src/app/model/UserData';
import { FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-edit-nutrition',
  templateUrl: './add-edit-nutrition.component.html',
  styleUrls: ['./add-edit-nutrition.component.scss']
})

export class AddEditNutritionComponent {
    
  nutrition: Nutrition;
  nutritionList: Array<Nutrition>;
  nutritionData: Array<NutritionData>;
  totalNutrition: NutritionData;
  queryString: string;
  mealType: MealType;
  mealTypeUpdate: string;
  mealTypeList: Array<MealType>;
  nutritionType: NutritionType;
  nutritionTypeList: Array<NutritionType>;
  quantity: number;
  quantityChange: number;
  unit: string;
  user: UserData;
  userNutritionDay: UserNutritionDay;
  auth: boolean;
  date: string;
  selectedMealType: string;
  selectedCaloriesMonth: string;
  selectedCaloriesYear: string;
  caloriesData;
  months;
  years: Array<Number>;
  message;
  myControl;

  constructor(private nutritionService: NutritionService, private storage: Storage) {  
    this.nutrition = new Nutrition();
    this.selectedCaloriesMonth = moment(new Date()).format("MM");
    this.selectedCaloriesYear =  moment(new Date()).format("YYYY");
    this.months = [
      { "number": 1, "name": "Januari" }, 
      { "number": 2, "name": "Februari" }, 
      { "number": 3, "name": "Maart" }, 
      { "number": 4, "name": "April" }, 
      { "number": 5, "name": "Mei" }, 
      { "number": 6, "name": "Juni" }, 
      { "number": 7, "name": "Juli" }, 
      { "number": 8, "name": "Augustus" }, 
      { "number": 9, "name": "September" }, 
      { "number": 10, "name": "Oktober" }, 
      { "number": 11, "name": "November" }, 
      { "number": 12, "name": "December" }, 
    ];
    this.years = new Array<Number>();
    let year = Number(this.selectedCaloriesYear) - 10;
    while (year <= Number(this.selectedCaloriesYear)) {
      this.years.push(year);
      year++;
    }  
    this.nutritionData = new Array<NutritionData>();
    this.totalNutrition = new NutritionData();
    this.mealType = new MealType();
    this.mealTypeUpdate = "";
    this.selectedMealType = "alles";
    this.user = new UserData();
    this.quantity = 0;
    this.unit = "";
    this.date = moment(new Date()).format("YYYY-MM-DD");
    this.userNutritionDay = new UserNutritionDay();
    this.caloriesData = { 'caloriesPerDay' : null };
    this.message = { 'errorCode' : 0, 'message' : ''};
    this.myControl = new FormControl();

    this.nutritionService.getNutritionList().subscribe(data => {
      this.nutritionList = data;
      this.nutrition = this.nutritionList[0];
    });
    this.nutritionService.getMealTypeList().subscribe(data => {
      this.mealTypeList = data;
      this.mealType = this.mealTypeList[0];
    });
    this.nutritionService.getNutritionTypeList().subscribe(data => {
      this.nutritionTypeList = data;
      this.nutritionType = this.nutritionTypeList[0];
    });

    this.storage.get('user').then((val) => {
      if(val) {
        this.auth = true;
        this.user = val;
        this.userNutritionDay.user = this.user;
        this.getNutritionData();
        this.getCaloriesData();
      }
      else {
        this.auth = false;
        this.user = null;
      } 
    });
  }

  public addUserNutrition() {
    this.userNutritionDay.nutrition = this.nutrition;
    this.userNutritionDay.quantity = Math.round(Number(this.quantity) * 100 / Number(this.nutrition.quantity)) / 100;
    this.userNutritionDay.date = this.date;
    this.userNutritionDay.mealType = this.mealType;
    this.nutritionService.addNutritionItem(this.userNutritionDay).subscribe(data => {
      this.message = data.body;
      this.nutrition = null;
      this.quantity = 0;
      this.unit = ""
      this.queryString = "";
      this.getNutritionData();
    });
  }

  public getNutritionData() {
    this.nutritionService.getNutritionData(this.user, this.date).subscribe(data => {
      this.nutritionData = data;
      let total = new NutritionData();
      total.name = 'totaal';
      total.mealType = this.selectedMealType;
      let dayCalories = 0;
      let daySmartPoints = 0;
      let dayFat = 0;
      let dayFiber = 0;
      let dayCarbs = 0;
      let dayProtein = 0;
      this.nutritionData.forEach( function(item) {
        if(item.mealType === total.mealType || total.mealType === "alles") {
          dayCalories = dayCalories + Number(item.calories);
          daySmartPoints = daySmartPoints + Number(item.smartPoints);
          dayFat = dayFat + Number(item.fat);
          dayFiber = dayFiber + Number(item.fiber);
          dayCarbs = dayCarbs + Number(item.carbs);
          dayProtein = dayProtein + Number(item.protein);
        }
      });
      total.calories = dayCalories;
      total.smartPoints = daySmartPoints;
      total.carbs = dayCarbs;
      total.fat = dayFat;
      total.fiber = dayFiber;
      total.protein = dayProtein;
      this.totalNutrition = total;
      this.getCaloriesData();
    });
  }

  public getCaloriesData() {
    let minCalories = Math.round((477.593 + 9.247 * Number(this.user.currentWeight) + 3.098 * Number(this.user.length*100) - 4.33 * Number(this.user.age)) * 1.2);
    this.nutritionService.getCaloriesData(this.user.id).subscribe(data => {
      this.caloriesData = data;
      let valuesPerDay = this.caloriesData.valuesPerDay;
      let fitbitPerDay = this.caloriesData.fitbitCalories;
      this.caloriesData.minCalories = minCalories;

      valuesPerDay.forEach( function(item) {
        let i = 0;
        item.fitbitCalories = 0;
        // add the fitbit calories
        while (i < fitbitPerDay.length) {
          if ( fitbitPerDay[i].date === item.date) {
            item.fitbitCalories = fitbitPerDay[i].fitbitCalories;
            i = fitbitPerDay.length;
          }
          else {
            i++
          }
        }
        // if there is no fitbitdata, we take the minimum required calories per day
        if (item.fitbitCalories == 0) {
          item.fitbitCalories = minCalories;
        } 
      });
      valuesPerDay = 
      this.caloriesData.valuesPerDay = valuesPerDay;
    });  
  }

  public changeNutritionData() {
    this.getNutritionData();
  }

  public editNutrition(nutrition) {
    nutrition.quantityChange = nutrition.quantity;
    nutrition.mealTypeUpdate = nutrition.mealType;
    nutrition.editNutrition = false;
    nutrition.deleteNutrition = true;
  }

  public saveNutrition(nutrition) {
    let quantity = Math.round( (Number(nutrition.quantityChange) / Number(nutrition.quantityBase)) * 100 ) / 100;
    this.nutritionService.editUserNutritionItem(nutrition.nutritionDayId, quantity, nutrition.mealTypeUpdate).subscribe(data => {
      nutrition.editNutrition = true;
      nutrition.deleteNutrition = true;
      this.getNutritionData();
    });
  }

  public deleteNutrition(nutrition) {
    nutrition.deleteNutrition = false;
    nutrition.editNutrition = true;
  }

  public confirmNutrition(nutrition) {
    this.nutritionService.deleteUserNutritionItem(nutrition.nutritionDayId, this.user.id).subscribe(data => {
      this.getNutritionData();
      nutrition.deleteNutrition = true;
      nutrition.editNutrition = true;
    });
  }

  displayFn(nutrition) {
    if(nutrition) {
      this.nutrition = nutrition;
      this.quantity = nutrition.quantity;
      this.unit = nutrition.unit;
      //return nutrition.name + " (" + nutrition.quantity + " " +  nutrition.unit + ")";
      return nutrition.name;
    }
  }

}
