export interface apptypepara {
  IS_PEL_PML: string;
  IS_ON_OFF: string;
  APP_TABS: string;
}

export interface StateTable {
  STATE_ID: number;
  STATE: string;
  COMBINE_STATE: string;
}
export interface RegimeTable {
  REGIME_ID: number;
  REGIME: string;
  SHORT_NAME: string;
  LONG_NAME: string;

}
export interface CompanyTable {
  ListItemKey: number;
  ListItemValue: string;
}
export interface Login {
  username: string;
  password: string;
  role: string;
  approle: string;
  token?: string;
}
export interface PML {
  DRAFT_ID: string;
  APPID: string;
  Name: string;
  Address: string;
  Type_of_company: string;
  State: string;
  Regime: string;
  APP_MODE: string;
  Block_Asset: string;
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
  APPROLE: string;
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
  QUANTITY: string;
  AVAQUANTITY: string;
  ORDERQUANTITY: string;
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
  CATEGORYTYPE: string;
}


export interface Material_QuantityCategory {
  Quantity: number;
  Category: string;
  Items_Description: string;
  Itemcode: string;
}


export interface Materail_QuantitySub {
  QuantityBySub: number;
  Category: string;
  Subcategory: string;
  Description: string;
  Items_Description: string;

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
export interface getstock {
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
  PASSWORD: string;
}

export interface dynamicdata {
  link: string;
}
export interface contract {
  ID: number;

  CONTRACTID: string;
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
  QUANTITY: string;
  RECEIVEDQUANTITY: string;
  CONTRACTID: string;
  CREATED_DATE: string;
  REMAINING: string;
  REMARKS: string;
}
export class devicename {
  ID: number;
  DEVICENAME: string;
  STATUS: string;
  CREATED_DATE: string;

}

export class itreleaseorder {

  ID: number;
  RELEASEORDERID: string;
  CONTRACTID: string;
  CONTRACTNO: string;
  STATUS: string;
  CREATED_DATE: Date;
  SUBJECT: string;
  BODY: string;
  SIGNATURE: string;
  RECEIVEDBY: string;
  RECEIVEDDATE: Date;
}

export class itvendor {

  ID: number;
  VENDORNAME: string;
  PHONENO: string;
  ADDRESS: string;
  STATUS: string;
  CREATED_DATE: Date;
  APPTYPE: string;

}

export class itemreceipt {
  ID: number;
  PUBLISHORDER: string;
  ORDERITEM: ititems[];
  CHALLANNO: string;
  CHALLANDATE: Date;
  RECEIPTDATE: Date;
  REMARKS: string;
}
export class AdminIssue {
  ID: string;
  UserName: number;
  ORDERITEM: ititems[];
  STATUS: string;
  ISSUEDATE; Date;
  CREATED_DATE: Date;

  REMARKS: string;

}
export class itissueitems {
  ID: number;
  ORDERITEM: ititems[];
  STATUS: string;
  CREATED_DATE: Date;
  USERID: string;
  REMARKS: string;
  ISSUEID: string;
}

