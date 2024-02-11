import { SortDirection } from '@mui/material';
import ReviewSortColumn from './reviewSortColumn';

interface ReviewSearchParameters {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: ReviewSortColumn;
  sortDirection?: SortDirection;
  title?: string;
  userId?: string;
}

export default ReviewSearchParameters;
