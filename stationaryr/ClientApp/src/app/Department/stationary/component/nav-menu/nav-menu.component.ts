//import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../../services/authentication.service';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnDestroy, OnInit {
  UserName: string;
  //constructor(private authenticationService: AuthenticationService, private router: Router) {}
  //navbarOpen = false;

  //toggleNavbar() {
  //    this.navbarOpen = !this.navbarOpen;
  //}

  array: any[] = [];
  ngOnInit() {
    this.UserName = JSON.parse(localStorage.getItem('currentUser').toLowerCase());

    this.usermenu();
    this.usermenuview();
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authenticationService: AuthenticationService, private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }
  redirecthome() {

    this.router.navigate(['/']);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  usermenu() {
    var ob = JSON.parse(localStorage.getItem('permission'));
    if (ob != null) {
      var obj1 = ob[0].substring(1, ob[0].length - 1)

      var obj = JSON.parse(obj1);



      Object.keys(obj).forEach(key => {


        this.array.push(obj[key]);


      })

    }


  }
  usermenuview() {

    this.canViewUsers;
    this.canViewRoles;
    this.canViewCategory;
    this.canViewSubCategory;
    this.canViewSubChildCategory;


  }
  get canViewUsers() {



    return this.array.some(e => e.Value == "userssta.view")


  }
  get canViewRoles() {
    return this.array.some(e => e.Value == "rolessta.view")
  }
  get canViewCategory() {
    return this.array.some(e => e.Value == "categorysta.view")
  }
  get canViewSubCategory() {
    return this.array.some(e => e.Value == "subcategorysta.view")
  }
  get canViewSubChildCategory() {
    return this.array.some(e => e.Value == "subchildcategorysta.view")
  }

}
