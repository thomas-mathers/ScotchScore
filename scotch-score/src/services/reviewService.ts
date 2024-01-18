import CreateReviewRequest from "../types/createReviewRequest";
import Review from "../types/review";
import { getJson, postJson } from "./apiService";

async function getReviews(
  scotchId: string,
  pageIndex: number = 0,
  pageSize: number = 100
): Promise<Review[]> {
  return getJson(`scotches/${scotchId}/reviews`, { pageIndex, pageSize });
}

async function postReview(
  scotchId: string,
  createReviewRequest: CreateReviewRequest
): Promise<Review> {
  return postJson(`scotches/${scotchId}/reviews`, createReviewRequest);
}

export { getReviews, postReview };
