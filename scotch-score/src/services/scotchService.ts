import Scotch from "../types/scotch";
import { getJson } from "./apiService";

async function getScotches(
  name: string = "",
  pageIndex: number = 0,
  pageSize: number = 100
): Promise<Scotch[]> {
  return getJson(`scotches`, { name, pageIndex, pageSize });
}

async function getScotch(id: string): Promise<Scotch | undefined> {
  return getJson(`scotches/${id}`);
}

export { getScotches, getScotch };
