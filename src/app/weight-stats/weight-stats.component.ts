import { Component, OnInit } from '@angular/core';
import { UserWeightStats } from '../model/UserWeightStats';
import * as moment from 'moment'; 
import { WeightService } from '../api/weight.service';  
import { UserData } from '../model/UserData';
import { Events} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { Route, ActivatedRoute, ParamMap } from '@angular/router';
import { Internationalization } from '../model/Internationalization';
import { PieData } from '../model/PieData';
import { MonthStats } from '../model/MonthStats';
import { DateWeight } from '../model/DateWeight';
import { MonthWeightLoss } from '../model/MonthWeightLoss';

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
  hipsData: Array<number>;
  leftArmData: Array<number>;
  rightArmData: Array<number>;
  leftLegData: Array<number>;
  rightLegData: Array<number>;
  whrRatioData: Array<number>;
  whtrRatioData: Array<number>;
  absiData: Array<number>;
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
  translations: Internationalization;
  monthWeightLoss: Array<MonthWeightLoss>;
  
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
    this.hipsData = new Array<number>();
    this.leftArmData = new Array<number>();
    this.rightArmData = new Array<number>();
    this.leftLegData = new Array<number>();
    this.rightLegData = new Array<number>();
    this.chartDates = new Array<string>(); 
    this.weightLossPieData = new Array<PieData>();
    this.weightGainPieData = new Array<PieData>();
    this.whrRatioData = new Array<number>();  
    this.monthWeightLoss = new Array<MonthWeightLoss>();
    this.kg = new Array<number>();
    this.totalLost = 0;
    this.totalWeeks = 1;
    this.targetDate = null;
    this.auth = false;
    this.infoTitle = '';
    this.queryParam = this.activatedRoute.snapshot.paramMap.get('graph');
    this.translations = new Internationalization();
    this.storage.get('translations').then((data) => {
      this.translations = data;
      this.storage.get('user').then((val) => {
        if(val) {
          this.userData = val;
          this.auth = this.userData.auth;
          this.calculateData(this.userData.id);
        }
        else {
          this.auth = false;
          this.userData = null;
          this.calculateData(null);
        } 
      });
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
    this.closeStats();
  }

  calculateData(id) {
    var translations = this.translations;
    var bmiData = new Array<number>();
    var weightData = new Array<number>();
    var weightLossData = new Array<number>();
    var abdominalCircumferenceData = new Array<number>();
    var hipsData = new Array<number>();
    var leftArmData = new Array<number>();
    var rightArmData = new Array<number>();
    var leftLegData = new Array<number>();
    var rightLegData = new Array<number>();
    var whrRatioData = new Array<number>();
    var whtrRatioData = new Array<number>();
    var absiData = new Array<number>();
    var bmrData = new Array<number>();
    var chartDates = new Array<string>();
    var weightLossPieData = new Array<PieData>(); 
    var weightGainPieData = new Array<PieData>();
    var kg = new Array<number>();
    if(id) {
      this.weightService.getWeightStats('ASC',id).subscribe(data => {
        this.userStats = data;
        var user = this.userStats.user;
        this.totalWeightToLose = Math.round((this.userStats.user.startWeight - this.userStats.user.targetWeight)*10)/10; 
        this.userStats.weights.forEach( function(item) {
          bmiData.push(Number(item.bmi));
          weightData.push(Number(item.weight));
          weightLossData.push(Number(item.weightLoss));
          abdominalCircumferenceData.push((Number(item.abdominalCircumference) == 0) ? null : Number(item.abdominalCircumference));
          hipsData.push((Number(item.hips) == 0) ? null : Number(item.hips));
          leftArmData.push((Number(item.leftArm) == 0) ? null : Number(item.leftArm));
          rightArmData.push((Number(item.rightArm) == 0) ? null : Number(item.rightArm));
          leftLegData.push((Number(item.leftLeg) == 0) ? null : Number(item.leftLeg));
          rightLegData.push((Number(item.rightLeg) == 0) ? null : Number(item.rightLeg));
          if(item.hips) {
            whrRatioData.push(Math.round(Number(item.abdominalCircumference)/Number(item.hips)*100)/100);
          }
          else {
            whrRatioData.push(0);
          }
          whtrRatioData.push(Math.round(Number(item.abdominalCircumference)/(Number(user.length) * 100) * 10 ) / 10);
          var absi = Math.round(Number(item.abdominalCircumference) / (Number(item.bmi)**(2/3) * (Number(user.length) * 100)**(1/2)) * 100) / 100;
          absiData.push(absi);
          var bmrConstant = (user.gender === 'f') ? 447.593 : 88.362;
          var bmrG = (user.gender === 'f') ? 9.247 : 13.397;
          var bmrH = (user.gender === 'f') ? 3.098 : 4.799;
          var bmrL = (user.gender === 'f') ? 4.33 : 5.677;
          bmrData.push(Math.round((bmrConstant + bmrG * item.weight + bmrH * user.length * 100 - bmrL * user.age) * 1.2 * 10 ) / 10);
          chartDates.push(item.date);          
          if(item.weekWeightLoss > 0) {
            weightLossPieData.push({name: translations.week + " " + (item.weekNumber-1) + " (" + item.weekWeightLoss + " kg)", sliced: true, y: Number(item.weekWeightLoss)});
          }
          if(item.weekWeightLoss < 0) {
            var weightGain = -item.weekWeightLoss;
            weightGainPieData.push({name: translations.week + " " + (item.weekNumber-1)  + " (" + weightGain + " kg)", sliced: true, y: Number(weightGain)});
          }
        });
        this.totalLost = this.userStats.weights[this.userStats.weights.length-1].weightLoss;
        var restToLose =  Math.round((this.userStats.user.startWeight - this.userStats.user.targetWeight - this.totalLost) * 10) / 10
        weightLossPieData.push({name: translations.leftToLose + " (" + restToLose + " kg)" , sliced: true, y: restToLose});
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
        this.hipsData = hipsData;
        this.leftArmData = leftArmData;
        this.rightArmData = rightArmData;
        this.leftLegData = leftLegData;
        this.rightLegData = rightLegData;
        this.whrRatioData = whrRatioData;
        this.whtrRatioData = whtrRatioData;
        this.absiData = absiData;
        this.chartDates = chartDates;
        this.weightLossPieData = weightLossPieData; 
        this.weightGainPieData = weightGainPieData;
        this.kg = kg;
        this.calculateMonthStats();
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

  calculateMonthStats() {
    
    var beginYear = parseInt(moment(this.userStats.weights[0].date, "YYYY-MM-DD").format("YYYY"));
    var monthStats = new Array<MonthStats>();
    this.userStats.weights.forEach( function(item) {
      var date = moment(item.date, "YYYY-MM-DD");
      var monthNumber = parseInt(date.format("M"));
      var year = parseInt(date.format("YYYY"));
      var totalMonths = (year - beginYear) * 12 + monthNumber;
      var monthName = date.format("MMMM");
      var dateWeight = new DateWeight(date.format("YYYY-MM-DD"),item.weight);
      if(monthStats && monthStats[totalMonths-1]) {
        monthStats[totalMonths-1].stats.push(dateWeight);
      }
      else {
        var stats = dateWeight;
        var statsArray = [];
        statsArray.push(stats);
        monthStats.push({"month" : monthNumber, "year": year, "monthName" : monthName, stats: statsArray });
      }
    });
  
    var monthWeightLossData = new Array<MonthWeightLoss>();
    var weightEndOfMonth = this.userData.startWeight;
    monthStats.forEach( function(item) {
      var monthWeightLoss = Math.round((weightEndOfMonth - item.stats[item.stats.length-1].weight)*10)/10;
      weightEndOfMonth = item.stats[item.stats.length-1].weight;
      var mwl = new MonthWeightLoss(item.month, item.year, monthWeightLoss);
      monthWeightLossData.push(mwl);
    });
    this.monthWeightLoss = monthWeightLossData;
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

    this.events.subscribe('translations', (data) => {
      console.log("weight stats, translations event");
      this.translations = data;
      if(this.userData && this.userData.id) { 
        this.calculateData(this.userData.id);
      }
    }); 
  }    
}

