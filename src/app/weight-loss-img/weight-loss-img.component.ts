import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weight-loss-img',
  templateUrl: './weight-loss-img.component.html',
  styleUrls: ['./weight-loss-img.component.css']
})
export class WeightLossImgComponent implements OnInit {

  constructor() { }

  @Input('kg') kg: Array<number>;
 
  ngOnInit() {
  }

}
