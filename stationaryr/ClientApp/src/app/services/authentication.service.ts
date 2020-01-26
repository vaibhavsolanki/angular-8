import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Login, User } from '../TableEntity/TableEntityClass';
import { error } from 'protractor';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;
  //private actionUrl: string = "http://192.168.0.42/";
  private actionUrl: string = "https://localhost:44324/";
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Login {
        return this.currentUserSubject.value;
    }
    login(username, password) {
    
        
        let logindata = {
            username: username,
          passward: password,
          RememberMe:true
        }
      return this.http.post<any>(this.actionUrl + "api/Account/Login", logindata, httpOptions).pipe(map(user =>
        this.processLoginResponse(user)));

      
       
      
  }
  private processLoginResponse(response: Login) {

    localStorage.setItem('currentUser', JSON.stringify(response.username));
    localStorage.setItem('currentRole', JSON.stringify(response.role));
 localStorage.setItem('currentAppRole', JSON.stringify(response.approle));
    localStorage.setItem('auth_token', JSON.stringify(response.token));
    this.currentUserSubject.next(response);
    return response;
  }

 
    logout() {
        // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentRole');
      localStorage.removeItem('auth_token');
      this.currentUserSubject.next(null);
      
    }
}
