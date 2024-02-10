import { Box, Grid, Paper, Rating } from '@mui/material';
import { Navigate, useParams } from 'react-router-dom';
import RatingHistogram from './RatingHistogram';
import RatingSummary from './RatingSummary';
import ReviewListItem from './ReviewListItem';
import NewReviewDialog from './NewReviewDialog';
import { useState } from 'react';
import { getScotch } from '../services/scotchService';
import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../services/reviewService';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import useAccessToken from '../hooks/useAccessToken';
import ReviewSearchParameters from '../types/reviewSearchParameters';

function ScotchDetailPage() {
  const { id } = useParams();

  const { loading, accessToken } = useAccessToken();

  const [reviewSearchParameters, _setReviewSearchParameters] =
    useState<ReviewSearchParameters>({ pageIndex: 0, pageSize: 20 });

  const scotch = useQuery({
    queryKey: ['scotches', id],
    queryFn: () => getScotch(id!),
  });

  const reviews = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => getReviews(id!, reviewSearchParameters, accessToken),
    enabled: Boolean(id) && !loading,
  });

  const [rating, setRating] = useState<number | null>(0);
  const [newReviewDialogOpen, setNewReviewDialogOpen] = useState(false);

  const items: ReactImageGalleryItem[] | undefined = scotch.data?.images.map(
    (src) => ({
      original: src,
      thumbnail: src,
    }),
  );

  if (scotch.isError || reviews.isError) {
    return <Navigate to="/404" replace />;
  }

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
              <Rating
                disabled={!accessToken}
                value={rating}
                onChange={(_e, newRating) => setRating(newRating)}
                onClick={() => setNewReviewDialogOpen(true)}
              />
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
