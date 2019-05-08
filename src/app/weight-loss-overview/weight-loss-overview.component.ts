import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events} from '@ionic/angular';
import * as moment from 'moment'; 
import { Internationalization } from '../model/Internationalization';
import { SWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core/src/linker/view_container_ref';

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
  info: Array<OverViewData>;
  translations: Internationalization;

  constructor(
    private events: Events, 
    private storage: Storage,
    ) {
    this.info = new Array<OverViewData>();
    this.translations = new Internationalization();
  }

  ngOnInit() {
    this.storage.get('translations').then((translations) => {
      this.translations = translations;
      this.setInfo();
    });

    this.events.subscribe('translations', (data) => {
      this.translations = data;
      this.setInfo();
    }); 
  }

  setInfo() {
    var percentage = Math.round(this.totalLost / this.totalWeightToLose * 1000) / 10;     
    var bmiStart = Math.round((this.startWeight / (this.length * this.length))*10)/10;
    var bmiEnd = Math.round((this.targetWeight / (this.length * this.length))*10)/10;
    var actualWeight =  Math.round((this.startWeight-this.totalLost)*10)/10;
    var bmiActual = Math.round((actualWeight / (this.length * this.length))*10)/10;
    var info = [];
    info.push(new OverViewData(this.translations.startWeight, this.startWeight + " " + this.translations.kg, "(" + this.translations.bmi + " " +  bmiStart+")"));   
    info.push(new OverViewData(this.translations.targetWeight, this.targetWeight + " " + this.translations.kg, "(" + this.translations.bmi + " "  + bmiEnd +")"));
    info.push(new OverViewData(this.translations.totalWeightToLose, this.totalWeightToLose + " " + this.translations.kg));
    info.push(new OverViewData(this.translations.actuelWeight,  actualWeight + " " + this.translations.kg, "(" + this.translations.bmi + " " +  bmiActual +")"));
    info.push(new OverViewData(this.translations.totalWeightLostSoFar,  this.totalLost + " " + this.translations.kg, "(" + percentage + "%)"));
    info.push(new OverViewData(this.translations.averagePerWeek,  Math.round(this.totalLost * 100 / this.totalWeeks ) / 100 + " " + this.translations.kg));
    info.push(new OverViewData(this.translations.startDate, moment(this.startDate, 'YYYY-MM-DD').format('DD-MM-YYYY')));
    info.push(new OverViewData(this.translations.targetDate, this.targetDate));
    this.info = info;
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
