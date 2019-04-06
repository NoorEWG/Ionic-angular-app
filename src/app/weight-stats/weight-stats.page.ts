import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'weight-stats-page',
  templateUrl: './weight-stats.page.html',
  styleUrls: ['./weight-stats.page.scss'],
})
export class WeightStatsPage implements OnInit {

  constructor(private http: HttpClient, private menu: MenuController) { 
  }

  openStats() {
    this.menu.enable(true, 'stats');
    this.menu.open('stats');
  }

  ngOnInit() {
  }

}
