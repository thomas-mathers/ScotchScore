import ReviewVoteType from './reviewVoteType';

interface ReviewVote {
  dateCreated: Date;
  id: string;
  reviewId: string;
  reviewVoteType: ReviewVoteType;
  scotchId: string;
  userId: string;
}

export default ReviewVote;
