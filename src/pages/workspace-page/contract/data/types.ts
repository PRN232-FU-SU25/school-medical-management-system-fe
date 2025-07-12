export interface Contract {
  id: string;
  title: string;
  signedDate: string;
  effectiveDate: string;
  expirationDate: string;
  customerName: string;
  totalAmount: number;
  contractTypeName: string;
  keyContent: string;
  contractFile: string;
  contractDaysLeft: number;
  appendixDaysLeft: number;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

export interface ContractType {
  id: string;
  name: string;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

export interface ContractAppendix {
  id: string;
  title: string;
  signedDate: string;
  effectiveDate: string;
  expirationDate: string;
  content: string;
  fileName: string;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

export interface ContractDocument {
  id: string;
  name: string;
  description: string;
  fileName: string;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

export interface ContractService {
  id: string;
  name: string;
  description: string;
  totalPrice: number;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}

export interface ContractAuditTrail {
  id: string;
  name: string;
  category: string;
  action: string;
  storedData: any;
  createdBy: string;
  createdDate: string;
}
