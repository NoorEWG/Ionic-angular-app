import { Component, OnInit, Input } from '@angular/core';
import { WeightService } from '../api/weight.service';  
import { WeightDate } from '../model/WeightDate';
import { UserData } from '../model/UserData';
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';
import { Events} from '../api/event.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-weight-add',
  templateUrl: './weight-add.component.html',
  styleUrls: ['./weight-add.component.css']
})
export class WeightAddComponent implements OnInit {
  
  weights: Array<WeightDate>;
  user: UserData;
  disabled: boolean;
  date: string;
  weight: number;
  abdominalCircumference: number;
  auth: boolean;

  constructor(private weightService: WeightService, private toastController: ToastController, private events: Events, private storage: Storage) {
    this.weights = new Array<WeightDate>();
    this.auth = false;

    storage.get('user').then((val) => {
      if(val) {
        this.user = val;
        this.auth = this.user.auth;
        if(this.auth) {
          this.getWeightStats('DESC',this.user.id);
        }
      }
    });
    this.events.subscribe('user', (data) => {
      this.user = data;
      this.auth = this.user.auth;
      if(this.auth) {
        this.getWeightStats('DESC',this.user.id);
      }
    });
    
    this.events.subscribe('weightUpdate', (data) => {
      this.getWeightStats('DESC',this.user.id);
    });  

    this.events.subscribe('weightDelete', (data) => {
      this.getWeightStats('DESC',this.user.id);
    });  
  }
  
  getWeightStats(order: string, id: number) {
    this.weightService.getWeightStats('DESC',id).subscribe(data => { 
      this.weights = data.weights;
      this.user = data.user;
      if(this.weights && this.weights.length > 0) {
        this.disabled = true;
        this.date = moment(this.weights[0].date, 'YYYY-MM-DD').add(7,'days').format('YYYY-MM-DD');
      }
      else {
        this.disabled = false;
        this.date = moment().format('YYYY-MM-DD');
      }
    });
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      position: "middle",
      duration: duration
    });
    toast.present();
  }

  public addWeight(date,weight,abdominalCircumference) {
    
    // check valid date
    if( moment(date, 'YYYY-MM-DD') > moment() )   {
      this.presentToast("You can add a weight with a date in the future",2000);
    }  
    // check valid weight
    else if (!weight || !Number(weight) ) {
      this.presentToast("Not a valid weight",2000);
    }
    // check valid weight
    else if(!abdominalCircumference || !Number(abdominalCircumference)) {
      this.presentToast("Not a valid abdominal circumference",2000);
    }
    // add the weight
    else {
      let weightDate = new WeightDate;
      weightDate.date = date;
      weightDate.weight = Number(weight);
      weightDate.abdominalCircumference = abdominalCircumference;
      this.weightService.editWeight(weightDate, this.user).subscribe(data => {
        let message = data.body;
        this.events.publish("weightUpdate", true);
        this.presentToast("" + message, 2000);
      });
    }
  }

  ngOnInit() {}
}
