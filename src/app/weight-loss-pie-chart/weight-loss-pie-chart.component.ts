import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-weight-loss-pie-chart',
  templateUrl: './weight-loss-pie-chart.component.html',
  styleUrls: ['./weight-loss-pie-chart.component.css']
})
export class WeightLossPieChartComponent implements OnInit {

  @ViewChild('chartTarget') chartTarget: ElementRef;
  @Input('series') series: Array<number>;
  @Input('title') title: string;
  @Input('name') name: string;
  chart: Highcharts.Chart;
  
  constructor() { }

  getColors() {
  // Make monochrome colors
  let colors = [],
      base = Highcharts.getOptions().colors[0],
      i;

  for (i = 0; i < 100; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
      colors.push[base];  
      //colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
  }
    return colors;
}

  
  ngOnInit() {
    
    const options: Highcharts.Options = {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        },
        height: '300'
      },
      //colors: this.getColors(),
      title: {
        text: null //'<b>' + this.title + '</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          innerSize: 100,
          depth: 45,
          cursor: 'pointer',
          dataLabels: {
              enabled: false
              /*enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                  color: 'black'
              }*/
          }
        }
      },
      series: [{
        type: 'pie',
        name: '',
        data: this.series
      }],
      credits: {
        enabled: false
      }
    };
  
    this.chart = new Highcharts.Chart(this.chartTarget.nativeElement, options);
  }

}
