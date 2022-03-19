import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Events } from '../api/event.service';
import { Internationalization } from '../model/Internationalization';

@Component({
  selector: 'app-weight-loss-badges',
  templateUrl: './weight-loss-badges.component.html',
  styleUrls: ['./weight-loss-badges.component.css']
})
export class WeightLossBadgesComponent implements OnInit {

  translations: Internationalization;

  constructor( private storage: Storage,
    private events: Events
  ) { 
    this.translations = new Internationalization();    
    this.storage.get('translations').then((data) => {
      this.translations = data;
    });
 }

  @Input('totalLost') totalLost: number;
  @Input('targetWeight') targetWeight: number;
  @Input('startWeight') startWeight: number;
  totalWeightToLose: number;
  badgesFromWeightToLose: Array<string>;
  badgesFromStartWeight: Array<String>;

  ngOnInit() {
    this.events.subscribe('translations', (data) => {
      this.translations = data;
    }); 
    
    var badgesFromStartWeight = new Array<string>();
    var badgesFromWeightToLose = new Array<string>();
    var values = [5,10,20,30,40,50,60,70,80,90,100];
    var totalWeightToLose = this.startWeight - this.targetWeight;
    this.totalWeightToLose = Math.round(totalWeightToLose * 10) / 10;
    var beginWeight = this.startWeight;
    var percentageFromWeightToLose = this.totalLost / totalWeightToLose * 100;
    var percentageFromStartWeight = this.totalLost / this.startWeight * 100;
    
    values.forEach( function(value) {
      var a = Math.round(totalWeightToLose * value / 10) / 10;
      var b = Math.round(beginWeight * value / 10) / 10;
      if(percentageFromWeightToLose > value) {
        badgesFromWeightToLose.push(value + "% - " + a + " kg");
      }
      if(percentageFromStartWeight > value) {
        badgesFromStartWeight.push(value + "% - " + b + " kg");
      }
    });
    this.badgesFromWeightToLose = badgesFromWeightToLose;
    this.badgesFromStartWeight = badgesFromStartWeight;
  }
}
