// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

export type PermissionNames =
  'View Users' | 'Manage Users' |
  'View Roles' | 'Manage Roles' | 'Assign Roles'|
   'View Category' | 'Manage Category' |
'View SubCategory' | 'Manage SubCategory'|
'View SubChildCategory' | 'Manage SubChildCategory' ;

export type PermissionValues =
  'users.view' | 'users.manage' |
  'roles.view' | 'roles.manage' | 'roles.assign'|
'category.view' | 'category.manage' |
  'subcategory.view' | 'subcategory.manage' |
  'subchildcategory.view' | 'subchildcategory.manage' |

'usersit.view' | 'usersit.manage' |
  'rolesit.view' | 'rolesit.manage' | 'rolesit.assign' |
  'categoryit.view' | 'categoryit.manage' |
  'subcategoryit.view' | 'subcategoryit.manage' |
  'subchildcategoryit.view' | 'subchildcategoryit.manage' 

  ;

export class Permission {

  public static readonly viewUsersPermission: PermissionValues = 'users.view';
  public static readonly manageUsersPermission: PermissionValues = 'users.manage';

  public static readonly viewRolesPermission: PermissionValues = 'roles.view';
  public static readonly manageRolesPermission: PermissionValues = 'roles.manage';
  public static readonly assignRolesPermission: PermissionValues = 'roles.assign';

  public static readonly viewCatogoryPermission: PermissionValues = 'category.view';
  public static readonly manageCategoryPermission: PermissionValues = 'category.manage';

  public static readonly viewSubCatogoryPermission: PermissionValues = 'subcategory.view';
  public static readonly manageSubCategoryPermission: PermissionValues = 'subcategory.manage';
  public static readonly viewSubChildCatogoryPermission: PermissionValues = 'subchildcategory.view';
  public static readonly manageSubChildCategoryPermission: PermissionValues = 'subchildcategory.manage';

  //
  public static readonly viewUsersItPermission: PermissionValues = 'usersit.view';
  public static readonly manageUsersItPermission: PermissionValues = 'usersit.manage';

  public static readonly viewRolesItPermission: PermissionValues = 'rolesit.view';
  public static readonly manageRolesItPermission: PermissionValues = 'rolesit.manage';
  public static readonly assignRolesItPermission: PermissionValues = 'rolesit.assign';

  public static readonly viewCatogoryItPermission: PermissionValues = 'categoryit.view';
  public static readonly manageCategoryItPermission: PermissionValues = 'categoryit.manage';

  public static readonly viewSubCatogoryItPermission: PermissionValues = 'subcategoryit.view';
  public static readonly manageSubCategoryItPermission: PermissionValues = 'subcategoryit.manage';
  public static readonly viewSubChildCatogoryItPermission: PermissionValues = 'subchildcategoryit.view';
  public static readonly manageSubChildCategoryItPermission: PermissionValues = 'subchildcategoryit.manage';

  constructor(AplicationType?: string, Name?: PermissionNames, Value?: PermissionValues, GroupName?: string, Description?: string) {
    this.AplicationType = AplicationType;
    this.Name = Name;
    this.Value = Value;
    this.GroupName = GroupName;
    this.Description = Description;
  }

  public Name: PermissionNames;
  public Value: PermissionValues;
  public GroupName: string;
  public AplicationType: string;
  public Description: string;
}
