interface Page<T> {
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  records: T[];
}

export default Page;
