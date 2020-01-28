export class User {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(id?: string, userName?: string, fullName?: string, email?: string, jobTitle?: string, phoneNumber?: string, roles?: string[]) {

        this.Id = id;
    this.UserName = userName;
        this.FullName = fullName;
        this.Email = email;
        this.JobTitle = jobTitle;
        this.PhoneNumber = phoneNumber;
        this.Roles = roles;
    }


    get friendlyName(): string {
      let name = this.FullName || this.UserName;

        if (this.JobTitle) {
            name = this.JobTitle + ' ' + name;
        }

        return name;
    }


    Id: string;
     UserName: string;
  public FullName: string;
  public Department: string;
    public Email: string;
    public JobTitle: string;
    public PhoneNumber: string;
    public IsEnabled: boolean;
    public IsLockedOut: boolean;
    public Roles: string[]=[];
}
