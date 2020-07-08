export interface NavItem {
  heading?: string;
  displayName: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  children?: NavItem[];
}
