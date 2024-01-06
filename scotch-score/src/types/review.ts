interface Review {
  id: string;
  scotchId: string;
  title: string;
  description: string;
  rating: number;
  userName: string;
  userProfilePictureUrl: string;
  upvotes: number;
  downvotes: number;
  dateCreated: Date;
}

export default Review;
