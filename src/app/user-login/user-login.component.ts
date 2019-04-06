import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NavController, Events } from '@ionic/angular';
import { UserService} from '../api/user.service';
import { UserData } from '../model/UserData';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  angForm: FormGroup;
  bForm: FormGroup;
  showLogin: boolean;
  loginText: string;
  userData: UserData;
  message: string;

  constructor(private fb: FormBuilder, private userService: UserService, private navCrtl: NavController, private events: Events, private storage: Storage) {
    this.showLogin = true;
    this.loginText = "Login";
    this.createForms();
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
    });
  }

  inscription() {
    this.showLogin = false;
    this.loginText = "Inscription";
  }

  login() {
    this.showLogin = true;
    this.loginText = "Login";
  }

  saveUser() {
    console.log(this.bForm.value);
  }

  loginUser() {
    this.userService.login(this.angForm.value).subscribe(data => {
      this.userData = data.body;
      if(this.userData && this.userData.id > 0) {
        this.userData.auth = true;
        this.events.publish('user', this.userData);
        this.storage.set('user',this.userData);  
        this.message = "You are connected";
        //this.navCrtl.navigateForward('/weight-stats');
      }
      else {
        this.message = "Impossible to login, please check your email and password";
      }
    });
  }

  ngOnInit() {
  }

}
