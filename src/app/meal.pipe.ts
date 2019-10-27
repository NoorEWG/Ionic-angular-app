import { Pipe, PipeTransform } from '@angular/core';
import { NutritionData } from 'src/app/model/NutritionData';

@Pipe({
  name: 'meal'
})
export class MealPipe implements PipeTransform {

  transform(items: NutritionData[], mealType: string): any {
    if (!items || !mealType  || mealType === "alles" ) {
        return items;
    }
    return items.filter( item => {
        return (item.mealType === mealType);
    });
  }
}  
