import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Nutrition} from '../model/Nutrition';


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
}
