import { NutritionType } from './NutritionType';

export class Nutrition {

    id: number;
    name: string;
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
    smartPoints: number;
    nutritionType: NutritionType;
  
    constructor() {}

}