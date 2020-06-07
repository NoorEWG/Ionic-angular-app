import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Events } from '../api/event.service';
import { UserService} from '../api/user.service';
import { UserData } from '../model/UserData';
import { WeightService} from '../api/weight.service';
import { WeightDate } from '../model/WeightDate';
import { Internationalization } from '../model/Internationalization';
import { Storage } from '@ionic/storage';
import { BluetoothService} from '../api/bluetooth.service';
import * as moment from 'moment';
//import { Ionic4DatepickerModalComponent } from 'ionic4-datepicker';

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
  //datePickerObj;
  startDate;
  addUserData;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private weightService: WeightService, 
    private events: Events, 
    private storage: Storage,
    private bluetooth: BluetoothService    
    ) {
    this.storage.get('translations').then((data) => {
      this.translations = data;
    });

    var bluetoothDevices = this.bluetooth.getBluetoothDevices();
    if(bluetoothDevices) {
     this.message += this.message + JSON.stringify(bluetoothDevices);
    }
    this.addUserData = { 'errorCode' : null, 'weightData' : UserData};
    // check if the user is already stored
    this.knownUser();

    /*this.datePickerObj ={
      inputDate: new Date(), 
      fromDate: new Date(),
      showTodayButton: false, 
      closeOnSelect: true,
      mondayFirst: true,
      titleLabel: 'Select a Date', 
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      dateFormat: 'DD-MM-YYYY',
      momentLocale: this.translations.locale,  
      arrowNextPrev: {
        nextArrowSrc: 'assets/images/arrow_right.svg',
        prevArrowSrc: 'assets/images/arrow_left.svg'
      } 
    };*/

    // initialize the form
    this.createForms();
   
  }

  createForms() {
    var today = moment().format('YYYY-MM-DD');
    var datePattern = "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"; 
    this.angForm = this.fb.group({
      email: ['', Validators.required ],
      pwd: ['', Validators.required ],
    });
    this.bForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      pwd: ['', Validators.required, Validators.minLength(6)],
      name: ['', Validators.required, Validators.minLength(4)],
      firstName: ['', Validators.required, Validators.minLength(4) ],
      startWeight: ['', Validators.required, Validators.min(40), Validators.max(200)],
      targetWeight: ['', Validators.required, Validators.min(40), Validators.max(150)],
      length: ['', Validators.required,  Validators.min(100), Validators.max(220)],
      age: ['', Validators.required,  Validators.min(18), Validators.max(100)],
      gender: ['f'],
      startDate: [today, Validators.required],
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
    this.message = this.translations.logoutMessage;
  }

  saveUser() {
    this.bForm.value.startDate = 
    this.userService.saveUser(this.bForm.value).subscribe(data => {
      this.addUserData = data.body;
      if(this.addUserData.errorCode == 0) {
        this.userData = this.addUserData.userData;
        if(this.userData && this.userData.id > 0) {
          this.userData.auth = true;
          this.auth = true;
          this.storage.set('user',this.userData);  
          this.events.publish('user', this.userData);

          // register the first weight data
          var weightDate = new WeightDate();
          weightDate.weekNumber = 1;
          weightDate.weight = this.userData.startWeight;
          weightDate.date = this.bForm.value.date;
          this.message = this.translations.loginMessage;
          console.log(this.bForm.value.date);
          //this.weightService.editWeight(weightDate, this.userData).subscribe(data => {});
        }
        else {
          //this.auth = false;
          this.storage.set('user', null);  
          this.events.publish('user', null);
          this.message = this.translations.loginErrorMessage;
        }
      }
      if( this.addUserData.errorCode == 1) {
        //this.auth = false;
        this.storage.set('user', null);  
        this.events.publish('user', null);
        this.message = this.translations.userExistsErrorMessage;
      }
      if( this.addUserData.errorCode == 2) {
        // this.auth = false;
        this.storage.set('user', null);  
        this.events.publish('user', null);
        this.message = this.translations.inscriptionErrorMessage;
      }
    });
  }

  loginUser() {
    this.userService.login(this.angForm.value).subscribe(data => {
      this.userData = data.body;
      console.log(JSON.stringify(this.userData));
      if(this.userData && this.userData.id > 0) {
        this.userData.auth = true;
        this.auth = true;
        this.events.publish('user', this.userData);
        this.storage.set('user',this.userData);
        this.message = this.translations.loginMessage; //"You are connected";
      }
      else {
        this.auth = false;
        this.events.publish('user', null);
        this.storage.set('user', null);
        this.message = this.translations.loginErrorMessage; //"Impossible to login, please check your email and password";
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