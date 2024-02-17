import 'react-image-gallery/styles/css/image-gallery.css';
import './ScotchDetailPage.css';

import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Rating,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { useParams } from 'react-router-dom';

import useAccessToken from '../hooks/useAccessToken';
import { getReviews, getUserReview } from '../services/reviewService';
import { getScotch } from '../services/scotchService';
import ReviewSearchParameters from '../types/reviewSearchParameters';
import formatCurrency from '../utils/formatCurrency';
import NewReviewDialog from './NewReviewDialog';
import RatingHistogram from './RatingHistogram';
import RatingSummary from './RatingSummary';
import ReviewListItem from './ReviewListItem';

function ScotchDetailPage() {
  const routeParams = useParams();
  const scotchId = routeParams.id!;

  const { isAuthenticated, user } = useAuth0();

  const { loading: isFetchingAccessToken, accessToken } = useAccessToken();

  const [reviewSearchParameters] = useState<ReviewSearchParameters>({
    pageIndex: 0,
    pageSize: 20,
  });

  const { data: scotch } = useQuery({
    queryKey: ['scotches', scotchId],
    queryFn: () => getScotch(scotchId),
  });

  const { data: reviews } = useQuery({
    queryKey: ['reviews', scotchId, reviewSearchParameters, accessToken],
    queryFn: () => getReviews(scotchId, reviewSearchParameters, accessToken),
    enabled: !isFetchingAccessToken,
  });

  const { data: userReview } = useQuery({
    queryKey: ['userReview', scotchId, user?.sub, accessToken],
    queryFn: () => getUserReview(scotchId, user!.sub!, accessToken),
    enabled: !isFetchingAccessToken && isAuthenticated,
  });

  const [rating, setRating] = useState<number | null>(null);
  const [newReviewDialogOpen, setNewReviewDialogOpen] = useState(false);

  const items: ReactImageGalleryItem[] =
    scotch?.images.map((src) => ({
      original: src,
      thumbnail: src,
    })) ?? [];

  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating);
    }
  }, [userReview]);

  return (
    <Box>
      <Paper>
        <Box padding={5}>
          <Grid container spacing={2} marginBottom={3}>
            <Grid item xs={12} sm={6} md={4}>
              <ImageGallery items={items} showPlayButton={false} showBullets />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Typography variant="h3" component="h1">
                <strong>{scotch?.name}</strong>
              </Typography>
              {scotch?.amount && scotch?.currency && (
                <Typography variant="h5" component="h2">
                  {formatCurrency(scotch.amount, scotch.currency)}
                </Typography>
              )}
              <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
              <Typography variant="body1">{scotch?.description}</Typography>
            </Grid>
          </Grid>
          <Typography variant="h5" component="h2" sx={{ marginBottom: 3 }}>
            <strong>Ratings</strong>
          </Typography>
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" component="h3" gutterBottom>
                Ratings Snapshot
              </Typography>
              <RatingHistogram ratings={scotch?.ratingCounts ?? []} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" component="h3" gutterBottom>
                Overall Rating
              </Typography>
              <RatingSummary
                rating={scotch?.averageRating ?? 0}
                numberOfRatings={0}
                numberOfPositiveRecommendations={0}
                numberOfRecommendations={0}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" component="h3" gutterBottom>
                Review this product
              </Typography>
              <Tooltip title={isAuthenticated ? '' : 'Login to review'}>
                <span>
                  <Rating
                    disabled={!isAuthenticated}
                    readOnly={Boolean(rating)}
                    value={rating}
                    size="large"
                    onChange={(_e, newRating) => setRating(newRating)}
                    onClick={() => setNewReviewDialogOpen(true)}
                  />
                </span>
              </Tooltip>
            </Grid>
          </Grid>
          <Typography variant="h5" component="h2" sx={{ marginBottom: 3 }}>
            <strong>Reviews</strong>
          </Typography>
          <FormControl variant="outlined">
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select labelId="sort-label" label="Sort by" value={10}>
              <MenuItem value={10}>Most recent</MenuItem>
              <MenuItem value={20}>Most helpful</MenuItem>
              <MenuItem value={30}>Highest to lowest rating</MenuItem>
              <MenuItem value={40}>Lowest to highest rating</MenuItem>
            </Select>
          </FormControl>
          <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
          {reviews?.map((review) => (
            <ReviewListItem key={review.id} review={review} />
          ))}
        </Box>
      </Paper>
      <NewReviewDialog
        open={newReviewDialogOpen}
        scotchId={scotchId}
        rating={rating!}
        onClose={() => setNewReviewDialogOpen(false)}
      />
    </Box>
  );
}

export default ScotchDetailPage;
