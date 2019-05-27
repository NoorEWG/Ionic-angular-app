import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { UserData } from '../model/UserData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpHeaders: HttpHeaders;
  options;
  baseUrl: string;
 
  user: UserData;
 

  constructor(private http: HttpClient) {
    
    this.baseUrl = "https://paardrijvakantie.com/api/weightloss/";
    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    }); 

    this.options = {
      headers: this.httpHeaders,
      observe: 'response' 
    };
  }
 
  public login(login: LoginData): Observable<HttpResponse<UserData>>  {
    let url = this.baseUrl + 'loginWeightLoss.php';
    return this.http.post<UserData>(url, login,
      {
        headers: this.httpHeaders,
        observe: 'response'
      }
    );
  }  


  public saveUser(user: UserData): Observable<HttpResponse<number>>  {
    let url = this.baseUrl + 'saveUserWeightLoss.php';
    return this.http.post<number>(url, user,
      {
        headers: this.httpHeaders,
        observe: 'response'
      }
    );
  }  
}

export class LoginData {
  email: string;
  pwd: string;

  constructor() {}
}