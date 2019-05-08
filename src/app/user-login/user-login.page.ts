import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { Internationalization } from '../model/Internationalization';
// import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
// import { Health } from '@ionic-native/health/ngx';

@Component({
  selector: 'user-login-page',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {

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
