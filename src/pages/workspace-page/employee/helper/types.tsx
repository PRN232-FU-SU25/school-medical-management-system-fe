// Type for employee
export interface Role {
  name: string;
}

export interface Employee {
  fullName: string;
  email: string;
  phoneNumber: string;
  roleId: number;
  avatar?: string;
  identifyCard: string;
  gender: string;
  dateOfBirth: string;
}
export interface CreateEmployee extends Employee {
  username: string;
  password: string;
}
export interface UpdateEmployee extends Employee {
  username: string;
  status: string;
}
export interface EmployeeDTO extends Employee {
  id: number;
  roles: Role[];
  status: string;
}

export interface EmployeePagination {
  data: EmployeeDTO[];
  pagination: {
    pageCount: number;
  };
}
