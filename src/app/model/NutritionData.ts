export class NutritionData {

    nutritionDataId: number;
    name: string;
    calories: number;
    carbs: number;
    sugar: number;
    fiber: number;
    fat: number;
    saturatedFat: number;
    protein: number;  
    smartPoints: number;
    zeroPoints: boolean;
    mealType: string;
    mealTypeChange: string;
    quantity: number;
    quantityChange: number;
    quantityBase: number;
    editNutrition: boolean;
    deleteNutrition: boolean;
  
    constructor() {
        this.editNutrition = false;
        this.deleteNutrition = false;
    }

}