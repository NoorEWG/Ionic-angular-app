import { Component, OnInit, Input } from '@angular/core';
import { UserWeightStats } from '../model/UserWeightStats';
import * as moment from 'moment'; 
import { WeightService } from '../api/weight.service';  
import { UserData } from '../model/UserData';
import { Events} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { Route, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-weight-stats',
  templateUrl: './weight-stats.component.html',
  styleUrls: ['./weight-stats.component.css']
})
export class WeightStatsComponent implements OnInit {
  
  userData: UserData;
  userStats: UserWeightStats;
  bmiData: Array<number>;
  weightData: Array<number>;
  weightLossData: Array<number>;
  abdominalCircumferenceData: Array<number>;
  weightLossPieData: Array<number>;
  weightGainPieData: Array<number>;
  chartDates: Array<string>;
  totalWeightToLose: number;
  targetDate: string;
  firstDate: string;
  kg: Array<number>;
  totalLost: number;
  totalWeeks: number;
  showInfo: string;
  buttonData: Array<Object>;
  infoTitle: string;
  auth: boolean;
  queryParam: string;

  
  constructor(
    private weightService: WeightService, 
    private events: Events, 
    private storage: Storage, 
    private activatedRoute: ActivatedRoute,
    private menu: MenuController) { 

    // this.auth = false;
    this.storage.get('user').then((val) => {
      if(val) {
        this.userData = val;
        this.auth = this.userData.auth;
        this.calculateData(this.userData.id, null);
      } 
    });

   

    this.infoTitle = '';
    this.buttonData  = new Array<Object>();
    this.buttonData.push({name: "Overview", action: "overview", src: "assets/img/human-body.png"});
    this.buttonData.push({name: "Weight Loss Data", action: "stats-data", src: "assets/img/human-body.png"});
    this.buttonData.push({name: "Weight Loss Chart", action: "weight-loss-chart", src: "assets/img/graph.png"});
    this.buttonData.push({name: "Weight Loss Pie Chart", action: "weight-loss-pie-chart", src: "assets/img/pie-chart.png"});
    this.buttonData.push({name: "Weight Chart", action: "weight-chart", src: "assets/img/graph.png"});
    this.buttonData.push({name: "BMI Chart", action: "bmi-chart", src: "assets/img/graph.png"});
    this.buttonData.push({name: "Abdominal circumference Chart", action: "abdominal-circumference-chart", src: "assets/img/graph.png"});
    
    this.events.subscribe('user', (data) => {
      this.userData = data;
      this.auth = this.userData.auth;
      this.calculateData(this.userData.id, null);
    });

    this.events.subscribe('weightUpdate', (data) => {
      if(this.userData && this.userData.id) { 
        this.calculateData(this.userData.id, null);
      }
    });

    this.events.subscribe('weightDelete', (data) => {
      if(this.userData && this.userData.id) { 
        this.calculateData(this.userData.id, null);
      }
    });     
  }

  openStats() {
    this.menu.enable(true, 'stats');
    this.menu.open('stats');
  }

  closeStats() {
    this.menu.enable(true, 'stats');
    this.menu.close('stats');
  }
  
  showInfos (value: string) {
    this.showInfo = value;
    this.changeTitle(value);
  }

  changeTitle(value: string) {
    var tmp = value.split('-');
    this.infoTitle = tmp.join(' ');
  }   

  calculateData(id, param) {
    this.weightService.getWeightStats('ASC',id).subscribe(data => {
      this.userStats = data;
      this.totalWeightToLose = Math.round((this.userStats.user.startWeight - this.userStats.user.targetWeight)*10)/10; 

      var bmiData = new Array<number>();
      var weightData = new Array<number>();
      var weightLossData = new Array<number>();
      var abdominalCircumferenceData = new Array<number>();
      var chartDates = new Array<string>(); 
      var weightLossPieData = [];
      var weightGainPieData = [];
      var totalLost = 0;
     

      this.userStats.weights.forEach( function(item) {
        bmiData.push(Number(item.bmi));
        weightData.push(Number(item.weight));
        weightLossData.push(Number(item.weightLoss));
        abdominalCircumferenceData.push(Number(item.abdominalCircumference));
        chartDates.push(item.date);
        
        if(item.weekWeightLoss > 0) {
          weightLossPieData.push({name: "week " + (item.weekNumber-1), sliced: true, y: Number(item.weekWeightLoss)});
        }
        if(item.weekWeightLoss < 0) {
          var weightGain = -item.weekWeightLoss;
          weightGainPieData.push({name: "week " + (item.weekNumber-1), sliced: true, y: Number(weightGain)});
        }
      });
      
      this.totalLost = this.userStats.weights[this.userStats.weights.length-1].weightLoss;
      this.totalWeeks = this.userStats.weights[this.userStats.weights.length-1].weekNumber - 1;
      this.firstDate = this.userStats.weights[0].date;

      weightLossPieData.push({name: "Rest to lose", y: Math.round((this.userStats.user.startWeight - this.userStats.user.targetWeight - totalLost) * 10) / 10});
      var kg = [];
      for(var i = 0; i < Math.floor(totalLost); i++) {
        kg.push(i);
      }
      this.kg = kg;
      
      this.bmiData = bmiData; 
      this.weightData = weightData;
      this.weightLossData = weightLossData;
      this.abdominalCircumferenceData = abdominalCircumferenceData;
      this.chartDates = chartDates;
      this.weightLossPieData = weightLossPieData;
      this.weightGainPieData = weightGainPieData;

      var startDate = moment(this.firstDate, "YYYY-MM-DD");
      var totalDays = Math.floor(this.totalWeightToLose / this.totalLost * this.totalWeeks * 7);
      this.targetDate = moment(startDate).add(totalDays, 'days').format("DD-MM-YYYY");
    
      if(param) {
        this.showInfos(param);
      }
      else {
        this.openStats();
      }      
    });
  }

  ngOnInit() { 
    
    this.queryParam = this.activatedRoute.snapshot.paramMap.get('graph');
    if(this.queryParam) {
      if(this.userData && this.userData.id) {
        this.calculateData(this.userData.id, this.queryParam);
        this.closeStats();
      }
    }
  }  
  
}
