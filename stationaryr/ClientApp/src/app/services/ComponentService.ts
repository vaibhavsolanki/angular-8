import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubCategory, UsersDgh,RoleViewModel, PrintRepository, contract,devicename,DGHUserRepository, Report, User, Units, Material, COMPANY, listofdropdown, StationaryRepository } from '../TableEntity/TableEntityClass';
import { ActivatedRoute  } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Headers': 'http://localhost:4200' })
};

@Injectable()
export class ComponentService {
// private actionUrl: string = "http://192.168.0.42/";
 private actionUrl: string = "https://localhost:44324/";
    //private actionUrl: string='http://localhost/POMS/oalp/getdata';
    constructor(private httpclient: HttpClient, private route: ActivatedRoute) { }
    //report

  get rolebyuser() {

    return localStorage.getItem('currentRole');

  }

//rolemaster
 public GetRoles(): Observable<RoleViewModel[]> {

    return this.httpclient.post<RoleViewModel[]>(this.actionUrl + "api/Role/GetRoles", null)

  }
  public Saverole(RoleViewModel: RoleViewModel): Observable<string> {

    return this.httpclient.post<string>(this.actionUrl + "api/Role/Saverole", RoleViewModel)

  }
  deleterole(id: number) {
    return this.httpclient.delete<string>(this.actionUrl + "api/Role/deleterole/" + id);
  }

  getRoleId(id: number): Observable<RoleViewModel[]> {
    let body = {
      'ID': id
    }
    return this.httpclient.get<RoleViewModel[]>(this.actionUrl + "api/Role/getRoleId/" + id);
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

    return this.httpclient.post<contract[]>(this.actionUrl + "api/Data/GetContractform", null)

  }
  public SaveContractform(contract: contract): Observable<string> {

    return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveContractform", contract)

  }
  deleteContractform(id: number) {
    return this.httpclient.delete<string>(this.actionUrl + "api/Data/deleteContractform/" + id);
  }

  getContractformId(id: number): Observable<contract[]> {
    let body = {
      'ID': id
    }
    return this.httpclient.get<contract[]>(this.actionUrl + "api/Data/getContractformId/" + id);
  }


  public UpdateContractform(contract: contract): Observable<string> {
    const firstParam: string = this.route.snapshot.queryParamMap.get('id')
    contract.ID = Number(firstParam);
    return this.httpclient.post<string>(this.actionUrl + "api/Data/UpdateContractform", contract)

  }


  //users
  public GetUsers(): Observable<UsersDgh[]> {

    return this.httpclient.post<UsersDgh[]>(this.actionUrl + "api/Data/GetUsers", null)

  }
  public SaveUsers(users: UsersDgh): Observable<string> {

    return this.httpclient.post<string>(this.actionUrl + "api/Data/SaveUsers", users)

  }
  deleteusers(id: number) {
    return this.httpclient.delete<string>(this.actionUrl + "api/Data/deleteusers/" + id);
  }

  getuserId(id: number): Observable<UsersDgh[]> {
    let body = {
      'ID': id
    }
    return this.httpclient.get<UsersDgh[]>(this.actionUrl + "api/Data/getuserId/" + id);
  }


  public Updateusers(users: UsersDgh): Observable<string> {
    const firstParam: string = this.route.snapshot.queryParamMap.get('id')
    users.ID = Number(firstParam);
    return this.httpclient.post<string>(this.actionUrl + "api/Data/Updateusers", users)

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
   

    // employee
    public dghemployee(status:string): Observable<User[]> {

      return this.httpclient.get<User[]>(this.actionUrl + "api/Data/dghemployee/"+status)

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

        return this.httpclient.get<SubCategory[]>(this.actionUrl + "api/Data/Getsubcategoryonchange/" + str)

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
}
