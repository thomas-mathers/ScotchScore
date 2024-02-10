import ScotchSortColumn from './scotchSortColumns';
import SortDirection from './sortDirection';

interface ScotchSearchParameters {
  name?: string;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: ScotchSortColumn;
  sortDirection?: SortDirection;
}

export default ScotchSearchParameters;
