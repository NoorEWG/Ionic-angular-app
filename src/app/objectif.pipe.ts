import { Pipe, PipeTransform } from '@angular/core';
import { UserWeightObjectifs } from './model/UserWeightObjectifs';


@Pipe({
  name: 'objectif'
})
export class ObjectifPipe implements PipeTransform {

  transform(items: UserWeightObjectifs[], date: any): any {
    if (!items || !date ) {
        return items;
    }
    return items.filter( it => {
      let datum = it.date;
      return (datum !== null);
    });
  }
}  
