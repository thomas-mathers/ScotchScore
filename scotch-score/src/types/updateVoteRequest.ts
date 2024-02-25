import ReviewVoteType from './reviewVoteType';

interface UpdateVoteRequest {
  reviewId: string;
  voteId: string;
  voteType: ReviewVoteType;
  accessToken: string;
}

export default UpdateVoteRequest;
