import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weight-loss-badges',
  templateUrl: './weight-loss-badges.component.html',
  styleUrls: ['./weight-loss-badges.component.css']
})
export class WeightLossBadgesComponent implements OnInit {

  constructor() { }

  @Input('totalLost') totalLost: number;
  @Input('targetWeight') targetWeight: number;
  @Input('startWeight') startWeight: number;
  badges: Array<string>;

  ngOnInit() {
    var badges = new Array<string>();
    var values = [5,10,20,30,40,50,60,70,80,90,100];
    var percentage = this.totalLost / (this.startWeight - this.targetWeight) * 100;
    values.forEach( function(value) {
      if(percentage > value) {
        badges.push(value + "%");
      }
    });
    this.badges = badges;
  }
}
