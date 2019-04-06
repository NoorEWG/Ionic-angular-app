import { Component, OnInit, Input } from '@angular/core';
import { WeightDate } from '../model/WeightDate';

@Component({
  selector: 'app-weight-loss-data',
  templateUrl: './weight-loss-data.component.html',
  styleUrls: ['./weight-loss-data.component.css']
})
export class WeightLossDataComponent implements OnInit {

  constructor() { }

  @Input('weights') weights: Array<WeightDate>;
  @Input('totalWeightToLose') totalWeightToLose: number;

  ngOnInit() {
  }

}
