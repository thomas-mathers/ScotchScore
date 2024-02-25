interface CreateReviewRequest {
  scotchId: string;
  description: string;
  rating: number;
  title: string;
  userEmail: string;
  userName: string;
  userProfilePictureUrl: string;
  accessToken: string;
}

export default CreateReviewRequest;
