import { Component, OnInit } from '@angular/core';
import { WeightDate } from '../model/WeightDate';
import * as moment from 'moment';
import { WeightService } from '../api/weight.service';  
import { UserData } from '../model/UserData';
import { ToastController } from '@ionic/angular';
import { Events} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-weight-update',
  templateUrl: './weight-update.component.html',
  styleUrls: ['./weight-update.component.css']
})
export class WeightUpdateComponent implements OnInit {

  weights: Array<WeightDate>;
  user: UserData;
  message: String;
  status: number;
  auth: boolean

  constructor(private weightService: WeightService, private toastController: ToastController, private events: Events, private storage: Storage) { 
    storage.get('user').then((val) => {
      if(val) {
        this.user = val;
        this.auth = this.user.auth;
        weightService.getWeightStats('DESC', this.user.id).subscribe(data => { 
          this.weights = data.weights;
          this.user = data.user;
          this.weights.forEach( function(w) {
            w.edit = true;
            w.save = false;
          });
        });
      }
    });
    
    this.auth = false;
    this.events.subscribe('user', (data) => {
      this.user = data;
      this.auth = this.user.auth;
      weightService.getWeightStats('DESC', this.user.id).subscribe(data => { 
        this.weights = data.weights;
        this.user = data.user;
        this.weights.forEach( function(w) {
          w.edit = true;
          w.save = false;
        });
      });
    });  
  }
 
  async presentToast(duration: number) {
    const toast = await this.toastController.create({
      message: "" + this.message,
      position: 'middle',
      duration: duration
    });
    toast.present();
  }

  public saveChanges(weightDate: WeightDate, index: number) {
    if(Number(weightDate.weight) && Number(weightDate.abdominalCircumference)) {
      this.weights[index].save = false;
      this.weights[index].edit = true;
      this.weightService.editWeight(weightDate, this.user).subscribe(data => {
        this.message = data.body;
        this.status = data.status;
        this.events.publish("weightUpdate", true);
        this.presentToast(2000);
      });
    }
    else {
      this.message = "Please verify the entered data you would like to change";
      this.presentToast(2000);
    }  
  }

  public editWeight(index) {
    this.weights[index].save = true;
    this.weights[index].edit = false;
  }
  
  public deleteWeight(weightDate) {
    this.weightService.deleteWeight(weightDate,this.user).subscribe(data => {
      this.message = data.body;
      this.status = data.status;
      this.events.publish("weightDelete", true);
      this.presentToast(2000);
    }); 
  }

  public addWeight() {
    var newWeight = new WeightDate();
    var lastDate = this.weights[0].date;
    var newDate = moment(lastDate, 'YYYY-MM-DD').add(7,'days').format('YYYY-MM-DD');

    if( moment(lastDate, 'YYYY-MM-DD').add(7,'days') > moment() )   {
      this.message = "You can't add a new weight, you will have to wait until " +  moment(newDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
      this.presentToast(2000);
    } else {
      newWeight.date = newDate;
      newWeight.save = false;
      newWeight.edit = true;
      newWeight.weekNumber = Number(this.weights[0].weekNumber) + 1;
      this.weights.unshift(newWeight);
      this.weights[0].save = true;
      this.weights[0].edit = false;
    }

  }

  ngOnInit() {}

}
