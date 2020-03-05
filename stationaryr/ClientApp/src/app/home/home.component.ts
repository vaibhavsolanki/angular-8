import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';



@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  approle: any[];
  array1: any[] = [];
  UserName: string;
  constructor(private router: Router, private authenticationService: AuthenticationService, ) {
    //this.approle=localStorage.getItem('currentAppRole');


  }
  ngOnInit() {
    this.UserName = JSON.parse(localStorage.getItem('currentUser').toLowerCase());

    this.array1 = [];
    this.usermenu();
    var it = this.array1.some(x => x['Value'].indexOf('it.') >= 0);
    var sta = this.array1.some(x => x['Value'].indexOf('sta') >= 0);
    console.log(sta, it);
    if (it == true && sta == false) {

      this.router.navigate(['IT']);
    }
    else if (it == false && sta == true) {
      this.router.navigate(['stationary']);

    }
    else if (sta == true && it == true) {

    }

  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  usermenu() {
    var ob = JSON.parse(localStorage.getItem('permission'));
    if (ob != null) {
      var obj1 = ob[0].substring(1, ob[0].length - 1)

      var obj = JSON.parse(obj1);



      Object.keys(obj).forEach(key => {


        this.array1.push(obj[key]);


      })

    }


  }
  
   

}
