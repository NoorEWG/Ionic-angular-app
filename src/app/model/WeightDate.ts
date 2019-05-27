export class WeightDate {
    date: string;
    weekNumber: number;
    weight: number;
    abdominalCircumference: number;
    hips: number;
    leftLeg: number;
    rightLeg: number;
    leftArm: number;
    rightArm: number;
    weightLoss: number;
    weekWeightLoss: number;
    weightToLose: number;
    bmi: number;
    save: boolean;
    edit: boolean;
    openEdit: boolean;
    openConfirmDelete: boolean;

    constructor() {
      this.edit = true;
      this.save = false;
      this.openEdit = false;
      this.openConfirmDelete = false;
    }
}