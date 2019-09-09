import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { Internationalization } from '../model/Internationalization';
import { UserData } from '../model/UserData';

@Component({
  selector: 'weight-update-page',
  templateUrl: './weight-update.page.html',
  styleUrls: ['./weight-update.page.scss'],
})
export class WeightUpdatePage implements OnInit {

  translations: Internationalization;
  updateWeight: boolean;
  updateObjectif: boolean;
  updateNutrition: boolean;
  updateCaloriesCalc: boolean;
  auth: boolean;
  user: UserData;
  
  constructor(
    private storage: Storage,
    private events: Events) {
      this.updateNutrition = false;
      this.updateWeight = true;
      this.updateObjectif = false;
      this.updateCaloriesCalc = false;
      this.auth= false;  
      this.translations = new Internationalization();
      this.storage.get('translations').then((data) => {
        this.translations = data;
        this.storage.get('user').then((data) => {
          this.user = data;
          if(this.user && this.user.id) {
            this.auth = true;
            this.user.auth = this.auth;
          }
          else {
            this.user = null;
            this.auth = false;
          }
        });
      });

   
   }

  ngOnInit() {
    this.events.subscribe('translations', (data) => {
      this.translations = data;
    }); 
    this.events.subscribe('user', (data) => {
      this.user = data;
      if(this.user && this.user.id) {
        this.auth = true;
        this.user.auth = this.auth;
      }
      else {
        this.user = null;
        this.auth = false;
      }
    }); 
  }

  showWeightUpdate() {
    this.updateWeight = true;
    this.updateObjectif = false;
    this.updateNutrition = false;
    this.updateCaloriesCalc = false;
  }

  showWeightObjectifUpdate() {
    this.updateWeight = false;
    this.updateObjectif = true;
    this.updateNutrition = false;
    this.updateCaloriesCalc = false;
  }

  showNutritionUpdate() {
    this.updateWeight = false;
    this.updateObjectif = false;
    this.updateNutrition = true;
    this.updateCaloriesCalc = false;
  }

  showCaloriesUpdate() {
    this.updateWeight = false;
    this.updateObjectif = false;
    this.updateNutrition = false;
    this.updateCaloriesCalc = true;
  }

}
