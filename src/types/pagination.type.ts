export interface PaginationModel<T> {
  data: {
    items: T[];
    totalPages: number;
    totalCount: number;
    currentPage: number;
    pageSize: number;
  };
}
