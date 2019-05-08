import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3d from 'highcharts/highcharts-3d'; 
Highcharts3d(Highcharts); 
import HighchartsExporting from 'highcharts/modules/exporting';
HighchartsExporting(Highcharts); 
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';
HighchartsOfflineExporting(Highcharts); 

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
    let base = "#991111",
    colors = [],
    multiple = 30;
    if ( this.series.length > 20 && this.series.length <= 30 ) {
      multiple = 20;
    }
    if ( this.series.length > 30 && this.series.length <= 50 ) {
      multiple = 15;
    }
    if ( this.series.length > 50 && this.series.length <= 100 ) {
      multiple = 10;
    }
    if ( this.series.length > 100 ) {
      multiple = 8;
    }
    for (let i = 0; i < 1000; i += 1) {
      let color = this.shadeColor(base,i*multiple);
      if(colors.indexOf(color) < 0) {
        colors.push(
          {
            radialGradient: {
            cx: 0.5,
            cy: 0.3,
            r: 0.7
          },
          stops: [
            [0, color],
            [1, this.shadeColor(color,-20)] 
          ]
        });
      }
    }
    return colors;
  }

  shadeColor(color, percent) {

    var percentage = parseFloat(percent);
    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = Math.round(R * (100 + percentage) / 100);
    G = Math.round(G * (100 + percentage) / 100);
    B = Math.round(B * (100 + percentage) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
  } 
 
  ngOnInit() {
  
    const options: Highcharts.Options = {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        },
        //height: '300'
      },
      title: {
        text: '<b>' + this.title + '</b>'
      },
      plotOptions: {
        pie: {
          colors: ['#AA4B4B',
                  '#ECFFFF', 
                  '#AD5555',
                  '#DDF0F4',
                  '#B06060',
                  '#CDE2E9',
                  '#B36A6A',
                  '#BED3DD',
                  '#B67575',
                  '#AFC5D2',
                  '#B97F7F',
                  '#9FB6C7',
                  '#BD8A8A',
                  '#90A8BC',
                  '#C09494',
                  '#8099B1',
                  '#C39F9F',
                  '#718BA6',
                  '#C6A9A9',
                  '#627C9A', 
                  '#C9B4B4',
                  '#526E8F',
                  '#CCBEBE', 
                  '#435F84'],
          // colors: this.getColors(),
          allowPointSelect: true,
          innerSize: 100,
          depth: 45,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [{
        type: 'pie',
        name: '',
        data: this.series
      }],
      exporting: {
        chartOptions: { 
          legend: {
            itemStyle: {
                color: '#000000',
                fontWeight: 'normal',
                fontSize: '7px'
            }
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,        
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: 'black',
                    fontWeight: 'normal',
                    fontSize: '7px'
                }
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
  
    this.chart = new Highcharts.Chart(this.chartTarget.nativeElement, options);
  }

}
