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
  show: boolean;
  auth: boolean;
  user: UserData;
  
  constructor(
    private storage: Storage,
    private events: Events) {
      this.show = true;
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
    this.show = true;
  }

  showWeightObjectifUpdate() {
    this.show = false;
  }

}
