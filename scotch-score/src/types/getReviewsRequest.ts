import ReviewSearchParameters from './reviewSearchParameters';

interface GetReviewsRequest {
  scotchId: string;
  searchParameters: ReviewSearchParameters;
  accessToken?: string;
}

export default GetReviewsRequest;
