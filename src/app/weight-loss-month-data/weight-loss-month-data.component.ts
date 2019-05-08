import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { MonthWeightLoss } from '../model/MonthWeightLoss';
import { Internationalization } from '../model/Internationalization';

@Component({
  selector: 'app-weight-loss-month-data',
  templateUrl: './weight-loss-month-data.component.html',
  styleUrls: ['./weight-loss-month-data.component.scss'],
})
export class WeightLossMonthDataComponent implements OnInit {

  @Input('monthData') monthData: Array<MonthWeightLoss>;

  translations: Internationalization;
  constructor(
    private storage: Storage,
    private events: Events
  ) { 
    this.storage.get('translations').then((data) => {
      this.translations = data;
    });
    this.monthData = null;
  }

  ngOnInit() {
    this.events.subscribe('translations', (data) => {
      this.translations = data;
    }); 
  }

}
