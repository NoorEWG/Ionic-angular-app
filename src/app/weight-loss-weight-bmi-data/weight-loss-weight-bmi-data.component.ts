import { Component, OnInit, Input } from '@angular/core';
import { WeightDate } from '../model/WeightDate';
import { Events } from '../api/event.service';
import { Storage } from '@ionic/storage-angular';
import { Internationalization } from '../model/Internationalization';

@Component({
  selector: 'app-weight-loss-weight-bmi-data',
  templateUrl: './weight-loss-weight-bmi-data.component.html',
  styleUrls: ['./weight-loss-weight-bmi-data.component.scss'],
})

export class WeightLossWeightBmiDataComponent implements OnInit {

  @Input('weights') weights: Array<WeightDate>;
  translations: Internationalization;
  
  constructor( private storage: Storage, private events: Events) { 
    this.translations = new Internationalization();
    this.storage.get('translations').then((data) => {
      this.translations = data;
    });
  }

  ngOnInit() {
    this.weights.sort((a,b) => b.weekNumber - a.weekNumber);
    this.events.subscribe('translations', (data) => {
      this.translations = data;
    }); 
  }
  
}
