import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userChanged = new Subject();
  constructor(private readonly http: HttpClient) {}

  fetchUserTradeInformation(): Observable<any>{
    return this.http.get("/trades.json", {
    params: {id: sessionStorage.getItem('user')}
    });
  }

  fetchCountryNotes(): Observable<any>{
    return this.http.get("/notes.json", {
    params: {id: sessionStorage.getItem('user')}
    });
  }


  sendUserTradeInformation(allUserTradeDatas: any[]){
    const userName = sessionStorage.getItem('user');
    const userTrades = {
      id:userName,
      allUserTradeDatas
    }
    this.http.patch("/trades.json",userTrades).subscribe();

  }

  sendUserCountryNotes(allCountryNotes: any[]){
    const userName = sessionStorage.getItem('user');
    const userTrades = {
      id:userName,
      allCountryNotes
    }
    this.http.patch("/notes.json",userTrades).subscribe();

  }
}
