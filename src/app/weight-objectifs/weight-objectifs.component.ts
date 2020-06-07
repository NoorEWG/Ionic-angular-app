import { Component, OnInit } from '@angular/core';
import { WeightService } from '../api/weight.service';  
import { UserWeightObjectifs } from '../model/UserWeightObjectifs';
import { UserData } from '../model/UserData';
import { Events} from '../api/event.service';
import { Storage } from '@ionic/storage';
import { Internationalization } from '../model/Internationalization';
import * as moment from 'moment'; 

@Component({
  selector: 'app-weight-objectifs',
  templateUrl: './weight-objectifs.component.html',
  styleUrls: ['./weight-objectifs.component.scss'],
})
export class WeightObjectifsComponent implements OnInit {
  
  user: UserData;
  auth: boolean;
  translations: Internationalization;
  objectifs: Array<UserWeightObjectifs>;

  constructor(private weightService: WeightService, private storage: Storage, private events: Events) { 
    this.auth = false;
    this.translations = new Internationalization();
    this.objectifs = new Array<UserWeightObjectifs>();
    /*this.storage.get('translations').then((data) => {
      this.translations = data;
      console.log("translations ok");
      this.storage.get('user').then((val) => {
        if(val) {
          this.user = val;
          this.auth = this.user.auth;
          this.weightService.getWeightObjectifs(this.user.id).subscribe(data => {
            this.objectifs = data;
            this.objectifs.forEach( function(item) {
              if(item.typeObjectif === 1) {
                item.typeDescription = this.translations.objectif1;
              }
              else if (item.typeObjectif === 2) {
                item.typeDescription = this.translations.objectif2;
              }
              else if (item.typeObjectif === 3) {
                item.typeDescription = this.translations.objectif3;
              }
              else  {
                item.typeDescription = this.translations.objectif4;
              }
              item.date = moment(item.date, "YYYY-MM-DD").format("DD-MM-YYYY");
            });
            this.storage.set('objectifs',this.objectifs);
          });
        }
        else {
          this.auth = false;
          this.user = null;
          this.objectifs = null;
        } 
      }).catch((errorUser: any) => {
        console.log(errorUser);
        return;
      });
    }).catch((errorTranslations: any) => {
      console.log(errorTranslations);
      return;
    });*/   
  }

  ngOnInit() {
    this.storage.get('translations').then((data) => {
      this.translations = data;
      this.storage.get('user').then((val) => {
        if(val) {
          this.user = val;
          this.auth = this.user.auth;
          this.weightService.getWeightObjectifs(this.user.id).subscribe(data => {
            var objectifs = data;
            this.transformObjectifs(objectifs, this.translations);
          });
        }
        else {
          this.auth = false;
          this.user = null;
          this.objectifs = null;
        } 
      }).catch((errorUser: any) => {
        console.error(errorUser);
        return;
      });
    }).catch((errorTranslations: any) => {
      console.error(errorTranslations);
      return;
    });  
    
    this.events.subscribe('translations', (data) => {
      this.translations = data;
      this.storage.get('user').then((val) => {
        if(val) {
          this.user = val;
          this.weightService.getWeightObjectifs(this.user.id).subscribe(data => {
            var objectifs = data;
            this.transformObjectifs(objectifs, this.translations);
          });
        }
        else {
          this.user = null;
          this.objectifs = null;
        } 
      }).catch((errorUser: any) => {
        console.error(errorUser);
        return;
      });   
    }); 
  }

  transformObjectifs(objectifs: Array<UserWeightObjectifs>, translations: Internationalization) {
    objectifs.forEach( function(item) {
      if(item.typeObjectif == 1) {
        item.typeDescription = translations.objectif1;
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
}
