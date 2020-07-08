
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../../services/authentication.service';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Permission } from '../../../../modal/permission.modal';
import { NavItem } from './nav-item'
import { NavService } from '../menu-list-item/nav.service';
@Component({
  selector: 'app-navit-menu',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavITMenuComponent implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  navItems: NavItem[] = [
    {
      displayName: 'Master Updation',
      iconName: 'master',
      heading:'heading',
    },
    {
      displayName: 'Vendor Master',
      iconName: '',
      route: 'IT/GetVendor',
      
    },
    {
      displayName: 'Contract Master',
      iconName: '',
      route: 'IT/GetContractMaster',

    },
    {
      displayName: 'Item Master',
      iconName: '',
      heading: 'div',
      children: [
        {
          displayName: 'Item Type',
          iconName: '',
          route: 'IT/GetCategory',
        },
        {
          displayName: 'Item Sub Type',
          iconName: '',
          route: 'IT/GetSubCategory',
        },
        {
          displayName: 'Item Subchild Type',
          iconName: '',
          route: 'IT/GetSubChildCategory',
         
        },
            
       
      ]
    },
    {
      displayName: 'Device',
      iconName: '',
      route: 'IT/GetDevice',

    },
    {
      displayName: 'Order Management',
      iconName: '',
      heading: 'heading',
    },
   
    {
      displayName: 'Placement of Order Of Items',
      iconName: '',
      route: 'IT/GetPublishContract',

    },
    {
      displayName: 'Receipt of items',
      iconName: '',
      route: 'IT/GetItemReceipt',

    },
    {
      displayName: 'Issue of Items',
      iconName: '',
      route: 'IT/GetRequestItems',

    },
    {
      displayName: 'User Rights',
      iconName: '',
      heading: 'heading',
    },
    {
      displayName: 'User Management',
      iconName: '',
      route: 'IT/GetUsers',

    },
    {
      displayName: 'Role Management',
      iconName: '',
      route: 'IT/GetRolemaster',

    },
    {
      displayName: 'Reports',
      iconName: 'report',
      heading: 'heading',
    },
    {
      displayName: 'Inventory Position',
      iconName: 'store',
      route: 'IT/InventoryPosition',

    },
    {
      displayName: 'Order Details',
      iconName: '',
      route: 'IT/OrderDetails',

    },
    {
      displayName: 'Receipt Details',
      iconName: '',
      route: 'IT/ReceiptDetails',

    },
    {
      displayName: 'Issue Details',
      iconName: '',
      route: 'IT/IssueDetails',

    },
    {
      displayName: 'Return Of Item By User',
      iconName: '',
      route: 'IT/Return_By_User',

    },
    {
      displayName: 'Search',
      iconName: 'search',
      heading: 'heading',

    },
    {
      displayName: 'Employee wise',
      iconName: '',
      route: '',

    },
    {
      displayName: 'Item wise',
      iconName: '',
      route: '',

    },
    {
      displayName: 'Date wise',
      iconName: '',
      route: '',

    },
  ];
 
  array: any[] = [];
  UserName: string;

  opened=true;
  ngOnInit() {
    this.UserName = JSON.parse(localStorage.getItem('currentUser').toLowerCase());
    this.usermenu();
    this.usermenuview();
    this.opened = true;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(public navService: NavService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authenticationService: AuthenticationService, private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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
     // var obj1 = ob[0].substring(0, ob[0].length - 1)

      var obj = JSON.parse(ob);



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
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
