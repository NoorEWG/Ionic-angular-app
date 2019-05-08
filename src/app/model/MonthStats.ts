import { DateWeight } from '../model/DateWeight';

export class MonthStats {
  month: number;
  monthName: string;
  year: number;
  stats: Array<DateWeight>;

  constructor(month: number, year: number, monthName:string = '', stats: Array<DateWeight> = []) {
    this.month = month;
    this.year = year;
    this.monthName = monthName
    this.stats = stats; 
  }
}