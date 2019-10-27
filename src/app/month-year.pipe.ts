import { Pipe, PipeTransform } from '@angular/core';
import { UserNutritionDay } from 'src/app/model/UserNutritionDay';
import * as moment from 'moment'; 

@Pipe({
  name: 'monthYear'
})
export class MonthYearPipe implements PipeTransform {

  transform(items: UserNutritionDay[], monthAndYear: string[]): any {
    if (!items || !monthAndYear ) {
        return items;
    }
    return items.filter( it => {
      let month = moment(it.date).format("MM");
      if(month.charAt(0) === '0') {
        month = month.substring(1);
      }  
      return (month ===  monthAndYear[0] && moment(it.date).format("YYYY") ===  monthAndYear[1] );
    });
  }
}  
