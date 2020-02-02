import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Login, User } from '../TableEntity/TableEntityClass';
import { error } from 'protractor';
import { JwtHelper } from './jwt-helper';
import { LoginResponse, AccessToken } from '../modal/loginresponse.model';
import { PermissionValues } from '../modal/permission.modal';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;
  //private actionUrl: string = "http://192.168.0.42/";
  private actionUrl: string = "https://localhost:44324/"//;
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
  private processLoginResponse(response: LoginResponse) {

    const accessToken = response.access_token;

    if (accessToken == null) {
      throw new Error('accessToken cannot be null');
    }
    const jwtHelper = new JwtHelper();
    const decodedAccessToken = jwtHelper.decodeToken(accessToken) as AccessToken;
    console.log(decodedAccessToken);
    const permissions: PermissionValues[] = Array.isArray(decodedAccessToken.permission) ? decodedAccessToken.permission : [decodedAccessToken.permission];


    localStorage.setItem('currentUser', JSON.stringify(decodedAccessToken.sub));
    localStorage.setItem('currentRole', JSON.stringify(decodedAccessToken.role));
    localStorage.setItem('permission', JSON.stringify(permissions));

    console.log(permissions);
    localStorage.setItem('auth_token', JSON.stringify(accessToken));
 //   this.currentUserSubject.next(response);
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
