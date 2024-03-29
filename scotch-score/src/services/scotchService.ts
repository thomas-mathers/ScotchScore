import Page from '../types/page';
import Scotch from '../types/scotch';
import ScotchSearchParameters from '../types/scotchSearchParameters';
import { getJson } from './apiService';

async function getScotches(
  searchParameters: ScotchSearchParameters,
): Promise<Page<Scotch>> {
  return getJson(`scotches`, searchParameters);
}

async function getScotch(id: string): Promise<Scotch | undefined> {
  return getJson(`scotches/${id}`);
}

export { getScotch, getScotches };
