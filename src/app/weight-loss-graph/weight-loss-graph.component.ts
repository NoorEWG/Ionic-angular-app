import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import * as Highcharts from 'highcharts';
import Highcharts3d from 'highcharts/highcharts-3d'; 
Highcharts3d(Highcharts); 
import HighchartsExporting from 'highcharts/modules/exporting';
HighchartsExporting(Highcharts); 
import HighchartsOffline from 'highcharts/modules/offline-exporting';
HighchartsOffline(Highcharts); 
import * as moment from 'moment'; 
import { Internationalization } from '../model/Internationalization';

@Component({
  selector: 'app-weight-loss-graph',
  templateUrl: './weight-loss-graph.component.html',
  styleUrls: ['./weight-loss-graph.component.css']
})
export class WeightLossGraphComponent implements OnInit {

  @Input('categories') categories: string[];
  @Input('series') series: number[];
  @Input('series2') series2: number[];
  @Input('chartType') chartType: string;
  @Input('title') title: string;
  @Input('title2') title2: string;
  @Input('opposite') opposite: boolean;
  @Input('startWeight') startWeight: number;
  @Input('targetWeight') targetWeight: number;
  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.Chart;
  zones: Array<Object>;
  translations: Internationalization;

  constructor(
    private storage: Storage,
    private events: Events) {
      this.translations = new Internationalization();
   }

  ngOnInit() {
    this.storage.get('translations').then((data) => {
      this.translations = data;  
      this.getGraph();
    });
  
    this.events.subscribe('translations', (data) => {
      console.log('graph component - translations event');
      this.translations = data;
      this.getGraph();
    }); 
  }

  getGraph() {
    let mesure = '';
    this.zones = new Array<Object>();
  
    console.log(this.title);
    console.log(this.translations.bmi);
    if(this.title === this.translations.bmi ) {
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
    var cmGraphs = [
      this.translations.waist, 
      this.translations.hips, 
      this.translations.leftArm, 
      this.translations.rightArm,  
      this.translations.leftLeg, 
      this.translations.rightLeg 
    ];
    
    if (cmGraphs.indexOf(this.title)) {
      mesure = ' in cm';
    }
    else if(this.title === this.translations.bmi) {
      mesure = '';
    }
    else {
      mesure = ' in kg';
    }

    const options: Highcharts.Options = {
      chart: {
        type: this.chartType,
        zoomType: 'xy',
        panning: true,
        panKey: 'shift'
      },
      colors: ['#991111', '#435F84'],
      title: {
        text: '<b>' + this.title + '</b>'
      },
      tooltip: {
        formatter: function () {
          if (this.y > 0) {
            return moment(this.x).format("DD/MM/YYYY") +"<br><b>" + this.y + " " + mesure + "</b>";
          }
        }
      },
      plotOptions: {
          column: {
            colors: ['#991111', '#435F84']
          },
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
          text: this.title + mesure
          }
        },
        {
        title: {
          text: this.title2 + mesure
        },
        visible: false
      }],
      series: [],
      exporting: {
        chartOptions: { 
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            }
        },
        fallbackToExportServer: false
      },
      credits: {
        enabled: false
      }
    };
  
    var correctedSeries = this.series;
    correctedSeries.forEach(function(element, index) {
      if (element === 0) {
        correctedSeries[index] = null;
      }
    });
    this.series = correctedSeries;
  
    if(this.chartType === 'column') {
      options.chart.type = this.chartType;
      /*options.chart.options3d = {
        enabled: true,
        alpha: 20,
        beta: 30,
        viewDistance: 5,
        depth: 400
      };*/
      options.series.push( <Highcharts.SeriesColumnOptions> {type: this.chartType, stack: "0", name: this.title, data: this.series, yAxis: 0});
    }
    else if(this.chartType === 'spline') {
      options.series.push( <Highcharts.SeriesSplineOptions> {type: this.chartType, name: this.title, data: this.series, yAxis: 0});
    }
    else if(this.chartType === 'line') {
      options.series.push( <Highcharts.SeriesLineOptions> {type: this.chartType, name: this.title, data: this.series, yAxis: 0});
    }
    else {
      options.series.push( <Highcharts.SeriesAreasplineOptions> {type: this.chartType, name: this.title, data: this.series, yAxis: 0});
    }
    // min and max graph  
    options.yAxis[0].max = Math.max(...this.series) + 1;
    var noZeros = [];
    for( var i = 0; i < this.series.length; i++){ 
      if ( this.series[i] ) {
        noZeros.push(this.series[i]); 
      }
  }
    options.yAxis[0].min = (Math.min(...noZeros) - 2) < 0 ? 0 : Math.min(...noZeros) - 1;
    // graph with 2 axis
    if(this.series2) {
      var yAxisNumber = 0;
      if(this.opposite) {
        options.yAxis[1].opposite = true;
        // min and max graph  
        options.yAxis[1].max = Math.max(...this.series2) + 1;  
        options.yAxis[1].min = Math.max(Math.min(...this.series2) - 1,0);
        options.yAxis[1].visible = true;
        yAxisNumber = 1;
      }
      else {
        options.yAxis[1].visible = false;
        if(this.title2) {
          options.yAxis[0].title.text = this.title + " / " + this.title2 + mesure;
          options.title.text =  this.title + " / " + this.title2;
        }
        options.yAxis[0].max = Math.max(...this.series, ...this.series2) + 1;
        var noZeros2 = [];
        for( var i = 0; i < this.series2.length; i++){ 
          if ( this.series2[i] ) {
            noZeros2.push(this.series[i]); 
          }
        }
        options.yAxis[0].min = (Math.min(...noZeros, ...noZeros2) - 2) < 0 ? 0 : Math.min(...noZeros, ...noZeros2) - 1;
      }
      if(this.chartType === 'column') {
        options.series.push( <Highcharts.SeriesColumnOptions> {type: this.chartType, stack: "1", name: this.title2, data: this.series2, yAxis: yAxisNumber});
      }
      else if(this.chartType === 'spline') {
        options.series.push( <Highcharts.SeriesSplineOptions> {type: this.chartType, name: this.title2, data: this.series2, yAxis: yAxisNumber});
      }
      else {
        options.series.push( <Highcharts.SeriesAreasplineOptions> {type: this.chartType, name: this.title2, data: this.series2, yAxis: yAxisNumber});
      }
    }
    else {
      options.yAxis[1].visible = false;
    }
  
    this.chart = new Highcharts.Chart(this.chartTarget.nativeElement, options);  
  }
}
