import { Avatar, Box, Divider, Grid, IconButton, Rating } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Review from "../types/review";
import TimeAgo from "react-timeago";

interface ReviewListItemProps {
  review: Review;
  onUpvote?: (review: Review) => void;
  onDownvote?: (review: Review) => void;
}

function ReviewListItem(props: ReviewListItemProps) {
  const { review, onUpvote, onDownvote } = props;
  const handleUpvote = () => onUpvote?.(review);
  const handleDownvote = () => onDownvote?.(review);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm>
          <Rating value={review.rating} precision={0.5} readOnly />
        </Grid>
        <Grid item xs={12} sm="auto">
          <Grid container spacing={1}>
            <Grid item>
              <IconButton size="small" onClick={handleUpvote}>
                <ThumbUpIcon />
              </IconButton>
              ({review.upvotes})
            </Grid>
            <Grid item>
              <IconButton size="small" onClick={handleDownvote}>
                <ThumbDownIcon />
              </IconButton>
              ({review.downvotes})
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <Avatar src={review.userProfilePictureUrl}>
                {review.userName[0]}
              </Avatar>
            </Grid>
            <Grid item>
              <div>{review.userName}</div>
              <TimeAgo date={review.dateCreated} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>{review.description}</Grid>
      </Grid>
      <Box marginBottom={2} marginTop={2}>
        <Divider />
      </Box>
    </Box>
  );
}

export default ReviewListItem;
