import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Events } from './api/event.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage-angular';
import { TranslateService } from '@ngx-translate/core';
import { Internationalization } from './model/Internationalization';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  
  translations: Internationalization;
  translateArray: Array<string>;
  language: string;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private events: Events,
    private translateService: TranslateService,
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.translations = new Internationalization;
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translateArray = [  "menu", "user","password","submit","save","login","loginRequired","logout",
        "backToLogin","inscription","loginMessage","logoutMessage","loginErrorMessage",
        "inscriptionErrorMessage","email","emailRequired","passwordRequired","name",
        "nameRequired","firstName","firstNameRequired","startWeight","startWeightRequired",
        "targetWeight","targetWeightRequired","length","lengthRequired",           
        "weightUpdate","weightAdd","overview","data","weightStats","weight",
        "weightLoss","weightLossPieChart","weightGainPieChart","bmi",
        "waist","hips","leftLeg","rightLeg","leftArm","rightArm",
        "arms","legs","weightLossGainPieCharts",
        "weightUpdateMissingData", "weightUpdateNewDateAfterNow", "weightUpdateSuccess",
        "totalWeightToLose","kg","actuelWeight","totalWeightLostSoFar","averagePerWeek",
        "startDate","targetDate","date","totalWeightLoss","percentageOfWeightToLose",
        "leftToLose","weeklyWeightLoss", "monthlyWeightLoss", "month","week", 
        "statsGraphs","weightAddUpdate", "objectifs", "objectif1", "objectif2", "objectif3",
        "objectif4", "reward", "locale", "age", "gender", "male", "female", "other", "objectif",
        "fat","muscle", "water", "fatMuscleWaterPercentages", "nutrition", "calories", 
        
      ];
      // initialize language
      this.initTranslate();
      this.storage.create();
    });

    
  }

  initTranslate() {
    // default language
    this.language = 'en';
    if(this.translateService.getBrowserLang() !== undefined) {
      var browserLanguage = this.translateService.getBrowserLang();
      var supportedLanguages = ["en","fr","nl"];
      // Check if the browserlanguage has a translation file
      if(supportedLanguages.indexOf(browserLanguage) >= 0 ) {
        this.language = this.translateService.getBrowserLang();
      }
    }
    else {
      // Set to default language
      this.language = 'en'; 
    }
    this.translateLanguage(false);
  }

  changeLanguage(value): void {
    this.translateLanguage(value); 
  }

  translateLanguage(value): void {
    this.translateService.use(this.language);
    this.initialiseTranslation(value);
  }

  initialiseTranslation(value): void {
    this.translateService.get(this.translateArray).subscribe((res: Internationalization) => {
      this.translations = res;
      if(value) {
        this.events.publish('translations', {translations : this.translations});
      }
      else {
        this.storage.set('translations', this.translations);
      }
    });
  }
}
