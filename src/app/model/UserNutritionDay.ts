import { MealType } from './MealType';
import { UserData } from './UserData';
import { Nutrition } from './Nutrition';

export class UserNutritionDay {

    user: UserData;
    nutrition: Nutrition;
    mealType: MealType;
    quantity: number;
    date;

    constructor() {}

}