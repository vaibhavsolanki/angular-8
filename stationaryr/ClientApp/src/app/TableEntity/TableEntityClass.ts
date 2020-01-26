export interface apptypepara
{
	 IS_PEL_PML:string;
	 IS_ON_OFF:string;
	 APP_TABS:string;
}

	export interface StateTable
    {
          STATE_ID :number;
         STATE :string ;
         COMBINE_STATE :string ;
    }
 export interface RegimeTable
    {
          REGIME_ID:number;
          REGIME :string;
          SHORT_NAME :string;
          LONG_NAME :string;

    }
	export interface CompanyTable
    {
          ListItemKey:number;
          ListItemValue :string;
}
export interface Login {
    username: string;
  password: string;
  role: string;
  approle: string;
    token?: string;   
}
export interface PML {
    DRAFT_ID : string;
    APPID : string;
    Name : string;
    Address : string;
    Type_of_company: string;
    State: string;
    Regime : string;
    APP_MODE: string;
    Block_Asset : string;
    APP_TYPE: string;
    AFFIDAVIT: string;
    PERIOD_REQUIRED: string;
    BUSINESS_NATURE: string;                                       
}
export class User {
    ID: number;
    NAME: string;
    ADDRESS: string;
  CREATED_DATE: string;
  ROLE: string;
    DEPARTMENTS: Department[];
APPROLE:string;
}
export class Department {
    ID: string;
    NAME: string;
}
export interface Material {
    ID: number;
    ITEMS_DESCRIPTION: string;
    STATUS: string;
    CREATED_DATE: string;
    TYPE: string;
    ITEMCODE: string;
  APPTYPE: string;
}
export interface listofdropdown {
    Company: COMPANY[];
    Material: Material[];
    Unit: Units[];
}

export interface Units {
    ID: number;
    UNITS_DESCRIPTION: string;
    STATUS: string;
    CREATED_DATE: string;
    EMP_ID: string;
}

export interface SubCategory {
    ID: number;
    DESCRIPTION: string;
    STATUS: string;
    CREATED_DATE: string;
    PARENT_ID: string;
  CHILDITEMCODE: string;
  CATEGORYTYPE : string;
}

export interface COMPANY {
    ID: number;
    COMPANYCODE: string;
    COMPANYNAME: string;
    CREATED_DATE: string;
  
}

export interface StationaryRepository {
    ID: number;
    CATEGORY: string;
    COMPANY: string;
    ESTIMATED_QUANTITY: string;
    UNIT: string;
    BASIC_AMOUNT: string;
    GST: string;
    TOTAL_ITEM_ORDER: string;
    TOTAL_ITEM_RECEIVED: string;
    DATEOFRECEIVED: Date;
    DATEOFORDER: Date;
    SUBCATEGORY: string;
    SUBCHILDCATEGORY: string;
    TIMEOFORDER: string;
    TIMEOFRECEIVED: string;
  ORDERRECEIVED: orderreceived[];
   
}

export interface orderreceived {
  ID: number;
  TIMEOFRECEIVED: string;
  DATEOFRECEIVED: Date;
  TOTAL_ITEM_RECEIVED: string;
}
export interface PrintRepository {
    ID: number;
    CATEGORY: string;
    BRAND: string;
    ANNUAL_REQUIREMENT: string;
    UNIT: string;
    RATE: string;
    GST_RATE: string;
    GST_AMOUNT: string;
    TOTAL_ITEM_ORDER: string;
    TOTAL_ITEM_RECEIVED: string;
    DATEOFRECEIVED: Date;
    STATUS: string;
    CREATED_DATE: string;
    DATEOFORDER: Date;
    SUBCATEGORY: string;
    SUBCHILDCATEGORY: string;
    TIMEOFORDER: string;
  TIMEOFRECEIVED: string;
  ORDERRECEIVED: orderreceived[];

}

export interface DGHUserRepository {
    ID: number;
    CATEGORY: string;
   
    EMPLOYEE: string;
  EMPLOYEE_STATUS: string;
    DATE_OF_RECEIPT: Date;
    QUANTITY: string;
    DATE_OF_ISSUE: Date;
    ISSUER: string;
    REMARK: string;
    DEPT_ID: string;
    STATUS: string;
    CREATED_DATE: string;
    SUBCATEGORY: string;
    SUBCHILDCATEGORY: string;

}
export interface getstock
{
    CATEGORY: string;
    SUBCATEGORY: string;
    SUBCHILDCATEGORY: string;
}
export interface Report {
    ID: number;
    CATEGORY: string;
    EMPLOYEE: string;
    SUBCATEGORY: string;
    SUBCHILDCATEGORY: string;
  IN_STOCK: number;
  DATEOFISSUE: Date;
    DEPTID: string;
    CONSUME: number;
   YEARDATE: string;
    FROM_DATE?: Date;
    TO_DATE?: Date;
    Dghuser: DGHUserRepository[];
}
export interface UsersDgh {
  ID: number;
  USERNAME: string;
  EMAILID: string;
  PHONENO: string;
  STATUS: string;
  DEPTID: string;
  CREATED_DATE: string;
PASSWORD:string;
}

export interface dynamicdata {
  link: string;
}
export interface contract {
  ID: number;
  CONTRACTNO: string;
  VENDORNAME: string;
  STARTDATE: Date;
  ENDDATE: Date;
  STATUS: string;
  CREATED_DATE: string;
  ORDERITEM: ititems[];
}

export interface ititems {
  ID: number;
  CATEGORY: string;
  SUBCATEGORY: string;
  SUBCHILDCATEGORY: string;
  STATUS: string;
  CREATED_DATE: string;
}
export class devicename {
  ID: number;
  DEVICENAME: string;
  STATUS: string;
  CREATED_DATE: string;

}

export class RoleViewModel
{
 public Id: string;
    public Name: string;
    public Description: string;
    public UsersCount: number;
    public permissions: Permission[];
}

export type PermissionNames =
    'View Users' | 'Manage Users' |
    'View Roles' | 'Manage Roles' | 'Assign Roles';

export type PermissionValues =
    'users.view' | 'users.manage' |
    'roles.view' | 'roles.manage' | 'roles.assign';

export class Permission {

public static readonly viewUsersPermission: PermissionValues = 'users.view';
    public static readonly manageUsersPermission: PermissionValues = 'users.manage';

    public static readonly viewRolesPermission: PermissionValues = 'roles.view';
    public static readonly manageRolesPermission: PermissionValues = 'roles.manage';
    public static readonly assignRolesPermission: PermissionValues = 'roles.assign';

 public Name: PermissionNames;
    public Value: PermissionValues;
    public GroupName: string;
    public Description: string;
}
