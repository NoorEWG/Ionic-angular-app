import { Pipe, PipeTransform } from '@angular/core';
import { Nutrition } from 'src/app/model/Nutrition';

@Pipe({
  name: 'nutritionName'
})
export class NutritionPipe implements PipeTransform {

  transform(items: Nutrition[], searchText: string): any {
    if (!items || !searchText) {
        return items;
    }
    return items.filter( item => {
        return (item.name.includes(searchText));
    });
  }
}  
