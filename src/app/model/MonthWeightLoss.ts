export class MonthWeightLoss {
  
  month: number;
  year: number;
  monthWeightLoss: number;

  constructor(month: number, year: number, monthWeightLoss) {
    this.month = month;
    this.year = year;
    this.monthWeightLoss = monthWeightLoss; 
  }
}