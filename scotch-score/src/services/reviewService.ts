import CreateReviewRequest from '../types/createReviewRequest';
import Review from '../types/review';
import { getJson, postJson } from './apiService';

async function getReviews(
  scotchId: string,
  pageIndex: number = 0,
  pageSize: number = 100,
): Promise<Review[]> {
  return getJson(`scotches/${scotchId}/reviews`, { pageIndex, pageSize });
}

async function postReview(
  scotchId: string,
  createReviewRequest: CreateReviewRequest,
  accessToken: string,
): Promise<Review> {
  return postJson(
    `scotches/${scotchId}/reviews`,
    createReviewRequest,
    {},
    {
      Authorization: `Bearer ${accessToken}`,
    },
  );
}

async function upvoteReview(
  reviewId: string,
  accessToken: string,
): Promise<Review> {
  return postJson(
    `reviews/${reviewId}/upvote`,
    {},
    { Authorization: `Bearer ${accessToken}` },
  );
}

async function downvoteReview(
  reviewId: string,
  accessToken: string,
): Promise<Review> {
  return postJson(
    `reviews/${reviewId}/downvote`,
    {},
    { Authorization: `Bearer ${accessToken}` },
  );
}

export { getReviews, postReview, upvoteReview, downvoteReview };
