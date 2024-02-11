import ReviewVote from './reviewVote';

interface Review {
  id: string;
  scotchId: string;
  title: string;
  description: string;
  rating: number;
  userName: string;
  userProfilePictureUrl: string;
  userEmail: string;
  upvotes: number;
  downvotes: number;
  dateCreated: Date;
  userVote?: ReviewVote;
}

export default Review;
