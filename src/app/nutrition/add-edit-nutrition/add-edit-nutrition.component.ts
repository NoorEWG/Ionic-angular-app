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

@Component({
  selector: 'app-add-edit-nutrition',
  templateUrl: './add-edit-nutrition.component.html',
  styleUrls: ['./add-edit-nutrition.component.scss']
})
export class AddEditNutritionComponent {
    
  nutrition: Nutrition;
  nutritionList: Array<Nutrition>;
  nutritionData: Array<NutritionData>;
  queryString: string;
  mealType: MealType;
  mealTypeUpdate: string;
  mealTypeList: Array<MealType>;
  nutritionType: NutritionType;
  nutritionTypeList: Array<NutritionType>;
  quantity: number;
  quantityChange: number;
  user: UserData;
  userNutritionDay: UserNutritionDay;
  auth: boolean;
  date: string;
  selectedMealType: string;
  selectedCaloriesMonth: string;
  selectedCaloriesYear: string;
  caloriesData;
  message;

  constructor(private nutritionService: NutritionService, private storage: Storage) {  
    this.nutrition = new Nutrition();
    this.selectedCaloriesMonth = moment(new Date()).format("MM");
    this.selectedCaloriesYear =  moment(new Date()).format("YYYY");
    this.nutritionData = new Array<NutritionData>();
    this.mealType = new MealType();
    this.mealTypeUpdate = "";
    this.selectedMealType = "alles";
    this.user = new UserData();
    this.quantity = 1;
    this.date = moment(new Date()).format("YYYY-MM-DD");
    this.userNutritionDay = new UserNutritionDay();
    this.caloriesData = { 'caloriesPerDay' : null };
    this.message = { 'errorCode' : 0, 'message' : ''};
  
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
    this.userNutritionDay.quantity = this.quantity;
    this.userNutritionDay.date = this.date;
    this.userNutritionDay.mealType = this.mealType;
    this.nutritionService.addNutritionItem(this.userNutritionDay).subscribe(data => {
      this.message = data.body;
      this.nutrition = null;
      this.quantity = 1;
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
      this.nutritionData.forEach( function(item) {
        dayCalories = dayCalories + Number(item.calories);
        daySmartPoints = daySmartPoints + Number(item.smartPoints);
      });
      total.calories = dayCalories;
      total.smartPoints = daySmartPoints;
      this.nutritionData.push(total);
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
}
