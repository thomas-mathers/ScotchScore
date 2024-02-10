import CreateReviewRequest from '../types/createReviewRequest';
import CreateReviewVoteRequest from '../types/createReviewVoteRequest';
import Review from '../types/review';
import ReviewSearchParameters from '../types/reviewSearchParameters';
import { deleteJson, getJson, postJson } from './apiService';

async function getReviews(
  scotchId: string,
  searchParameters: ReviewSearchParameters,
  accessToken?: string,
): Promise<Review[]> {
  return getJson(`scotches/${scotchId}/reviews`, searchParameters, {
    Authorization: `Bearer ${accessToken}`,
  });
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

async function createVote(
  reviewId: string,
  createReviewVoteRequest: CreateReviewVoteRequest,
  accessToken: string,
): Promise<Review> {
  return postJson(
    `reviews/${reviewId}/votes`,
    createReviewVoteRequest,
    {},
    { Authorization: `Bearer ${accessToken}` },
  );
}

async function deleteVote(
  reviewId: string,
  reviewVoteId: string,
  accessToken: string,
): Promise<boolean> {
  return deleteJson(
    `reviews/${reviewId}/votes/${reviewVoteId}`,
    {},
    { Authorization: `Bearer ${accessToken}` },
  );
}

export { getReviews, postReview, createVote, deleteVote };
