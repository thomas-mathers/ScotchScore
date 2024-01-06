import Review from "../types/review";
import { getJson } from "./apiService";

async function getReviews(
  scotchId: string,
  pageIndex: number = 0,
  pageSize: number = 100
): Promise<Review[]> {
  return getJson(`scotches/${scotchId}/reviews`, { pageIndex, pageSize });
}

export { getReviews };
