import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Events } from '@ionic/angular';
import { UserService} from '../api/user.service';
import { UserData } from '../model/UserData';
import { Internationalization } from '../model/Internationalization';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
   
  angForm: FormGroup;
  bForm: FormGroup;
  loginText: string;
  user: string;
  password: string;
  userData: UserData;
  message: string;
  showLogin: boolean = true;
  auth: boolean = false;
  language: string;
  translations: Internationalization = new Internationalization();
  translateArray: Array<string>;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private events: Events, 
    private storage: Storage,
    
    ) {
    this.storage.get('translations').then((data) => {
      this.translations = data;
    });
    // initialize the form
    this.createForms();
    this.knownUser();
  }

  createForms() {
    this.angForm = this.fb.group({
      email: ['', Validators.required ],
      pwd: ['', Validators.required ],
    });
    this.bForm = this.fb.group({
      email: ['', Validators.required ],
      pwd: ['', Validators.required ],
      name: ['', Validators.required ],
      firstName: ['', Validators.required ],
      startWeight: ['', Validators.required ],
      targetWeight: ['', Validators.required ],
      length: ['', Validators.required ],
    });
  }

  knownUser() {
    this.storage.get('user').then((data) => {
      var user = data;
      if(user && user.id) {
        this.user = user;
        this.auth = true;
      } 
    });
  }

  inscription() {
    this.showLogin = false;
    this.loginText = this.translations.inscription;
  }

  login() {
    this.showLogin = true;
    this.loginText = this.translations.logout;
  }

  logOut() {
    this.showLogin = true;
    this.auth = false;
    this.storage.clear();
    this.events.publish('clearData', null);
    this.loginText = this.translations.login;
    this.message = this.translations.logoutMessage; //"You are disconnected";
  }

  saveUser() {
    this.userService.saveUser(this.bForm.value).subscribe(data => {
      var id = data.body;
      if(id > 0) {
        this.userService.login(this.bForm.value).subscribe(data => {
          this.userData = data.body;
          if(this.userData && this.userData.id > 0) {
            this.userData.auth = true;
            this.auth = true;
            this.storage.set('user',this.userData);  
            this.events.publish('user', this.userData);
            this.message = this.translations.loginMessage; //"You are connected";
          }
          else {
            this.message = this.translations.loginErrorMessage;//"Impossible to login, please check your email and password";
          }
        });
      }
      else {
        this.userData.auth = false;
        this.message = this.translations.inscriptionErrorMessage; //"Something went wrong with your inscription, please try again later";
      }
    });
  }

  loginUser() {
    this.userService.login(this.angForm.value).subscribe(data => {
      this.userData = data.body;
      if(this.userData && this.userData.id > 0) {
        this.userData.auth = true;
        this.auth = true;
        this.events.publish('user', this.userData);
        this.storage.set('user',this.userData);  
        this.message = this.translations.loginMessage; //"You are connected";
      }
      else {
        this.message = this.translations.loginErrorMessage; //"Impossible to login, please check your email and password";
        this.auth = false;
      }
    });
  }

  ngOnInit() { 
    this.events.subscribe('translations', (data) => {
      this.translations = data;
      this.createForms();
      this.knownUser();
    }); 
  }

}