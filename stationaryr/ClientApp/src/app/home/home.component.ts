import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';




@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  approle: any[];
  array1: any[] = [];
  constructor(private router: Router)
{
//this.approle=localStorage.getItem('currentAppRole');


  }
  ngOnInit() {
    this.array1 = [];
    this.usermenu();
    var sta = this.array1.some(x => x['Value'].indexOf('it') >= 0);
    console.log(sta);
    if (sta == false) {
  
        this.router.navigate(['stationary']);
    }
    else {
        this.router.navigate(['IT']);

    }

  }
  usermenu() {
    var ob = JSON.parse(localStorage.getItem('permission'));

    var obj1 = ob[0].substring(1, ob[0].length - 1)

    var obj = JSON.parse(obj1);



    Object.keys(obj).forEach(key => {


      this.array1.push(obj[key]);


    })




  }
   
   
    // config: any;
    //   rows = [];
  
   

}
