import { Component, OnInit } from '@angular/core';
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
  weightLossPieData: Array<PieData>;
  weightGainPieData: Array<PieData>;
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

    this.userData = new UserData();
    this.userStats = new UserWeightStats();
    this.weightData = new Array<number>();
    this.weightLossData = new Array<number>();
    this.abdominalCircumferenceData = new Array<number>();
    this.chartDates = new Array<string>(); 
    this.weightLossPieData = new Array<PieData>();
    this.weightGainPieData = new Array<PieData>();  
    this.kg = new Array<number>();
    this.totalLost = 0;
    this.totalWeeks = 1;
    this.targetDate = null;
    this.auth = false;
    this.infoTitle = '';
    this.queryParam = this.activatedRoute.snapshot.paramMap.get('graph');
    this.storage.get('user').then((val) => {
      if(val) {
        this.userData = val;
        this.auth = this.userData.auth;
        console.log('local storage: ' + this.userData.id);
        this.calculateData(this.userData.id);
      }
      else {
        this.auth = false;
        this.userData = null;
        this.calculateData(null);
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
    this.closeStats();
  }

  changeTitle(value: string) {
    var tmp = value.split('-');
    this.infoTitle = tmp.join(' ');
  }   

  calculateData(id) {
    var bmiData = new Array<number>();
    var weightData = new Array<number>();
    var weightLossData = new Array<number>();
    var abdominalCircumferenceData = new Array<number>();
    var chartDates = new Array<string>();
    var weightLossPieData = new Array<PieData>(); 
    var weightGainPieData = new Array<PieData>();
    var kg = new Array<number>();
    if(id) {
      this.weightService.getWeightStats('ASC',id).subscribe(data => {
        this.userStats = data;
        this.totalWeightToLose = Math.round((this.userStats.user.startWeight - this.userStats.user.targetWeight)*10)/10; 
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
        weightLossPieData.push({name: "Rest to lose", sliced: false, y: Math.round((this.userStats.user.startWeight - this.userStats.user.targetWeight - this.totalLost) * 10) / 10});
        weightGainPieData.push({name: "Rest to lose", sliced: false, y: Math.round((this.userStats.user.startWeight - this.userStats.user.targetWeight - this.totalLost) * 10) / 10});
        for(var i = 0; i < Math.floor(this.totalLost); i++) {
          kg.push(i);
        }
        this.totalWeeks = this.userStats.weights[this.userStats.weights.length-1].weekNumber - 1;
        this.firstDate = this.userStats.weights[0].date;
        var startDate = moment(this.firstDate, "YYYY-MM-DD");
        var totalLost = (this.totalLost > 0 ) ? this.totalLost : 0;
        var totalDays = Math.floor(this.totalWeightToLose / totalLost * this.totalWeeks * 7);
        this.targetDate = moment(startDate).add(totalDays, 'days').format("DD-MM-YYYY");
        this.bmiData = bmiData;
        this.weightData = weightData;
        this.weightLossData = weightLossData;
        this.abdominalCircumferenceData = abdominalCircumferenceData;
        this.chartDates = chartDates;
        this.weightLossPieData = weightLossPieData; 
        this.weightGainPieData = weightGainPieData;
        this.kg = kg;
        if(this.queryParam) {
          this.closeStats();
          this.showInfos(this.queryParam);
        }
        else {
          this.openStats();
        }      
      });
    } 
  }

  ngOnInit() { 
          
    this.events.subscribe('user', (data) => {
      this.userData = data;
      this.auth = this.userData.auth;
      this.calculateData(this.userData.id);
    });

    this.events.subscribe('clearData', (data) => {
      this.userData = data;
      this.auth = false;
    });

    this.events.subscribe('weightUpdate', (data) => {
      if(this.userData && this.userData.id) { 
        this.calculateData(this.userData.id);
      }
    });

    this.events.subscribe('weightDelete', (data) => {
      if(this.userData && this.userData.id) { 
        this.calculateData(this.userData.id);
      }
    });     
  }    
}

export class PieData {
  
  name: string;
  sliced: boolean;
  y: number;

  constructor(name: string, y:number, sliced: boolean) {
    this.name = name;
    this.y = y;
    this.sliced = sliced || false; 
  }
}
