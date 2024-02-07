import { ScotchColumn } from './scotch';
import SortDirection from './sortDirection';

interface ScotchSearchParameters {
  name?: string;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: ScotchColumn;
  sortDirection?: SortDirection;
}

export default ScotchSearchParameters;
