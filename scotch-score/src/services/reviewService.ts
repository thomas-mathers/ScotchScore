import CreateReviewRequest from '../types/createReviewRequest';
import CreateVoteRequest from '../types/createVoteRequest';
import DeleteVoteRequest from '../types/deleteVoteRequest';
import GetReviewsRequest from '../types/getReviewsRequest';
import GetUserReviewRequest from '../types/getUserReviewRequest';
import Page from '../types/page';
import Review from '../types/review';
import UpdateVoteRequest from '../types/updateVoteRequest';
import { deleteJson, getJson, postJson, putJson } from './apiService';

async function getReviews(request: GetReviewsRequest): Promise<Page<Review>> {
  return getJson(
    `scotches/${request.scotchId}/reviews`,
    request.searchParameters,
    {
      Authorization: `Bearer ${request.accessToken}`,
    },
  );
}

async function getUserReview(
  request: GetUserReviewRequest,
): Promise<Review | undefined> {
  const { userId, accessToken, scotchId } = request;
  const reviews = await getJson<Page<Review>>(
    `scotches/${scotchId}/reviews`,
    {
      userId,
    },
    {
      Authorization: `Bearer ${accessToken}`,
    },
  );
  return reviews.records.length > 0 ? reviews.records[0] : undefined;
}

async function postReview(request: CreateReviewRequest): Promise<Review> {
  const { accessToken, scotchId, ...body } = request;
  return postJson(
    `scotches/${scotchId}/reviews`,
    body,
    {},
    {
      Authorization: `Bearer ${accessToken}`,
    },
  );
}

async function createVote(request: CreateVoteRequest): Promise<Review> {
  const { reviewId, voteType, accessToken } = request;
  return postJson(
    `reviews/${reviewId}/votes`,
    { voteType },
    {},
    { Authorization: `Bearer ${accessToken}` },
  );
}

async function updateVote(request: UpdateVoteRequest): Promise<Review> {
  const { reviewId, voteId, accessToken } = request;
  return putJson(
    `reviews/${reviewId}/votes/${voteId}`,
    { voteType: request.voteType },
    {},
    { Authorization: `Bearer ${accessToken}` },
  );
}

async function deleteVote(request: DeleteVoteRequest): Promise<boolean> {
  const { reviewId, voteId, accessToken } = request;
  return deleteJson(
    `reviews/${reviewId}/votes/${voteId}`,
    {},
    { Authorization: `Bearer ${accessToken}` },
  );
}

export {
  createVote,
  deleteVote,
  getReviews,
  getUserReview,
  postReview,
  updateVote,
};
