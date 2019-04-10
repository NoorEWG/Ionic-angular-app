import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment'; 

@Component({
  selector: 'app-weight-loss-overview',
  templateUrl: './weight-loss-overview.component.html',
  styleUrls: ['./weight-loss-overview.component.css']
})
export class WeightLossOverviewComponent implements OnInit  {

  @Input('targetWeight') targetWeight: number;
  @Input('startWeight') startWeight: number;
  @Input('totalWeightToLose') totalWeightToLose: number;
  @Input('targetDate') targetDate: string;
  @Input('startDate') startDate: string;
  @Input('totalLost') totalLost: number;
  @Input('totalWeeks') totalWeeks: number;
  @Input('length') length: number;
  percentage: number;
  averageWeightLossPerWeek: number;
  info: Array<OverViewData>;

  constructor() {
    this.info = new Array<OverViewData>();
  }

  ngOnInit() {

    this.percentage = Math.round(this.totalLost / this.totalWeightToLose * 1000) / 10;
    this.averageWeightLossPerWeek = Math.round(this.totalLost * 10 / this.totalWeeks ) / 10;
    var bmiStart = Math.round((this.startWeight / (this.length * this.length))*10)/10;
    var bmiEnd = Math.round((this.targetWeight / (this.length * this.length))*10)/10;
    var actualWeight =  Math.round((this.startWeight-this.totalLost)*10)/10;
    var bmiActual = Math.round((actualWeight / (this.length * this.length))*10)/10;
    var data = new OverViewData('Start weight', this.startWeight + " kg", "(BMI: " + bmiStart+")"); 
    this.info.push(data);
    data = new OverViewData('Target weight', this.targetWeight + " kg", "(BMI: " + bmiEnd +")");
    this.info.push(data);
    data = new OverViewData('Total weight to lose', this.totalWeightToLose + " kg");
    this.info.push(data);
    data = new OverViewData('Actuel weight',  actualWeight + " kg", "(BMI: " + bmiActual +")");
    this.info.push(data);
    data = new OverViewData('Total weight lost so far',  this.totalLost + " kg", "(" + this.percentage + "%)");
    this.info.push(data);
    data = new OverViewData('Average per week',  Math.round(this.totalLost * 10 / this.totalWeeks ) / 10 + " kg");
    this.info.push(data);
    data = new OverViewData('Startdate', moment(this.startDate, 'YYYY-MM-DD').format('DD-MM-YYYY'));
    this.info.push(data);
    data = new OverViewData('Targetdate (based on average results so far):', this.targetDate);
    this.info.push(data);
  }

}

export class OverViewData {
  label: string;
  info1: string;
  info2: string 
  
  constructor(label: string, info1: string, info2: string = "") {
    this.label = label;
    this.info1 = info1;
    this.info2 = info2;
  }
}
