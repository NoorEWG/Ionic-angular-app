import { Component, OnInit } from '@angular/core';
import { WeightDate } from '../model/WeightDate';
import * as moment from 'moment';
import { WeightService } from '../api/weight.service';  
import { UserData } from '../model/UserData';
import { ToastController } from '@ionic/angular';
import { Events} from '../api/event.service';
import { Storage } from '@ionic/storage-angular';
import { Internationalization } from '../model/Internationalization';
import { UserWeightObjectifs } from '../model/UserWeightObjectifs';

@Component({
  selector: 'app-weight-update-weight',
  templateUrl: './weight-update-weight.component.html',
  styleUrls: ['./weight-update-weight.component.css']
})
export class WeightUpdateWeightComponent implements OnInit {

  weights: Array<WeightDate>;
  user: UserData;
  message: String;
  status: number;
  translations: Internationalization;
  auth: boolean;

  constructor(private weightService: WeightService, private toastController: ToastController, private events: Events, private storage: Storage) { 
    
    this.auth = false;
    this.storage.get('user').then((data) => {
      if(data) {
        this.user = data;
        this.auth = this.user.auth;
        weightService.getWeightStats('DESC', this.user.id).subscribe(data => { 
          this.weights = data.weights;
          this.user = data.user;
          this.weights.forEach( function(w) {
            w.edit = true;
            w.save = false;
            w.openEdit = false;
            w.openConfirmDelete = false;
          });
        });
      }
    });
    this.storage.get('translations').then((data) => {
      if(data) {
       this.translations = data;
      }
    });
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
    if(Number(weightDate.weight)) {
      this.weights[index].save = false;
      this.weights[index].edit = true;

      this.weightService.editWeight(weightDate, this.user).subscribe(data => {
        this.status = data.status;
        if(this.status == 200) {
          this.message = this.translations.weightUpdateSuccess;
          this.events.publish("weightUpdate", true);
          this.weightService.getWeightObjectifs(this.user.id).subscribe(data => {
            var objectifs = data;
            for(var i = 0; i < objectifs.length; i++) {
              if (weightDate.weight <= objectifs[i].weight && !objectifs[i].date) {
                objectifs[i].date = weightDate.date;
                this.updateObjectif(objectifs[i]);
              }
            }
          });
        }
        this.presentToast(2000);
      });
    }
    else {
      this.message = this.translations.weightUpdateMissingData;
      this.presentToast(2000);
    }  
  }

  public updateObjectif(objectif) {
    this.weightService.editWeightObjectif(objectif, this.user).subscribe( data => {
      this.events.publish("objectifUpdate", objectif);
    });
  }

  public editWeight(index) {
    this.weights[index].save = true;
    this.weights[index].edit = false;
  }
  
  public deleteWeight(index, weightDate) {
    this.weightService.deleteWeight(weightDate, this.user).subscribe(data => {
      this.message = data.body;
      if(this.message.includes('deleted') && data.status === 200) {
        this.weights[index].weight = null;
        this.weights[index].hips = null;
        this.weights[index].abdominalCircumference = null;
        this.weights[index].leftArm = null;
        this.weights[index].rightArm = null;
        this.weights[index].leftLeg = null;
        this.weights[index].rightLeg = null;
        this.weights[index].weightLoss = null;
        this.weights[index].weekWeightLoss = null;
        this.weights[index].bmi = null;
        this.weights[index].openConfirmDelete = false;
        this.status = data.status;
        this.events.publish("weightDelete", true);
      }
      else {
        this.message = "Something went wrong";
      }
      this.presentToast(2000);
    }); 
  }

  public addWeight() {
    var newWeight = new WeightDate();
    var lastDate = this.weights[0].date;
    var newDate = moment(lastDate, 'YYYY-MM-DD').add(7,'days').format('YYYY-MM-DD');

    // add missing weeks if not added before
    var lastWeekNumber = this.weights[0].weekNumber;
    this.weights.forEach(data => {
      var missingWeeks = lastWeekNumber - data.weekNumber;
      if (missingWeeks > 1) {
        for (var i = 0; i < missingWeeks; i++) { 
          var missingWeekNumber = Number(data.weekNumber) + i;
          var missingWeekDate = moment(data.date, 'YYYY-MM-DD').add((7*i),'days').format('YYYY-MM-DD');
          var newWeightItem = new WeightDate();
          newWeightItem.weekNumber = missingWeekNumber;
          newWeightItem.date = missingWeekDate;
          newWeightItem.weight = data.weight;
          newWeightItem.abdominalCircumference = data.abdominalCircumference;
          this.saveChanges(newWeightItem, 0);          
        }
      }
      lastWeekNumber = data.weekNumber;
    });

    if( moment(lastDate, 'YYYY-MM-DD').add(7,'days') > moment() ) {
      this.message = this.translations.weightUpdateNewDateAfterNow +  moment(newDate, 'YYYY-MM-DD').format('DD-MM-YYYY');
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

  public openEdit(index: number, open: boolean) {
    this.weights.forEach( function(w) {
      w.openEdit = false;
    });
    this.weights[index].openEdit = open;
    if(open) {
      this.weights[index].edit = open;
      this.weights[index].save = false;
    } 
  }

  public abortDelete(index: number) {
    this.weights[index].openConfirmDelete = false;
  }

  public confirmDelete(index: number) {
    this.weights[index].openConfirmDelete = true;
  }

  ngOnInit() {
    this.events.subscribe('translations', (data) => {
      this.translations = data;
    }); 
  }

}
