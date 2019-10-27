import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { UserData } from '../model/UserData';
import { Nutrition } from '../model/Nutrition';
import { NutritionData } from '../model/NutritionData';
import { MealType } from '../model/MealType';
import { NutritionType } from '../model/NutritionType';
import { UserNutritionDay } from '../model/UserNutritionDay';


@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  httpHeaders: HttpHeaders;
  options;
  baseUrl: string;
  nutrition: Nutrition;

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
  
  public addNutrition(nutrition: Nutrition): Observable<HttpResponse<String>> {
    let url = this.baseUrl + "addNutrition.php";
    let data = {'nutrition': nutrition};
    return this.http.post<String>(url, data, 
      {
        headers: this.httpHeaders,
        observe: 'response'
      }
    );
  }

  public addNutritionItem(userNutritionDay: UserNutritionDay): Observable<HttpResponse<String>> {
    let url = this.baseUrl + "addNutritionPerDay.php";
    let data = {userNutritionDay};
    return this.http.post<string>(url, data, 
      {
        headers: this.httpHeaders,
        observe: 'response'
      }
    );
  }
  
  public getNutritionList(): Observable<Array<Nutrition>> {
    let url = this.baseUrl + "getNutritionList.php";
    return this.http.get<Array<Nutrition>>(url);
  }

  public getMealTypeList(): Observable<Array<MealType>> {
    let url = this.baseUrl + "getMealTypeList.php";
    return this.http.get<Array<MealType>>(url);
  }

  public getNutritionTypeList(): Observable<Array<NutritionType>> {
    let url = this.baseUrl + "getNutritionTypeList.php";
    return this.http.get<Array<NutritionType>>(url);
  }

  public getNutritionData(user: UserData,date: string): Observable<Array<NutritionData>> {
    let url = this.baseUrl + "getNutritionData.php?user_id=" + user.id + "&date=" + date;
    return this.http.get<Array<NutritionData>>(url);
  }

  public editUserNutritionItem(id: number, quantity: number, mealType: string):  Observable<string> {
    let url = this.baseUrl + "editUserNutritionItem.php?id=" + id + "&quantity=" + quantity +  "&meal_type=" + mealType;
    return this.http.get<string>(url);
  }

  public deleteUserNutritionItem(id: number, user_id: number):  Observable<string> {
    let url = this.baseUrl + "deleteUserNutritionItem.php?id=" + id + "&user_id=" + user_id ;
    return this.http.get<string>(url);
  }

  public getCaloriesData(user_id: number):  Observable<string> {
    let url = this.baseUrl + "getCaloriesData.php?user_id=" + user_id;
    return this.http.get<string>(url);
  }
}  
