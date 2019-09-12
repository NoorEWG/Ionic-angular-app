import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as moment from 'moment'; 
import { NutritionService } from '../../api/nutrition.service'; 
import { Nutrition } from 'src/app/model/Nutrition';
import { NutritionData } from 'src/app/model/NutritionData';
import { MealType } from 'src/app/model/MealType';
import { UserNutritionDay } from 'src/app/model/UserNutritionDay';
import { UserData } from 'src/app/model/UserData';


@Component({
  selector: 'app-add-edit-nutrition',
  templateUrl: './add-edit-nutrition.component.html',
  styleUrls: ['./add-edit-nutrition.component.scss'],
})
export class AddEditNutritionComponent {
  
  nutrition: Nutrition;
  nutritionList: Array<Nutrition>;
  nutritionData: Array<NutritionData>;
  allNutritionData: Array<NutritionData>;
  breakfastNutritionData: Array<NutritionData>;
  lunchNutritionData: Array<NutritionData>;
  dinerNutritionData: Array<NutritionData>;
  otherNutritionData: Array<NutritionData>;
  mealType: MealType;
  mealTypeUpdate: string;
  mealTypeList: Array<MealType>;
  quantity: number;
  quantityChange: number;
  user: UserData;
  userNutritionDay: UserNutritionDay;
  auth: boolean;
  date: string;
  selectedMealType: number;
  caloriesData;
  neededCalories: number;
  message;

  constructor(private nutritionService: NutritionService, 
    private storage: Storage) {
    this.nutrition = new Nutrition();
    this.nutritionData = new Array<NutritionData>();
    this.allNutritionData = new Array<NutritionData>();
    this.breakfastNutritionData = new Array<NutritionData>();
    this.lunchNutritionData = new Array<NutritionData>();
    this.dinerNutritionData = new Array<NutritionData>();
    this.otherNutritionData = new Array<NutritionData>();
    this.mealType = new MealType();
    this.mealTypeUpdate = "";
    this.selectedMealType = 1;
    this.user = new UserData();
    this.quantity = 1;
    this.date = moment(new Date()).format("YYYY-MM-DD");
    this.userNutritionDay = new UserNutritionDay();
    this.neededCalories = 0;
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

    this.storage.get('user').then((val) => {
      if(val) {
        this.auth = true;
        this.user = val;
        this.userNutritionDay.user = this.user;
        this.neededCalories = Math.round((477.593 + 9.247 * Number(this.user.currentWeight) + 3.098 * Number(this.user.length*100) - 4.33 * Number(this.user.age)) * 1.2);
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
      this.allNutritionData = data;
      let total = new NutritionData();
      total.name = 'dag totaal';
      let breakfast = new NutritionData();
      breakfast.name = 'ontbijt totaal';
      let lunch = new NutritionData();
      lunch.name = 'lunch totaal';
      let diner = new NutritionData();
      diner.name = 'diner totaal';
      let other = new NutritionData();
      other.name = 'tussendoortjes totaal';
      let dayCalories = 0;
      let daySmartPoints = 0;
      let breakfastCalories = 0;
      let breakfastSmartPoints = 0;
      let lunchCalories = 0;
      let lunchSmartPoints = 0;
      let dinerCalories = 0;
      let dinerSmartPoints = 0;
      let otherCalories = 0;
      let otherSmartPoints = 0;
      let breakfastNutritionData = new Array<NutritionData>();
      let lunchNutritionData = new Array<NutritionData>();
      let dinerNutritionData = new Array<NutritionData>();
      let otherNutritionData = new Array<NutritionData>();
      this.allNutritionData.forEach( function(item) {
        dayCalories = dayCalories + Number(item.calories);
        daySmartPoints = daySmartPoints + Number(item.smartPoints);
        if ( item.mealType === 'ontbijt') {
          breakfastCalories = breakfastCalories + Number(item.calories);
          breakfastSmartPoints = breakfastSmartPoints + Number(item.smartPoints);
          breakfastNutritionData.push(item);
        }
        if ( item.mealType === 'lunch') {
          lunchCalories = lunchCalories + Number(item.calories);
          lunchSmartPoints = lunchSmartPoints + Number(item.smartPoints);
          lunchNutritionData.push(item);
        }
        if ( item.mealType === 'diner') {
          dinerCalories = dinerCalories + Number(item.calories);
          dinerSmartPoints = dinerSmartPoints + Number(item.smartPoints);
          dinerNutritionData.push(item);
        }
        if ( item.mealType === 'tussendoortjes') {
          otherCalories = otherCalories + Number(item.calories);
          otherSmartPoints = otherSmartPoints + Number(item.smartPoints);
          otherNutritionData.push(item);
        }
      });
      total.calories = dayCalories;
      total.smartPoints = daySmartPoints;
      this.allNutritionData.push(total);
      this.nutritionData = this.allNutritionData;

      this.breakfastNutritionData = breakfastNutritionData;
      breakfast.calories = breakfastCalories;
      breakfast.smartPoints = breakfastSmartPoints;
      this.breakfastNutritionData.push(breakfast);
      
      this.lunchNutritionData = lunchNutritionData;
      lunch.calories = lunchCalories;
      lunch.smartPoints = lunchSmartPoints;
      this.lunchNutritionData.push(lunch);
      
      this.dinerNutritionData = dinerNutritionData;
      diner.calories = dinerCalories;
      diner.smartPoints = dinerSmartPoints;
      this.dinerNutritionData.push(diner);

      this.otherNutritionData = otherNutritionData;
      other.calories = otherCalories;
      other.smartPoints = otherSmartPoints;
      this.otherNutritionData.push(other);

      this.getCaloriesData();

    });
  }

  public getCaloriesData() {
    this.nutritionService.getCaloriesData(this.user.id).subscribe(data => {
      this.caloriesData = data;
    });  
  }

  public changeNutritionData() {
    this.getNutritionData();
  }

  public changeMealNutritionData() {
    if ( this.selectedMealType == 1) { 
      this.nutritionData = this.allNutritionData;     
    }
    else if ( this.selectedMealType == 2) { 
      this.nutritionData = this.breakfastNutritionData;     
    }
    else if ( this.selectedMealType == 3) { 
      this.nutritionData = this.lunchNutritionData;     
    }
    else if ( this.selectedMealType == 4) { 
      this.nutritionData = this.dinerNutritionData;     
    }
    else { 
      this.nutritionData = this.otherNutritionData;     
    }
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
