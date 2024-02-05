interface CreateReviewRequest {
  description: string;
  rating: number;
  title: string;
  userEmail: string;
  userName: string;
  userProfilePictureUrl: string;
}

export default CreateReviewRequest;
