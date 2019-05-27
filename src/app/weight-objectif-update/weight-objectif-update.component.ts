import { Component, OnInit } from '@angular/core';
import { WeightService } from '../api/weight.service';  
import { UserWeightObjectifs } from '../model/UserWeightObjectifs';
import * as moment from 'moment'; 
import { ToastController } from '@ionic/angular';
import { Events} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Internationalization } from '../model/Internationalization';
import { UserData } from '../model/UserData';
import { UserWeightStats } from '../model/UserWeightStats';

@Component({
  selector: 'app-weight-objectif-update',
  templateUrl: './weight-objectif-update.component.html',
  styleUrls: ['./weight-objectif-update.component.scss'],
})
export class WeightObjectifUpdateComponent implements OnInit {

  objectifs: Array<UserWeightObjectifs>;
  user: UserData;
  translations: Internationalization;
  message: String;
  status: String;
  weightStats: UserWeightStats;

  constructor(
    private weightService: WeightService,
    private storage: Storage,
    private events: Events,
    private toastController: ToastController
    ) {
      this.translations = new Internationalization();
      this.objectifs = new Array<UserWeightObjectifs>();
      this.user = new UserData();
      this.message = "";
      this.status = null;
      this.storage.get('translations').then((data) => {
        this.translations = data;
        this.storage.get('user').then((data) => {
          this.user = data;
          if(this.user && this.user.id) {
            this.weightService.getWeightObjectifs(this.user.id).subscribe(data => {
              var objectifs = data;
              this.transformObjectifs(objectifs, this.translations);
            });
            this.weightService.getWeightStats('ASC', this.user.id).subscribe(data => {
              this.weightStats = data;
            });
          }
        });    
      });
   }

  ngOnInit() {}

  transformObjectifs(objectifs: Array<UserWeightObjectifs>, translations: Internationalization) {
    objectifs.forEach( function(item) {
      item.showNumber = true;
      if(item.typeObjectif == 1) {
        item.typeDescription = translations.objectif1;
        item.showNumber = false;
      }
      else if (item.typeObjectif == 2) {
        item.typeDescription = translations.objectif2;
      }
      else if (item.typeObjectif == 3) {
        item.typeDescription = translations.objectif3;
      }
      else  {
        item.typeDescription = translations.objectif4;
      }
      if(item.date) {
        item.date = moment(item.date, "YYYY-MM-DD").format("DD-MM-YYYY");
      }  
    });
    objectifs.sort(function(a, b){return b.weight-a.weight});
    this.objectifs = objectifs;
  }

  async presentToast(duration: number) {
    const toast = await this.toastController.create({
      message: "" + this.message,
      position: 'middle',
      duration: duration
    });
    toast.present();
  }

  public saveChanges(objectif: UserWeightObjectifs, index: number) {
    objectif.date = null;
    var stop = 0;
    this.weightStats.weights.forEach( function (weight) {
      if (Number(objectif.weight) >= Number(weight.weight) && stop == 0) {
        objectif.date = weight.date;
        stop = 1;
      } 
    });
    if(Number(objectif.weight)) {
      this.objectifs[index].save = false;
      this.objectifs[index].edit = true;
      this.weightService.editWeightObjectif(objectif).subscribe(data => {
        this.message = data.body;
        this.events.publish("objectifUpdate", true);
        this.presentToast(2000);
      });
    }
    else {
      this.message = this.translations.weightUpdateMissingData;
      this.presentToast(2000);
    }
  }

  public editObjectif(index) {
    this.objectifs[index].save = true;
    this.objectifs[index].edit = false;
  }
  
  public recalculateWeight(i: number) {
    var objectif = this.objectifs[i];
    if(objectif.typeObjectif == 1) {
      this.objectifs[i].percentage = null;
      this.objectifs[i].showNumber = false;
    }
    else {  
      this.objectifs[i].showNumber = true;
      if(objectif.percentage && !isNaN(objectif.percentage)) {
        if(objectif.typeObjectif == 2) {
          this.objectifs[i].weight = Math.round((this.user.startWeight  - (this.user.startWeight - this.user.targetWeight) * objectif.percentage / 100) * 10) / 10;
        }
        else if(objectif.typeObjectif == 3) {
          this.objectifs[i].weight = Math.round(this.user.startWeight * (100 - objectif.percentage ) / 10) / 10;
        }
        else {
          this.objectifs[i].weight = Math.round((this.user.length * this.user.length * this.objectifs[i].percentage)*10)/10;
        }
      }
    }
  }

  public deleteObjectif(index, objectif) {
    /*this.weightService.deleteObjectif(objectif, this.user).subscribe(data => {
      this.message = data.body;
      if(this.message.includes('deleted') && data.status === 200) {
        this.objectif[index].weight = null;
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
        this.events.publish("objectifDelete", true);
      }
      else {
        this.message = "Something went wrong";
      }
      this.presentToast(2000);
    });*/ 
  }

  public addObjectif() {
    var newObjectif = new UserWeightObjectifs();
    newObjectif.save = false;
    newObjectif.edit = true;
    this.objectifs.unshift(newObjectif);
    this.objectifs[0].save = true;
    this.objectifs[0].edit = false;
  }

  public openEdit(index: number, open: boolean) {
    this.objectifs.forEach( function(w) {
      w.openEdit = false;
    });
    this.objectifs[index].openEdit = open;
    if(open) {
      this.objectifs[index].edit = open;
      this.objectifs[index].save = false;
    } 
  }

  public abortDelete(index: number) {
    this.objectifs[index].openConfirmDelete = false;
  }

  public confirmDelete(index: number) {
    this.objectifs[index].openConfirmDelete = true;
  }
}