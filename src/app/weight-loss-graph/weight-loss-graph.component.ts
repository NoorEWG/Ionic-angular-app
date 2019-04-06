import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment'; 
//import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-weight-loss-graph',
  templateUrl: './weight-loss-graph.component.html',
  styleUrls: ['./weight-loss-graph.component.css']
})
export class WeightLossGraphComponent implements OnInit {

  @Input('categories') categories: string[];
  @Input('series') series: number[];
  @Input('chartType') chartType: string;
  @Input('title') title: string;
  @Input('startWeight') startWeight: number;
  @Input('targetWeight') targetWeight: number;
  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.Chart;
  zones: Array<Object>;

  constructor() { }

  ngOnInit() {

    let mesure = '';
    this.zones = new Array<Object>();
    if(this.title === "BMI" ) {
      this.zones = [{
        value: 20, 
        color: 'yellow',
        className: 'bmi-zone-0'
      },
      {
        value: 25,
        color: '#00b33c',
        className: 'bmi-zone-1'
      },
      {
        value: 30,
        color: '#805a1e',
        className: 'bmi-zone-2'
      },
      {
        value: 35,
        color: '#ff0000',
        className: 'bmi-zone-3'
      },
      {
        value: 40,
        color: '#cc0000' ,
        className: 'bmi-zone-4'
      },
      {
        color: '#990000',
        className: 'bmi-zone-5'
      }];    
    }
    else if (this.title === "Abdominal circumference") {
      mesure = 'cm';
    }
    else {
      mesure = 'kg';
    }

    const options: Highcharts.Options = {
      chart: {
        type: this.chartType,
      },
      colors: ['#990000', '#435F84'],
      title: {
        text: '<b>' + this.title + '</b>'
      },
      tooltip: {
        formatter: function () {
          return moment(this.x).format("DD/MM/YYYY") +"<br><b>" + this.y + " " + mesure + "</b>";
        }
      },
      plotOptions: {
        series: {
            zones: this.zones
        },
      },
      xAxis: {
        categories: this.categories,
        type: 'datetime',
        labels: {
          formatter: function() {
            return moment(this.value).format("DD/MM/YYYY");
          }
        },
        ordinal: false,
        //minTickInterval: 3600*24*30*1000 //moment.duration(1, 'month').asMilliseconds() 
      },
      yAxis: [{
          title: {
            text: this.title
          },
      }],
      series: [{
        type: 'areaspline',
        name: this.title,
        data: this.series   
      }],
      credits: {
        enabled: false
      }
    };
    
    // min and max graph  
    options.yAxis[0].max = Math.max(...this.series) + 1;
    options.yAxis[0].min = Math.max(Math.min(...this.series) - 1,0);
    
    this.chart = new Highcharts.Chart(this.chartTarget.nativeElement, options);
  }

}
