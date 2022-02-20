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

  @ViewChild('pieChartTarget',{static: true}) pieChartTarget: ElementRef;
  @Input('series') series: Array<number>;
  @Input('title') title: string;
  @Input('name') name: string;
  chart: Highcharts.Chart;
  
  constructor() { 
  }
 
  ngOnInit() {
  
    const options: Highcharts.Options = {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45
        },
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
    console.log("" + this.pieChartTarget.nativeElement);
    this.chart = new Highcharts.Chart(this.pieChartTarget.nativeElement, options);
  }

}
