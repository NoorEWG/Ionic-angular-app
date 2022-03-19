import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighcartsMore from 'highcharts/highcharts-more';
HighcartsMore(Highcharts);
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-weight-loss-gauge',
  templateUrl: './weight-loss-gauge.component.html',
  styleUrls: ['./weight-loss-gauge.component.css']
})
export class WeightLossGaugeComponent implements OnInit {

  @ViewChild('gaugeTarget',{static: true}) gaugeTarget: ElementRef;
  @Input('title') title: string;
  @Input('chartType') chartType: string;
  @Input('startWeight') startWeight: number;
  @Input('targetWeight') targetWeight: number;
  @Input('totalLost') totalLost: number;
  chart: Highcharts.Chart;
  actualWeight: number;
  
  constructor() {}
 
  ngOnInit() {
   
    this.actualWeight = Math.round((this.startWeight - this.totalLost)*10)/10;
    var start = Math.round(this.startWeight);
    var target = Math.round(this.targetWeight);
    
    const options: Highcharts.Options = {
      chart: {
        type: this.chartType
      },
      title: null,
      plotOptions: {
        solidgauge: {
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    },
    pane: {
      center: ['50%', '85%'],
      size: '90%',
      startAngle: -90,
      endAngle: 90
  },

    yAxis: {  
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 10,
      title: {
        text: this.title
      },
      labels: {
          y: 16
      },
      min: target,
      max: start,
    }, 
    series: [{
      name: 'kg',
      type: 'solidgauge',
      data: [this.actualWeight],
      dataLabels: {
          format:
              '<div style="text-align:center">' +
              '<span style="font-size:25px">{y:.1f}</span><br/>' +

              '<span style="font-size:12px;opacity:0.4">' +
              'kg' +
              '</span>' +
              '</div>'
      },
      tooltip: {
          valueSuffix: ' kg'
      }
  }],
  exporting: {
    enabled: false
},
    credits: {
        enabled: false
      }
    };       
    this.chart = new Highcharts.Chart(this.gaugeTarget.nativeElement, options);
   
 
  }
    
}
  