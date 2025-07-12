import { NavItem } from '@/types';

export var PagingModel = {
  pageNumber: 1,
  pageSize: 10,
  keyword: '',
  orderBy: '',
  orderDirection: '',
  totalRecord: 0,
  day: 0,
  week: 0,
  month: 0,
  year: 0,
  createdBy: ''
};

export var ContractGetListDTO = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
  orderDate: null,
  customerId: null,
  contractTypeId: null,
  expiredDayLeft: null,
  isExpired: false,
  signedDate: {},
  effectiveDate: {},
  expirationDate: {}
};

export var ContractAppendixGetListDTO = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
  orderDate: null,
  signedDate: {},
  effectiveDate: {},
  expirationDate: {},
  createdDate: {},
  modifiedDate: {}
};

export var ContractDocumentGetListDTO = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
  orderDate: null,
  createdDate: {},
  modifiedDate: {}
};

export var ContractServiceGetListDTO = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
  orderDate: null,
  createdDate: {},
  modifiedDate: {},
  unitPrice: {},
  tax: {},
  totalPrice: {}
};

export var HistoryGetListDTO = {
  pageIndex: 1,
  pageSize: 10,
  keyword: null,
  createdDate: {}
};

export const footerMenuItems: NavItem[] = [
  {
    title: 'Chính sách bảo mật',
    href: '/privacy'
  },
  {
    title: 'Điều khoản sử dụng',
    href: '/terms'
  }
];

export const sidebarNavItems: NavItem[] = [
  {
    title: 'Tổng quan',
    href: '/',
    icon: 'layoutGrid',
    access: ['Admin', 'Manager', 'Employee']
  },
  {
    title: 'Hợp đồng',
    href: '/contract',
    icon: 'receiptText',
    access: ['Admin', 'Manager', 'Employee'],
    subItems: [
      {
        title: 'Tạo hợp đồng',
        href: '/contract/new',
        icon: 'circlePlus',
        access: ['Admin', 'Manager', 'Employee']
      },
      {
        title: 'Danh sách hợp đồng',
        href: '/contract/all',
        icon: 'receiptText',
        access: ['Admin', 'Manager', 'Employee']
      },
      {
        title: 'Hợp đồng gần hết hạn',
        href: '/contract/all-almost-expired',
        icon: 'shieldAlert',
        access: ['Admin', 'Manager', 'Employee']
      },
      {
        title: 'Hợp đồng hết hạn',
        href: '/contract/all-expired',
        icon: 'shieldX',
        access: ['Admin', 'Manager', 'Employee']
      }
    ]
  },
  {
    title: 'Các loại hợp đồng',
    href: '/contract/type',
    icon: 'fileType',
    access: ['Admin']
  },
  {
    title: 'Khách hàng',
    href: '/customer',
    icon: 'user',
    access: ['Admin', 'Manager']
  },
  {
    title: 'Nhân viên',
    href: '/employee',
    icon: 'user',
    access: ['Admin', 'Manager']
  },
  {
    title: 'Phòng ban',
    href: '/department',
    icon: 'laptop',
    access: ['Admin']
  },
  {
    title: 'Báo cáo',
    href: '/report',
    icon: 'chartColumn',
    access: ['Admin', 'Manager', 'Employee']
  }
  // {
  //   title: 'Cài đặt',
  //   href: '/setting',
  //   icon: 'settings'
  // },
  // {
  //   title: 'Hỗ trợ',
  //   href: '/help',
  //   icon: 'circleHelp'
  // }
];

export const buttonList: any[] = [
  {
    title: 'Tạo hợp đồng',
    href: '/contract/new',
    access: ['Admin', 'Manager', 'Employee']
  },
  {
    title: 'Danh sách hợp đồng',
    href: '/contract/all',
    access: ['Admin', 'Manager', 'Employee']
  },
  {
    title: 'Hợp đồng gần hết hạn',
    href: '/contract/all-almost-expired',
    access: ['Admin', 'Manager', 'Employee']
  },
  {
    title: 'Hợp đồng hết hạn',
    href: '/contract/all-expired',
    access: ['Admin', 'Manager', 'Employee']
  },
  {
    title: 'Các loại hợp đồng',
    href: '/contract/type',
    access: ['Admin']
  },
  {
    title: 'Phòng ban',
    href: '/department',
    access: ['Admin']
  },
  {
    title: 'Nhân viên',
    href: '/employee',
    access: ['Admin', 'Manager']
  },
  {
    title: 'Khách hàng',
    href: '/customer',
    access: ['Admin', 'Manager']
  },
  {
    title: 'Báo cáo',
    href: '/report',
    access: ['Admin', 'Manager', 'Employee']
  }
];

export const userPopoverItems: NavItem[] = [
  {
    title: 'Hồ sơ',
    href: '/profile',
    icon: 'user'
  },
  // {
  //   title: 'Cài đặt',
  //   href: '/setting',
  //   icon: 'settings'
  // },
  // {
  //   title: 'Hỗ trợ',
  //   href: '/help',
  //   icon: 'circleHelp'
  // },
  {
    title: 'Đăng xuất',
    href: '/login',
    icon: 'logOut'
  }
];

export const headersContractExcel: Record<string, string> = {
  id: 'Số hợp đồng',
  title: 'Tên hợp đồng',
  keyContent: 'Nội dung',
  customerName: 'Khách hàng',
  contractTypeName: 'Loại hợp đồng',
  totalAmount: 'Giá trị hợp đồng',
  effectiveDate: 'Ngày hiệu lực',
  expirationDate: 'Ngày hết hạn',
  signedDate: 'Ngày ký'
};

export const headersEmployeeExcel: Record<string, string> = {
  id: 'Mã nhân viên',
  fullName: 'Tên nhân viên',
  email: 'Email liên hệ',
  phoneNumber: 'Số điện thoại',
  roles: 'Chức vụ'
};

export const headersCustomerExcel: Record<string, string> = {
  id: 'Mã khách hàng',
  companyName: 'Tên khách hàng'
};

export const genderInit = [
  {
    id: 0,
    value: 'None',
    valueDisplayed: 'Không'
  },
  {
    id: 1,
    value: 'Male',
    valueDisplayed: 'Nam'
  },
  {
    id: 2,
    value: 'Female',
    valueDisplayed: 'Nữ'
  },
  {
    id: 3,
    value: 'Other',
    valueDisplayed: 'Khác'
  }
];

export const historyActionMapping: { [key: string]: string } = {
  Create: 'Tạo mới',
  Update: 'Cập nhật',
  Assign: 'Phân công',
  AssignEmployee: 'Phân công'
};

export const historyCategoryMapping: { [key: string]: string } = {
  Contract: 'Hợp đồng',
  ContractDocument: 'Tài liệu đính kèm',
  Appendix: 'Phụ lục hợp đồng',
  ContractService: 'Dịch vụ'
};

export const notificationTypeMapping: { [key: string]: string } = {
  AppendixExpiration: 'Hết hạn hợp đồng',
  ContractExpiration: 'Hết hạn phụ lục hơp đồng'
};
