import ScotchSearchParameters from '../types/scotchSearchParameters';
import ScotchSortColumn from '../types/scotchSortColumns';
import SortDirection from '../types/sortDirection';

function createScotchSearchParametersFromSearchParams(
  searchParams: URLSearchParams,
): ScotchSearchParameters {
  const name = searchParams.get('name');
  const pageIndex = searchParams.get('pageIndex');
  const pageSize = searchParams.get('pageSize');
  const sortBy = searchParams.get('sortBy');
  const sortDirection = searchParams.get('sortDirection');

  const scotchSearchParameters: ScotchSearchParameters = {};

  if (name) {
    scotchSearchParameters.name = name;
  }

  if (pageIndex) {
    scotchSearchParameters.pageIndex = Number(pageIndex);
  }

  if (pageSize) {
    scotchSearchParameters.pageSize = Number(pageSize);
  }

  if (sortBy) {
    scotchSearchParameters.sortBy = sortBy as ScotchSortColumn;
  }

  if (sortDirection) {
    scotchSearchParameters.sortDirection = sortDirection as SortDirection;
  }

  return scotchSearchParameters;
}

export default createScotchSearchParametersFromSearchParams;
