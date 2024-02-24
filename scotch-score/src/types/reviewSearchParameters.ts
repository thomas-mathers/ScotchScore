import ReviewSortColumn from './reviewSortColumn';
import SortDirection from './sortDirection';

interface ReviewSearchParameters {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: ReviewSortColumn;
  sortDirection?: SortDirection;
  title?: string;
  userId?: string;
}

export default ReviewSearchParameters;
