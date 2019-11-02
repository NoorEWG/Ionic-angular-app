import { Pipe, PipeTransform } from '@angular/core';
import { Nutrition } from 'src/app/model/Nutrition';

@Pipe({
    name: 'filterNutrition'
})
export class FilterNutritionPipe implements PipeTransform {

    transform(items: Nutrition[], value: any): any[] {
      if (!items) return [];
      if (!value) return  items;
      if (value == '' || value == null) return [];
      console.log(value);
      if(value.name) {
        return items.filter(item => item.name.toLowerCase().indexOf(value.name.toLowerCase()) > -1 );   
      }
      else {
        return items.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1 );   
      }  
    }

}