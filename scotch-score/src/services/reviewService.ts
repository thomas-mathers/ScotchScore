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

async function upvoteReview(reviewId: string): Promise<Review> {
  return postJson(`reviews/${reviewId}/upvote`, {});
}

async function downvoteReview(reviewId: string): Promise<Review> {
  return postJson(`reviews/${reviewId}/downvote`, {});
}

export { getReviews, postReview, upvoteReview, downvoteReview };
