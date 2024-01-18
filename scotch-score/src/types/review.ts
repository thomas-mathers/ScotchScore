interface Review {
  id?: string;
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
}

export default Review;
