import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Internationalization } from '../model/Internationalization';

@Component({
  selector: 'weight-stats-page',
  templateUrl: './weight-stats.page.html',
  styleUrls: ['./weight-stats.page.scss'],
})
export class WeightStatsPage implements OnInit {

  translations: Internationalization;
  constructor(
    private http: HttpClient, 
    private menu: MenuController,
    private storage: Storage) { 
      this.translations = new Internationalization();
      this.storage.get('translations').then((data) => {
        this.translations = data;
      });
    }

  openStats() {
    this.menu.enable(true, 'stats');
    this.menu.open('stats');
  }

  ngOnInit() {
  }

}
