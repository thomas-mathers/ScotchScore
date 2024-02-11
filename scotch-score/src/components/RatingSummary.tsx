import { Box, Grid, Rating, Typography } from '@mui/material';

interface RatingSummaryProps {
  rating: number;
  numberOfRatings: number;
  numberOfPositiveRecommendations: number;
  numberOfRecommendations: number;
}

function RatingSummary(props: RatingSummaryProps) {
  return (
    <Box>
      <p>Overall Rating</p>
      <Grid container gap={2}>
        <Grid item>
          <Typography variant="h3">{props.rating.toFixed(1)}</Typography>
        </Grid>
        <Grid item xs>
          <Rating value={props.rating} precision={0.1} readOnly />
          <Box>{`${props.numberOfRatings} ratings`}</Box>
        </Grid>
        <Grid
          item
          xs={12}
        >{`${props.numberOfPositiveRecommendations} out of ${props.numberOfRecommendations} people would recommend this product`}</Grid>
      </Grid>
    </Box>
  );
}

export default RatingSummary;
