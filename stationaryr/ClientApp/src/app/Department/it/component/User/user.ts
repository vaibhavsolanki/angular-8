import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-user-it',
  templateUrl: './user.html',
})
export class userit implements OnInit {
dynamicdata: any;
  link: string;
  

  ngOnInit() {
    this.link = 'GetUsers';



  }

}
