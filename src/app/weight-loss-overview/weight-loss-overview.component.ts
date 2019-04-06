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
  percentage: number;
  averageWeightLossPerWeek: number;
  info: Array<OverViewData>;

  constructor() {
    this.info = new Array<OverViewData>();
  }

  ngOnInit() {

    this.percentage = Math.round(this.totalLost / this.totalWeightToLose * 1000) / 10;
    this.averageWeightLossPerWeek = Math.round(this.totalLost * 10 / this.totalWeeks ) / 10;
    var data = new OverViewData('Start weight', this.startWeight + " kg");
    this.info.push(data);
    data = new OverViewData('Target weight', this.targetWeight + " kg");
    this.info.push(data);
    data = new OverViewData('Total weight to lose', this.totalWeightToLose + " kg");
    this.info.push(data);
    data = new OverViewData('Actuel weight',  (Math.round((this.startWeight-this.totalLost)*10)/10 + " kg"));
    this.info.push(data);
    data = new OverViewData('Total weight lost so far',  this.totalLost + " kg (" + this.percentage + "%)");
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
  data: string; 
  
  constructor(label: string, data: string) {
    this.label = label;
    this.data =  data;
  }
}
