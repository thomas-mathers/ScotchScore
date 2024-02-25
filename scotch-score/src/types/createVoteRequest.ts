import ReviewVoteType from './reviewVoteType';

interface CreateVoteRequest {
  reviewId: string;
  voteType: ReviewVoteType;
  accessToken: string;
}

export default CreateVoteRequest;
