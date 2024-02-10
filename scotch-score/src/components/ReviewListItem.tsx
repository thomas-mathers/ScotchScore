import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Avatar, Box, Divider, Grid, IconButton, Rating } from '@mui/material';
import TimeAgo from 'react-timeago';

import Review from '../types/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVote, deleteVote } from '../services/reviewService';
import useAccessToken from '../hooks/useAccessToken';

interface ReviewListItemProps {
  review: Review;
}

function ReviewListItem(props: ReviewListItemProps) {
  const { review } = props;

  const { accessToken } = useAccessToken();

  const queryClient = useQueryClient();

  const upvoteMutation = useMutation<Review>({
    mutationFn: () =>
      createVote(review.id, { reviewVoteType: 'Upvote' }, accessToken),
    mutationKey: ['upvoteReview', review.id, accessToken],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', review.scotchId] });
    },
  });

  const downvoteMutation = useMutation<Review>({
    mutationFn: () =>
      createVote(review.id, { reviewVoteType: 'Downvote' }, accessToken),
    mutationKey: ['downvoteReview', review.id, accessToken],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', review.scotchId] });
    },
  });

  const deleteMutation = useMutation<boolean, Error, string, unknown>({
    mutationFn: (reviewVoteId) =>
      deleteVote(review.id, reviewVoteId, accessToken),
    mutationKey: ['deleteVote', review.id, accessToken],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', review.scotchId] });
    },
  });

  const isUpvoted = review.userVote?.reviewVoteType === 'Upvote';
  const isDownvoted = review.userVote?.reviewVoteType === 'Downvote';

  const handleClickUpvote = () => {
    if (isUpvoted) {
      deleteMutation.mutate(review.userVote!.id);
      return;
    }

    upvoteMutation.mutate();
  };

  const handleClickDownvote = () => {
    if (isDownvoted) {
      deleteMutation.mutate(review.userVote!.id);
      return;
    }

    downvoteMutation.mutate();
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm>
          <Rating value={review.rating} precision={0.5} readOnly />
        </Grid>
        <Grid item xs={12} sm="auto">
          <Grid container spacing={1}>
            <Grid item>
              <IconButton size="small" onClick={handleClickUpvote}>
                {isUpvoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              </IconButton>
              ({review.upvotes})
            </Grid>
            <Grid item>
              <IconButton size="small" onClick={handleClickDownvote}>
                {isDownvoted ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
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
