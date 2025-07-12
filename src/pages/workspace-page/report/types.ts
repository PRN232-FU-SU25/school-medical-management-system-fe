export interface Contract {
  id: number;
  title: string;
  customerName: string;
  contractTypeName: string;
  totalAmount: number;
  effectiveDate: string;
  expirationDate: string;
  signedDate: string;
  keyContent: string;
}

export interface Range<T> {
  from: T;
  to: T;
}

export interface Filter {
  pageIndex: number;
  pageSize: number;
  title?: string;
  customerName?: string;
  contractTypeId?: number;
  priceRange?: Range<number | string>;
  signedDate?: Range<string>;
  effectiveDate?: Range<string>;
  expirationDate?: Range<string>;
  isExpired: boolean;
  appendixQuantity?: number | string;
}
