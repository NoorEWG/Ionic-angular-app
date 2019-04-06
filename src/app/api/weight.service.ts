import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { WeightDate} from '../model/WeightDate';
import { UserWeightStats} from '../model/UserWeightStats';
import { UserData } from '../model/UserData';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  httpHeaders: HttpHeaders;
  options;
  baseUrl: string;
  weightDate: WeightDate;
  user: UserData;
  userWeightStats: UserWeightStats;

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
  
  public getWeightStats(order:String, id: number): Observable<UserWeightStats> {
    let url = this.baseUrl + 'getWeightStats.php?order=' + order + '&id='+id;
    return this.http.get<UserWeightStats>(url);
  }   

  public addWeight(weightDate: WeightDate): Observable<HttpResponse<String>> {
    let url = this.baseUrl + "add";
    return this.http.post<String>(url, weightDate,
      {
        headers: this.httpHeaders,
        observe: 'response'
      }
    );
  }  
  public editWeight(weightDate: WeightDate, user: UserData): Observable<HttpResponse<String>> {
    let url = this.baseUrl + "editWeightStats.php";
    var data = {'weight': weightDate, 'user': user};
    return this.http.post<String>(url, data, 
      {
        headers: this.httpHeaders,
        observe: 'response'
      }
    );
  } 

  public deleteWeight(weightDate: WeightDate, user: UserData): Observable<HttpResponse<String>> {
    let url = this.baseUrl + "deleteWeight.php";
    var data = {'weight': weightDate, 'user': user};
    return this.http.post<String>(url, data,
      {
        headers: this.httpHeaders,
        observe: 'response'
      }
    );
  } 
}
