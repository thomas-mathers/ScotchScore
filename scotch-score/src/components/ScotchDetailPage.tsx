import { Box, Grid, Paper, Rating, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';
import RatingHistogram from './RatingHistogram';
import RatingSummary from './RatingSummary';
import ReviewListItem from './ReviewListItem';
import NewReviewDialog from './NewReviewDialog';
import { useEffect, useState } from 'react';
import { getScotch } from '../services/scotchService';
import { useQuery } from '@tanstack/react-query';
import { getReviews, getUserReview } from '../services/reviewService';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import useAccessToken from '../hooks/useAccessToken';
import ReviewSearchParameters from '../types/reviewSearchParameters';
import { useAuth0 } from '@auth0/auth0-react';

function ScotchDetailPage() {
  const { id } = useParams();

  const { isAuthenticated, user } = useAuth0();

  const { loading, accessToken } = useAccessToken();

  const [reviewSearchParameters] = useState<ReviewSearchParameters>({
    pageIndex: 0,
    pageSize: 20,
  });

  const scotch = useQuery({
    queryKey: ['scotches', id],
    queryFn: () => getScotch(id!),
    enabled: Boolean(id),
  });

  const reviews = useQuery({
    queryKey: ['reviews', id, reviewSearchParameters, accessToken],
    queryFn: () => getReviews(id!, reviewSearchParameters, accessToken),
    enabled: Boolean(id) && !loading,
  });

  const userReview = useQuery({
    queryKey: ['userReview', id, user?.sub, accessToken],
    queryFn: () => getUserReview(id!, user!.sub!, accessToken),
    enabled: Boolean(id) && !loading && isAuthenticated,
  });

  const [rating, setRating] = useState<number | null>(null);
  const [newReviewDialogOpen, setNewReviewDialogOpen] = useState(false);

  const items: ReactImageGalleryItem[] | undefined = scotch.data?.images.map(
    (src) => ({
      original: src,
      thumbnail: src,
    }),
  );

  useEffect(() => {
    if (userReview.data) {
      setRating(userReview.data.rating);
    }
  }, [userReview.data]);

  return (
    <Box>
      <h1>{scotch.data?.name}</h1>
      <Paper>
        <Box padding={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              {items && items.length > 0 && (
                <ImageGallery
                  items={items}
                  showPlayButton={false}
                  showBullets={true}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <p>{scotch.data?.description}</p>
            </Grid>
          </Grid>
          <h3>Ratings</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <RatingHistogram ratings={scotch.data?.ratingCounts ?? []} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <RatingSummary
                rating={scotch.data?.averageRating ?? 0}
                numberOfRatings={0}
                numberOfPositiveRecommendations={0}
                numberOfRecommendations={0}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <p>Review this product</p>
              <Tooltip title={isAuthenticated ? '' : 'Login to review'}>
                <span>
                  <Rating
                    disabled={!isAuthenticated}
                    readOnly={Boolean(rating)}
                    value={rating}
                    onChange={(_e, newRating) => setRating(newRating)}
                    onClick={() => setNewReviewDialogOpen(true)}
                  />
                </span>
              </Tooltip>
            </Grid>
          </Grid>
          <h3>Reviews</h3>
          {reviews.data?.map((review) => (
            <ReviewListItem key={review.id} review={review} />
          ))}
        </Box>
      </Paper>
      <NewReviewDialog
        open={newReviewDialogOpen}
        scotchId={id!}
        rating={rating!}
        onClose={() => setNewReviewDialogOpen(false)}
      />
    </Box>
  );
}

export default ScotchDetailPage;
