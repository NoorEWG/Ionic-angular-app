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
  @Input('series3') series3: number[];
  @Input('chartType') chartType: string;
  @Input('title') title: string;
  @Input('title2') title2: string;
  @Input('title3') title3: string;
  @Input('opposite') opposite: boolean;
  @Input('startWeight') startWeight: number;
  @Input('targetWeight') targetWeight: number;
  @Input('measure') measure: string;
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
      this.translations = data;
      this.getGraph();
    }); 
  }

  getGraph() {
    let mesure = '';
    this.zones = new Array<Object>();
  
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
    
    if(this.measure) {
      mesure = ' (' + this.measure + ')';
    }
    else {
      mesure = ' ';
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
  
    this.series = this.correctSeries(this.series);
    if(this.series2 && this.series2.length > 0) {
      this.series2 = this.correctSeries(this.series2);
    }
    if(this.series3 && this.series3.length > 0) {
      this.series3 = this.correctSeries(this.series3);
    }
    
   
    
    this.removeEmpty();

    options.xAxis = {
      categories: this.categories,
      type: 'datetime',
      labels: {
        formatter: function() {
          return moment(this.value).format("DD/MM/YYYY");
        }
      }
    } 

    if(this.chartType === 'column') {
      options.chart.type = this.chartType;
      options.chart.options3d = {
        enabled: true,
        alpha: 10,
        beta: 15,
        viewDistance: 60,
        depth: 40
      };
      options.series.push( <Highcharts.SeriesColumnOptions> {type: this.chartType, stack: "0", name: this.title, data: this.series, yAxis: 0});
      options.xAxis = {
        categories: this.categories,
        labels: {
          enabled : false
        }
      }
    }
    else if(this.chartType === 'spline') {
      options.series.push( <Highcharts.SeriesSplineOptions> {type: this.chartType, name: this.title, data: this.series, yAxis: 0});
      options.xAxis = {
        categories: this.categories,
        labels: {
          enabled : true
        }
      }
    }
    else if(this.chartType === 'line') {
      options.series.push( <Highcharts.SeriesLineOptions> {type: this.chartType, name: this.title, data: this.series, yAxis: 0});
    }
    else {
      options.series.push( <Highcharts.SeriesAreasplineOptions> {type: this.chartType, name: this.title, data: this.series, yAxis: 0}); 
    }
    // min and max graph  
    options.yAxis[0].max = Math.max(...this.series) + 1;
    var noZeros = this.calculateArrayWithoutZeros(this.series);
    options.yAxis[0].min = (Math.min(...noZeros) - 2) < 0 ? 0 : Math.min(...noZeros) - 1;

    // graph with 2 axis
    if(this.series2) {
      var noZeros2 = this.calculateArrayWithoutZeros(this.series2); 
      var yAxisNumber = 0;
      if(this.opposite) {
        yAxisNumber = 1;
        options.yAxis[1].opposite = true;
        // min and max graph  
        options.yAxis[1].max = Math.max(...this.series2) + 1;  
        options.yAxis[1].min = (Math.min(...noZeros2) - 2) < 0 ? 0 : Math.min(...noZeros2) - 1;
        options.yAxis[1].visible = true;
      }
      else {
        if(this.title2) {
          options.yAxis[0].title.text = this.title + " / " + this.title2 + mesure;
          options.title.text =  this.title + " / " + this.title2;
        }
        // recalculate min and max graph 
        options.yAxis[0].max = Math.max(...this.series, ...this.series2) + 1;
        options.yAxis[0].min = (Math.min(...noZeros, ...noZeros2) - 2) < 0 ? 0 : Math.min(...noZeros, ...noZeros2) - 1;
        options.yAxis[1].visible = false;
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

     // graph with 3 series
     if(this.series3) {
      var noZeros3 = this.calculateArrayWithoutZeros(this.series3); 
      var yAxisNumber = 0;
      if(this.opposite) {
        yAxisNumber = 1;
        options.yAxis[1].opposite = true;
        // min and max graph  
        options.yAxis[1].max = Math.max(...this.series2, ...this.series3) + 1;  
        options.yAxis[1].min = (Math.min(...noZeros2, ...noZeros3) - 2) < 0 ? 0 : Math.min(...noZeros2, ...noZeros3) - 1;
        options.yAxis[1].visible = true;
      }
      else {
        if(this.title2 && this.title3) {
          options.yAxis[0].title.text = this.title + " / " + this.title2 + " / " + this.title3 + mesure;
          options.title.text =  this.title + " / " + this.title2 + " / " + this.title3;
        }
        // recalculate min and max graph 
        options.yAxis[0].max = Math.max(...this.series, ...this.series2, ...this.series3) + 1;
        options.yAxis[0].min = Math.min(...noZeros, ...noZeros2, ...noZeros3) - 2 < 0 ? 0 :  Math.min(...noZeros, ...noZeros2, ...noZeros3) - 1;
        options.yAxis[1].visible = false;
      }
      if(this.chartType === 'column') {
        options.series.push( <Highcharts.SeriesColumnOptions> {type: this.chartType, stack: "1", name: this.title3, data: this.series3, yAxis: yAxisNumber});
      }
      else if(this.chartType === 'spline') {
        options.series.push( <Highcharts.SeriesSplineOptions> {type: this.chartType, name: this.title3, data: this.series3, yAxis: yAxisNumber});
      }
      else {
        options.series.push( <Highcharts.SeriesAreasplineOptions> {type: this.chartType, name: this.title3, data: this.series3, yAxis: yAxisNumber});
      }
    }
    else {
      options.yAxis[1].visible = false;
    }
     
    this.chart = new Highcharts.Chart(this.chartTarget.nativeElement, options);  
  }

  correctSeries(seriesToCorrect: Array<number>) {
    var correctedSeries = seriesToCorrect;
    seriesToCorrect.forEach(function(element, index) {
      if (element === 0) {
        correctedSeries[index] = null;
      }
    });
    return correctedSeries;
  }

  calculateArrayWithoutZeros(seriesToCorrect: Array<number>) {
    var noZeros = [];
    for( var i = 0; i < seriesToCorrect.length; i++){ 
      if ( seriesToCorrect[i] ) {
        noZeros.push(seriesToCorrect[i]); 
      }
    }
    return noZeros;
  }

  removeEmpty() {
    // correction for not registered values / weeks
    var series = new Array<number>();
    var series2 =  new Array<number>();
    var series3 =  new Array<number>();
    var categories =  new Array<string>();
    for(var i = 0; i < this.series.length; i++) {
      if(this.series3 && this.series3.length > 0) {
        if(this.series3[i] > 0 || this.series2[i] > 0 || this.series[i] > 0) {
          series.push(this.series[i]);
          series2.push(this.series2[i]);
          series3.push(this.series3[i]);
          // categories.push(moment(this.categories[i]).format('DD-MM-YYYY'));
          categories.push(this.categories[i]);
        }
      }
      else if(this.series2 && this.series2.length > 0) {
        if (this.series2[i] > 0 || this.series[i] > 0) {
          series.push(this.series[i]);
          series2.push(this.series2[i]);
          categories.push(this.categories[i]);
        }
      }
      else {
        if(this.series[i] > 0) {
          series.push(this.series[i]);
          categories.push(this.categories[i]);
        }
      }
    }
    this.series = series;
    if(this.series2 && this.series2.length > 0) {
      this.series2 = series2;
    }
    if(this.series3 && this.series3.length > 0) {
      this.series3 = series3;
    }
    this.categories = categories; 
  }
}
