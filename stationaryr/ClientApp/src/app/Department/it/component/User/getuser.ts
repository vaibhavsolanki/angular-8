import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-get-user-it',
  templateUrl: './getuser.html',
})
export class getuserit implements OnInit {
dynamicdata: any;
  link: string;
 

  ngOnInit() {
    this.link = 'AddUsers';



  }

}
