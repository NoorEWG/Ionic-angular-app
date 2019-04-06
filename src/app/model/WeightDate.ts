export class WeightDate {
    date: string;
    weekNumber: number;
    weight: number;
    abdominalCircumference: number;
    weightLoss: number;
    weekWeightLoss: number;
    weightToLose: number;
    bmi: number;
    save: boolean;
    edit: boolean;

    constructor() {
      this.edit = true;
      this.save = false;
    }
}