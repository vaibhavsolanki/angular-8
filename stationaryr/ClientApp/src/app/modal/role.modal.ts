
import { Permission } from './permission.modal';


export class Role {

  constructor(Name?: string, Description?: string, Permissions?: Permission[]) {

    this.Name = name;
    this.Description = Description;
    this.Permissions = Permissions;
  }

  public Id: string;
  public Name: string;
  public Description: string;
  public UsersCount: number;
  public Permissions: Permission[];
}
