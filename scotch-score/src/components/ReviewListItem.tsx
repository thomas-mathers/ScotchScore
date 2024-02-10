import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Rating,
  Tooltip,
} from '@mui/material';
import TimeAgo from 'react-timeago';

import Review from '../types/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVote, deleteVote, updateVote } from '../services/reviewService';
import useAccessToken from '../hooks/useAccessToken';
import ReviewVoteType from '../types/reviewVoteType';
import { useAuth0 } from '@auth0/auth0-react';

interface ReviewListItemProps {
  review: Review;
}

function ReviewListItem(props: ReviewListItemProps) {
  const { review } = props;

  const { isAuthenticated } = useAuth0();

  const { accessToken } = useAccessToken();

  const queryClient = useQueryClient();

  const createVoteMutation = useMutation<
    Review,
    Error,
    ReviewVoteType,
    unknown
  >({
    mutationFn: (reviewVoteType: ReviewVoteType) =>
      createVote(review.id, { reviewVoteType }, accessToken),
    mutationKey: ['upvoteReview', review.id, accessToken],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', review.scotchId] });
    },
  });

  const updateVoteMutation = useMutation<
    Review,
    Error,
    ReviewVoteType,
    unknown
  >({
    mutationFn: (reviewVoteType: ReviewVoteType) =>
      updateVote(
        review.id,
        review.userVote!.id,
        { reviewVoteType },
        accessToken,
      ),
    mutationKey: ['updateVote', review.id, accessToken],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', review.scotchId] });
    },
  });

  const deleteVoteMutation = useMutation<boolean>({
    mutationFn: () => deleteVote(review.id, review.userVote!.id, accessToken),
    mutationKey: ['deleteVote', review.id, accessToken],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', review.scotchId] });
    },
  });

  const isUpvoted = review.userVote?.reviewVoteType === 'Upvote';
  const isDownvoted = review.userVote?.reviewVoteType === 'Downvote';

  const handleClickUpvote = () => {
    if (isUpvoted) {
      deleteVoteMutation.mutate();
      return;
    }

    if (isDownvoted) {
      updateVoteMutation.mutate('Upvote');
      return;
    }

    createVoteMutation.mutate('Upvote');
  };

  const handleClickDownvote = () => {
    if (isDownvoted) {
      deleteVoteMutation.mutate();
      return;
    }

    if (isUpvoted) {
      updateVoteMutation.mutate('Downvote');
      return;
    }

    createVoteMutation.mutate('Downvote');
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
              <Tooltip title={isAuthenticated ? '' : 'Login to vote'}>
                <span>
                  <IconButton
                    size="small"
                    onClick={handleClickUpvote}
                    disabled={!isAuthenticated}
                  >
                    {isUpvoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                  </IconButton>
                </span>
              </Tooltip>
              ({review.upvotes})
            </Grid>
            <Grid item>
              <Tooltip title={isAuthenticated ? '' : 'Login to vote'}>
                <span>
                  <IconButton
                    size="small"
                    onClick={handleClickDownvote}
                    disabled={!isAuthenticated}
                  >
                    {isDownvoted ? (
                      <ThumbDownIcon />
                    ) : (
                      <ThumbDownOutlinedIcon />
                    )}
                  </IconButton>
                </span>
              </Tooltip>
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
