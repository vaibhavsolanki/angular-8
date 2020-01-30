// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

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


  constructor(Name?: PermissionNames, Value?: PermissionValues, GroupName?: string, Description?: string) {
    this.Name = Name;
    this.Value = Value;
    this.GroupName = GroupName;
    this.Description = Description;
  }

  public Name: PermissionNames;
  public Value: PermissionValues;
  public GroupName: string;
  public Description: string;
}
