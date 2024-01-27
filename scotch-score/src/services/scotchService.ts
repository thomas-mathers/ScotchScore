import Scotch, { ScotchColumn } from '../types/scotch';
import SortDirection from '../types/sortDirection';
import { getJson } from './apiService';

async function getScotches(
  name: string = '',
  pageIndex: number = 0,
  pageSize: number = 100,
  sortBy: ScotchColumn = 'name',
  sortDirection: SortDirection = 'Ascending',
): Promise<Scotch[]> {
  return getJson(`scotches`, {
    name,
    pageIndex,
    pageSize,
    sortBy,
    sortDirection,
  });
}

async function getScotch(id: string): Promise<Scotch | undefined> {
  return getJson(`scotches/${id}`);
}

export { getScotches, getScotch };
