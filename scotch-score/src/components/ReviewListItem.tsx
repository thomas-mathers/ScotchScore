import { Avatar, Box, Divider, Grid, IconButton, Rating } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Review from "../types/review";
import TimeAgo from "react-timeago";

interface ReviewListItemProps {
  review: Review;
}

function ReviewListItem(props: ReviewListItemProps) {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm>
          <Rating value={props.review.rating} precision={0.5} readOnly />
        </Grid>
        <Grid item xs={12} sm="auto">
          <Grid container spacing={1}>
            <Grid item>
              <IconButton size="small">
                <ThumbUpIcon />
              </IconButton>
              ({props.review.upvotes})
            </Grid>
            <Grid item>
              <IconButton size="small">
                <ThumbDownIcon />
              </IconButton>
              ({props.review.downvotes})
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <Avatar src={props.review.userProfilePictureUrl}>
                {props.review.userName[0]}
              </Avatar>
            </Grid>
            <Grid item>
              <div>{props.review.userName}</div>
              <TimeAgo date={props.review.dateCreated} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>{props.review.description}</Grid>
      </Grid>
      <Box marginBottom={2} marginTop={2}>
        <Divider />
      </Box>
    </Box>
  );
}

export default ReviewListItem;
