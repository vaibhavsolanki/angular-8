//import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../../services/authentication.service';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Permission } from '../../../../modal/permission.modal';
@Component({
  selector: 'app-navit-menu',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavITMenuComponent implements OnDestroy, OnInit {

  array: any[] = [];
  UserName: string;
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
    this.canViewDevice;
    this.canViewDevice;

  }

  get canViewUsers() {



    return this.array.some(e => e.Value == "usersit.view")


  }
  get canViewRoles() {
    return this.array.some(e => e.Value == "rolesit.view")
  }
  get canViewCategory() {
    return this.array.some(e => e.Value == "categoryit.view")
  }
  get canViewSubCategory() {
    return this.array.some(e => e.Value == "subcategoryit.view")
  }
  get canViewSubChildCategory() {
    return this.array.some(e => e.Value == "subchildcategoryit.view")
  }
  get canViewContract() {
    return this.array.some(e => e.Value == "contractit.view")
  }

  get canViewDevice() {
    return this.array.some(e => e.Value == "deviceit.view")
  }
  get canViewPublishContract() {
    return this.array.some(e => e.Value == "publishcontractit.view")
  }
  get canViewReceiptOfItems() {
    return this.array.some(e => e.Value == "receiptofitemsit.view")
  }

  get canViewVendor() {
    return this.array.some(e => e.Value == "vendorsit.view")
  }
  get canViewIssueItems() {
    return this.array.some(e => e.Value == "issueitemit.view")
  }
  get canViewRequestItems() {
    return this.array.some(e => e.Value == "requestitemit.view")
  }
}
