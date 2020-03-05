import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../TableEntity/TableEntityClass';
import { LoginResponse, AccessToken } from '../../modal/loginresponse.model';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-ithardware',
  templateUrl: './ithardware.html',
})
export class ithardwaredepart {
  currentUser: LoginResponse;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {


    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

}

