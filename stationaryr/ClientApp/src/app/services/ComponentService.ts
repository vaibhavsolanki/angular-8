import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubCategory, UsersDgh, itissueitems, itreleaseorder, itvendor, ititems, itemreceipt, PrintRepository, contract,devicename,DGHUserRepository, Report, Units, Material, COMPANY, listofdropdown, StationaryRepository, Department, AdminIssue } from '../TableEntity/TableEntityClass';
import { ActivatedRoute } from '@angular/router';
import { UserEdit } from '../modal/edit-user.modal';
import { Role } from '../modal/role.modal';
import { Permission, PermissionValues } from '../modal/permission.modal';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Headers': 'http://localhost:4200' })
};

@Injectable()
export class ComponentService {
//private actionUrl = "http://192.168.0.42/stationary/";
  private actionUrl= "https://localhost:44324/";
    //private actionUrl: string='http://localhost/POMS/oalp/getdata';
    constructor(private httpclient: HttpClient, private route: ActivatedRoute) { }

  //itissueitem
  public GetItIssueItems(): Observable<itissueitems[]> {

    return this.httpclient.get<itissueitems[]>(this.actionUrl + "api/Data/GetItIssueItems")

  }
  public SaveItIssueItems(AdminIssue: AdminIssue): Observable<string> {
    console.log(AdminIssue);
    return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveItIssueItems", AdminIssue)

  }
  DeleteItIssueItems(id: string) {
    return this.httpclient.delete<string>(this.actionUrl + "api/Data/DeleteItIssueItems/" + id);
  }

  GetItIssueItemsById(id: string): Observable<AdminIssue[]> {
    let body = {
      'ID': id
    }
    return this.httpclient.get<AdminIssue[]>(this.actionUrl + "api/Data/GetItIssueItemsById/" + id);
  }

  UpdateIssueItems(AdminIssue: AdminIssue): Observable<string> {

    const firstParam: string = this.route.snapshot.queryParamMap.get('id')
    AdminIssue.ID = firstParam;

    return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdateIssueItems", itissueitems)

  }


  //ITITEMRECEIPT

  public GetItItemReceipt(): Observable<itemreceipt[]> {

    return this.httpclient.get<itemreceipt[]>(this.actionUrl + "api/Data/GetItItemReceipt")

  }
  public SaveItItemReceipt(itemreceipt: itemreceipt, item: ititems[]): Observable<string> {
    itemreceipt.ORDERITEM = item;
    console.log(itemreceipt.ORDERITEM);
    return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveItItemReceipt", itemreceipt)

  }
  DeleteItItemReceipt(id: number) {
    return this.httpclient.delete<string>(this.actionUrl + "api/Data/DeleteItItemReceipt/" + id);
  }

  GetItItemReceiptById(id: number): Observable<itemreceipt[]> {
    let body = {
      'ID': id
    }
    return this.httpclient.get<itemreceipt[]>(this.actionUrl + "api/Data/GetItItemReceiptById/" + id);
  }

  UpdateItemReceipt(itemreceipt: itemreceipt): Observable<string> {

    const firstParam: string = this.route.snapshot.queryParamMap.get('id')
    itemreceipt.PUBLISHORDER = firstParam;

    return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdateItemReceipt", itemreceipt)

  }

  //itvendor
  public GetItVendor(): Observable<itvendor[]> {

    return this.httpclient.get<itvendor[]>(this.actionUrl + "api/Data/GetItVendor")

  }
  public SaveItVendor(itvendor: itvendor): Observable<string> {
    itvendor.APPTYPE = 'IT';
    return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveItVendor", itvendor)

  }
  DeleteItVendor(id: number) {
    return this.httpclient.delete<string>(this.actionUrl + "api/Data/DeleteItVendor/" + id);
  }

  GetItVendorById(id: number): Observable<itvendor[]> {
    let body = {
      'ID': id
    }
    return this.httpclient.get<itvendor[]>(this.actionUrl + "api/Data/GetItVendorById/" + id);
  }

  UpdateItVendor(itvendor: itvendor): Observable<string> {

    const firstParam: string = this.route.snapshot.queryParamMap.get('id')
    itvendor.ID = Number(firstParam);
    itvendor.APPTYPE = 'IT';
    return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdateItVendor", itvendor)

  }






  //itrelease order
  getreleaseorder(): Observable<itreleaseorder[]> {
    return this.httpclient.get<itreleaseorder[]>(this.actionUrl + "api/Data/getreleaseorder")

  }
  getreleaseorderbyid(id: number): Observable<itreleaseorder[]> {

    return this.httpclient.get<itreleaseorder[]>(this.actionUrl + "api/Data/getreleaseorderbyid/" + id)

  }
  savereleaseorder(order: itreleaseorder): Observable<string> {
    return this.httpclient.post<string>(this.actionUrl + "api/Data/savereleaseorder", order)

  }

  deletereleaseorder(id: number) {
    return this.httpclient.delete<string>(this.actionUrl + "api/Data/deletereleaseorder/" + id);

  }
  //report

  get rolebyuser() {

    return localStorage.getItem('currentRole');

  }
  //permission

  //getUserPreferences(): Observable<pe[]> {


  //}
 
  getpermission(): Observable<Permission[]> {
    return this.httpclient.get<Permission[]>(this.actionUrl + "api/Account/permissions")


  }
//rolemaster
  public GetRoles(): Observable<Role[]> {

    return this.httpclient.get<Role[]>(this.actionUrl + "api/Account/roles")

  }
  public Saverole(RoleViewModel: Role, permission: Permission[]): Observable<string> {
    RoleViewModel.Permissions = permission;
    console.log(RoleViewModel.Permissions);
    
    return this.httpclient.post<string>(this.actionUrl + "api/Account/roles", RoleViewModel)

  }
  deleterole(id: string) {
    return this.httpclient.delete<string>(this.actionUrl + "api/Account/roles/" + id);
  }

  getRoleId(id: string): Observable<Role> {
    let body = {
      'ID': id
    }
    return this.httpclient.get<Role>(this.actionUrl + "api/Account/roles/" + id);
  }
  GetRoleByName(name: string): Observable<Role> {
    let body = {
      'name': name
    }
    return this.httpclient.get<Role>(this.actionUrl + "api/Account/roles/name/" + name);
  }


  //public UpdateDevicename(contract: devicename): Observable<string> {
   // const firstParam: string = this.route.snapshot.queryParamMap.get('id')
    //contract.ID = Number(firstParam);
    //return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdateDevicename", contract)

  //}

  //device name
  public GetDevicename(): Observable<devicename[]> {

    return this.httpclient.post<devicename[]>(this.actionUrl + "api/Data/GetDevicename", null)

  }
  public SaveDevicename(contract: devicename): Observable<string> {

    return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveDevicename", contract)

  }
  deleteDevicename(id: number) {
    return this.httpclient.delete<string>(this.actionUrl + "api/Data/deleteDevicename/" + id);
  }

  getDevicenameId(id: number): Observable<devicename[]> {
    let body = {
      'ID': id
    }
    return this.httpclient.get<devicename[]>(this.actionUrl + "api/Data/getDevicenameId/" + id);
  }


  public UpdateDevicename(contract: devicename): Observable<string> {
    const firstParam: string = this.route.snapshot.queryParamMap.get('id')
    contract.ID = Number(firstParam);
    return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdateDevicename", contract)

  }

  //contractform
  public GetContractform(): Observable<contract[]> {

    return this.httpclient.get<contract[]>(this.actionUrl + "api/Data/GetContractform")

  }
  public SaveContractform(contract: contract): Observable<string> {

    return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveContractform", contract)

  }
  deleteContractform(id: string) {
    return this.httpclient.delete<string>(this.actionUrl + "api/Data/deleteContractform/" + id);
  }

  getContractformId(id: string): Observable<contract[]> {
    let body = {
      'ID': id
    }
    return this.httpclient.get<contract[]>(this.actionUrl + "api/Data/getContractformId/" + id);
  }


  public UpdateContractform(contract: contract): Observable<string> {
    const firstParam: string = this.route.snapshot.queryParamMap.get('id')
    contract.CONTRACTID = firstParam;
    return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdateContractform", contract)

  }


  //users
  public GetUsers(): Observable<UserEdit[]> {

    return this.httpclient.get<UserEdit[]>(this.actionUrl + "api/Account/users")

  }
  public SaveUsers(users: UserEdit): Observable<string> {
    console.log(users);   
    return this.httpclient.post<string>(this.actionUrl + "api/Account/Register", users)//, users

  }
  deleteusers(id: string) {
    return this.httpclient.delete<string>(this.actionUrl + "api/Account/users/" + id);
  }

  getuserId(id: string): Observable<UserEdit> {
    let body = {
      'ID': id
    }
    return this.httpclient.get<UserEdit>(this.actionUrl + "api/Account/getuserId/" + id);
  }
  //public Updateusers1(users: UserEdit): Observable<string> {
  //  console.log('narang ');
  //  console.log(users);
  //  console.log('gagan');
    
  //  var Id = users.Id;
  //  return this.httpclient.get<string>(this.actionUrl + "api/Data/getuserId/"+Id)//, users

  //}

  public Updateusers(users: UserEdit): Observable<string> {
    //const firstParam: string = this.route.snapshot.queryParamMap.get('id')
    //users.Id = firstParam;
    console.log(users);
    return this.httpclient.post<string>(this.actionUrl + "api/Account/Updateusers", users)

  }


    public GetStock(Category: string, SubCategory: string, SubChildCategory: string): Observable<number> {
        let body = {
            'Category': Category,
            'SubCategory': SubCategory,
            'SubChildCategory': SubChildCategory
        }
        return this.httpclient.post<number>(this.actionUrl + "api/Data/GetStock", body)
    }

  public Deletereceiveditem(id:number): Observable<string> {

    return this.httpclient.delete<string>(this.actionUrl + "api/Data/Deletereceiveditem/"+id)

  }

    public dghreport(Report: Report): Observable<Report[]> {
       
        return this.httpclient.post<Report[]>(this.actionUrl + "api/Data/dghreport", Report)

    }
  //department
  public department(): Observable<Department[]> {

    return this.httpclient.get<Department[]>(this.actionUrl + "api/Data/department/")

  }

    // employee
  public dghemployee(status: string): Observable<UserEdit[]> {

    return this.httpclient.get<UserEdit[]>(this.actionUrl + "api/Data/dghemployee/"+status)

    }

    //dghuser
    public SaveDghuser_Repository(DGHUserRepository: DGHUserRepository): Observable<string> {

        return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveDghuser_Repository", DGHUserRepository)

    }

    deleteDghuser_Repository(id: number) {

        return this.httpclient.delete<string>(this.actionUrl + "api/Data/deleteDghuser_Repository/" + id);
    }

    getDGHuser_RepositoryId(id: number): Observable<DGHUserRepository[]> {
        let body = {
            'ID': id
        }
        return this.httpclient.get<DGHUserRepository[]>(this.actionUrl + "api/Data/getDGHuser_RepositoryId/" + id);
    }


    public UpdateDghuser_Repository(DGHUserRepository: DGHUserRepository): Observable<string> {
        const firstParam: string = this.route.snapshot.queryParamMap.get('id')
        DGHUserRepository.ID = Number(firstParam);
        return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdateDghuser_Repository", DGHUserRepository)

    }
    public GetDGHuser_Repository(): Observable<DGHUserRepository[]> {

        return this.httpclient.post<DGHUserRepository[]>(this.actionUrl + "api/Data/GetDGHuser_Repository", null)

    }
    //print Repository
 
    public SavePrint_Repository(PrintRepository: PrintRepository): Observable<string> {

        return this.httpclient.post<string>(this.actionUrl + "api/Data/SavePrint_Repository", PrintRepository)

    }

    deletePrint_Repository(id: number) {

        return this.httpclient.delete<string>(this.actionUrl + "api/Data/deletePrint_Repository/" + id);
    }

    getPrint_RepositoryId(id: number): Observable<PrintRepository[]> {
        let body = {
            'ID': id
        }
        return this.httpclient.get<PrintRepository[]>(this.actionUrl + "api/Data/getPrint_RepositoryId/" + id);
    }


    public UpdatePrint_Repository(PrintRepository: PrintRepository): Observable<string> {
        const firstParam: string = this.route.snapshot.queryParamMap.get('id')
        PrintRepository.ID = Number(firstParam);
        return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdatePrint_Repository", PrintRepository)

    }
    public GetPrint_Repository(): Observable<PrintRepository[]> {

        return this.httpclient.post<PrintRepository[]>(this.actionUrl + "api/Data/GetPrint_Repository", null)

    }
    //stationary Repository
    public SaveStationary_Repository(StationaryRepository: StationaryRepository): Observable<string> {
       
        return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveStationary_Repository", StationaryRepository)

    }

    deleteStationary_Repository(id: number) {

        return this.httpclient.delete<string>(this.actionUrl + "api/Data/deleteStationary_Repository/" + id);
    }

    getStationary_RepositoryId(id: number): Observable<StationaryRepository[]> {
        let body = {
            'ID': id
        }
        return this.httpclient.get<StationaryRepository[]>(this.actionUrl + "api/Data/getStationary_RepositoryId/" + id);
    }


    public UpdateStationary_Repository(StationaryRepository: StationaryRepository): Observable<string> {
        const firstParam: string = this.route.snapshot.queryParamMap.get('id')
        StationaryRepository.ID = Number(firstParam);
        return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdateStationary_Repository", StationaryRepository)

    }
    public GetStationary_Repository(): Observable<StationaryRepository[]> {

        return this.httpclient.post<StationaryRepository[]>(this.actionUrl + "api/Data/GetStationary_Repository", null)

    }
    //material
     public GetMaterial(status:string): Observable<Material[]> {
       
       return this.httpclient.get<Material[]>(this.actionUrl + "api/Data/GetMaterial/" + status)

    }
    public GetMaterialforstaOrprint(str: string): Observable<listofdropdown[]> {
      
        return this.httpclient.get<listofdropdown[]>(this.actionUrl + "api/Data/GetMaterialforstaOrprint/" + str)

    }
    public Getsubcategoryonchange(str: string): Observable<SubCategory[]> {

      return this.httpclient.get<SubCategory[]>(this.actionUrl + "api/Data/Getsubcategoryonchange/" + str);

    }
    
  public SaveMaterial(Material: Material, getstatus: string): Observable<string> {
    Material.APPTYPE = getstatus;
        return this.httpclient.post<string>(this.actionUrl + "api/Data/MaterialSave", Material)

    }
    deletematerial(id: number) {
       
        return this.httpclient.delete<string>(this.actionUrl + "api/Data/deleteMaterial/" + id);
    }

    getmaterialId(id: number): Observable<Material[]> {
        let body = {
            'ID': id
        }
        return this.httpclient.get<Material[]>(this.actionUrl + "api/Data/GetmaterialID/" + id);
    }

    
    public UpdateMaterial(Material: Material): Observable<string> {
        const firstParam: string = this.route.snapshot.queryParamMap.get('id')
        Material.ID = Number(firstParam);
        return this.httpclient.post<string>(this.actionUrl + "api/Data/MaterialUpdate", Material)

    }
    //Company
    public GetCompany(): Observable<COMPANY[]> {

        return this.httpclient.post<COMPANY[]>(this.actionUrl + "api/Data/GetCompany", null)

    }
    public SaveCompany(company: COMPANY): Observable<string> {

        return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveCompany", company)

    }
    deletecompany(id: number) {
        return this.httpclient.delete<string>(this.actionUrl + "api/Data/deletecompany/" + id);
    }

    getcompanyId(id: number): Observable<COMPANY[]> {
        let body = {
            'ID': id
        }
        return this.httpclient.get<COMPANY[]>(this.actionUrl + "api/Data/getcompanyId/" + id);
    }


    public Updatecompany(company: COMPANY): Observable<string> {
        const firstParam: string = this.route.snapshot.queryParamMap.get('id')
        company.ID = Number(firstParam);
        return this.httpclient.post<string>(this.actionUrl + "api/Data/Updatecompany", company)

    }

    //units
    public GetUnits(): Observable<Units[]> {

        return this.httpclient.post<Units[]>(this.actionUrl + "api/Data/GetUnits", null)

    }
    public SaveUnits(units: Units): Observable<string> {

        return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveUnits", units)

    }
    deleteunits(id: number) {
        return this.httpclient.delete<string>(this.actionUrl + "api/Data/deleteunits/" + id);
    }

    getunitsId(id: number): Observable<Units[]> {
        let body = {
            'ID': id
        }
        return this.httpclient.get<Units[]>(this.actionUrl + "api/Data/getunitsId/" + id);
    }


    public Updateunits(units: Units): Observable<string> {
        const firstParam: string = this.route.snapshot.queryParamMap.get('id')
        units.ID = Number(firstParam);
        return this.httpclient.post<string>(this.actionUrl + "api/Data/Updateunits", units)

    }

    //subcategory
    public GetCategoryDropdown(id:string,status:string): Observable<SubCategory[]> {

        return this.httpclient.get<SubCategory[]>(this.actionUrl + "api/Data/GetCategoryDropdown/"+id+"/"+status)

    }
  
    public GetSubcategory(id: string,status:string): Observable<SubCategory[]> {
       
        //let body = {
        //    'str': str
        //}
      return this.httpclient.get<SubCategory[]>(this.actionUrl + "api/Data/GetSubcategory/" + id + "/" + status)

    }
  public SaveSubcategory(Subcategory: SubCategory, status: string): Observable<string> {
    Subcategory.CATEGORYTYPE = status;

        return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveSubcategory", Subcategory)

    }
    deleteSubcategory(id: number) {
        return this.httpclient.delete<string>(this.actionUrl + "api/Data/deleteSubcategory/" + id);
    }

    getSubcategoryId(id: number): Observable<SubCategory[]> {
        let body = {
            'ID': id
        }
        return this.httpclient.get<SubCategory[]>(this.actionUrl + "api/Data/getSubcategoryId/" + id);
    }


    public UpdateSubcategory(Subcategory: SubCategory): Observable<string> {
        const firstParam: string = this.route.snapshot.queryParamMap.get('id')
        Subcategory.ID = Number(firstParam);
        return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdateSubcategory", Subcategory)

  }
  //Report
  public GetCategoryPostion(str: string): Observable<Material[]> {

    return this.httpclient.get<Material[]>(this.actionUrl + "api/Data/GetCategoryPostion/" + str)

  }
  public GetSubCategoryPostion(str: string,category:string): Observable<SubCategory[]> {

    return this.httpclient.get<SubCategory[]>(this.actionUrl + "api/Data/GetSubCategoryPostion/byName?str=" + str + "&category=" + category)

  }
}
