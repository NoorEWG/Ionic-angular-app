import { Component, OnInit } from '@angular/core';
import { Health } from '@ionic-native/health/ngx';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss'],
})
export class HealthComponent implements OnInit {

  message: string;

  constructor(private health: Health) { 

    this.health.isAvailable()
    .then((available:boolean) => {
      console.log(available);
      this.health.requestAuthorization([
        'distance', 'nutrition',  //read and write permissions
        {
          read: ['steps'],       //read only permission
          write: ['height', 'weight']  //write only permission
        }
      ])
      .then(res => this.message=res)
      .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
  }

  ngOnInit() {
  }
}  
