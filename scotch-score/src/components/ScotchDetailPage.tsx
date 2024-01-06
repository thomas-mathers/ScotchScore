import { Box, Grid, Paper, Rating } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import RatingHistogram from "./RatingHistogram";
import RatingSummary from "./RatingSummary";
import ReviewListItem from "./ReviewListItem";
import NewReviewDialog from "./NewReviewDialog";
import { useState } from "react";
import { getScotch } from "../services/scotchService";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../services/reviewService";

function ScotchDetailPage() {
  const { id } = useParams();

  const scotch = useQuery({
    queryKey: ["scotches", id],
    queryFn: () => getScotch(id!),
  });

  const reviews = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id!),
  });

  const [open, setOpen] = useState(false);

  if (scotch.isError || reviews.isError) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Box>
      <h1>{scotch.data?.name}</h1>
      <Paper>
        <Box padding={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm="auto">
              <img
                src={scotch.data?.images[0]}
                width={250}
                height={250}
                alt={scotch.data?.name}
                style={{
                  height: "250px",
                  width: "250px",
                  objectFit: "contain",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <p>{scotch.data?.description}</p>
            </Grid>
          </Grid>
          <h3>Ratings</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <RatingHistogram
                ratings={[
                  scotch.data?.numberOfOneStarRatings ?? 0,
                  scotch.data?.numberOfTwoStarRatings ?? 0,
                  scotch.data?.numberOfThreeStarRatings ?? 0,
                  scotch.data?.numberOfFourStarRatings ?? 0,
                  scotch.data?.numberOfFiveStarRatings ?? 0,
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <RatingSummary
                rating={scotch.data?.averageRating ?? 0}
                numberOfRatings={scotch.data?.numberOfRatings ?? 0}
                numberOfPositiveRecommendations={
                  scotch.data?.numberOfPositiveRecommendations ?? 0
                }
                numberOfRecommendations={
                  scotch.data?.numberOfRecommendations ?? 0
                }
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <p>Review this product</p>
              <Rating
                value={0}
                precision={0.5}
                onClick={(e) => setOpen(true)}
              />
            </Grid>
          </Grid>
          <h3>Reviews</h3>
          {reviews.data?.map((review) => (
            <ReviewListItem key={review.id} review={review} />
          ))}
        </Box>
      </Paper>
      <NewReviewDialog open={open} rating={0} onClose={() => setOpen(false)} />
    </Box>
  );
}

export default ScotchDetailPage;
