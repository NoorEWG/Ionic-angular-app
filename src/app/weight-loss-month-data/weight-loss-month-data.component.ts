import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Events } from '../api/event.service';
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
  currentYear: number;
  monthToggle: boolean;
  monthSearch: number;
  
  constructor(
    private storage: Storage,
    private events: Events
  ) { 
    this.monthToggle = true;
    this.currentYear = new Date().getFullYear();
    this.monthSearch = this.currentYear;
    this.monthData = null;
    this.translations = new Internationalization();
    this.translations.monthlyWeightLoss = '';    
    this.storage.get('translations').then((data) => {
      this.translations = data;
    });
    
  }

  ngOnInit() {
    this.events.subscribe('translations', (data) => {
      this.translations = data;
    }); 
  }

  toggle() {
    if (this.monthToggle) {
      this.monthSearch = this.currentYear;
    } else {
      this.monthSearch = null;
    }
  }

}
