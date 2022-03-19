import { Pipe, PipeTransform } from '@angular/core';
import { MonthStats } from './model/MonthStats';

@Pipe({
  name: 'yearMonthStats'
})
export class YearPipe implements PipeTransform {

  transform(items: MonthStats[], year: number): any {
    if (!items || !year ) {
        return items;
    }
    return items.filter( it => {
      let jaar = it.year;
      return (jaar === year);
    });
  }
}  
