import { Icons } from '@/components/ui/icons';

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  subTitle?: string;
  color?: string;
  subItems?: NavItem[];
  access?: string[];
}

export interface Notification {
  notificationID: number;
  notificationType: string;
  notificationContent: string;
  notificationDate: string;
  recipientID: number;
  contractID?: number;
  appendixID?: number;
  isRead: boolean;
}

export interface UserInfo {
  departmentId: number;
  departmentName: string;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender: string;
  status: string;
  identityCard: string;
  dateOfBirth: string;
  roles: string[];
}
