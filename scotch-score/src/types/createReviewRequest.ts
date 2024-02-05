interface CreateReviewRequest {
  title: string;
  description: string;
  rating: number;
  userEmail: string;
  userName: string;
  userProfilePictureUrl: string;
}

export default CreateReviewRequest;
