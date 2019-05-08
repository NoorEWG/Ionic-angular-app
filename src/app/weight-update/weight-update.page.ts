import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { Internationalization } from '../model/Internationalization';

@Component({
  selector: 'weight-update-page',
  templateUrl: './weight-update.page.html',
  styleUrls: ['./weight-update.page.scss'],
})
export class WeightUpdatePage implements OnInit {

  translations: Internationalization;
  
  constructor(
    private storage: Storage,
    private events: Events) {
      this.translations = new Internationalization();
      this.storage.get('translations').then((data) => {
        this.translations = data;
      });
   }

  ngOnInit() {
    this.events.subscribe('translations', (data) => {
      this.translations = data;
    }); 
  }

}
