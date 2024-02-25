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
  Typography,
} from '@mui/material';
import TimeAgo from 'react-timeago';

import ReviewVoteType from '../types/reviewVoteType';

interface ReviewListItemProps {
  title: string;
  description: string;
  rating: number;
  userName: string;
  userProfilePictureUrl: string;
  upvotes: number;
  downvotes: number;
  dateCreated: Date;
  userVote?: ReviewVoteType;
  isAuthenticated: boolean;
  onClickUpvote?: () => void;
  onClickDownvote?: () => void;
}

function ReviewListItem(props: ReviewListItemProps) {
  const {
    title,
    description,
    rating,
    userName,
    userProfilePictureUrl,
    upvotes,
    downvotes,
    dateCreated,
    userVote,
    isAuthenticated,
    onClickUpvote,
    onClickDownvote,
  } = props;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm>
          <Rating value={rating} precision={0.5} readOnly />
          <Typography variant="h6" component="h3">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm="auto">
          <Grid container spacing={1}>
            <Grid item>
              <Tooltip title={isAuthenticated ? '' : 'Login to vote'}>
                <span>
                  <IconButton
                    aria-label="upvote"
                    size="small"
                    onClick={() => onClickUpvote?.()}
                    disabled={!isAuthenticated}
                  >
                    {userVote === 'Upvote' ? (
                      <ThumbUpIcon aria-label="upvoted" />
                    ) : (
                      <ThumbUpOutlinedIcon />
                    )}
                  </IconButton>
                </span>
              </Tooltip>
              <Typography variant="subtitle2" component="span">
                ({upvotes})
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title={isAuthenticated ? '' : 'Login to vote'}>
                <span>
                  <IconButton
                    aria-label="downvote"
                    size="small"
                    onClick={onClickDownvote}
                    disabled={!isAuthenticated}
                  >
                    {userVote === 'Downvote' ? (
                      <ThumbDownIcon aria-label="downvoted" />
                    ) : (
                      <ThumbDownOutlinedIcon />
                    )}
                  </IconButton>
                </span>
              </Tooltip>
              <Typography variant="subtitle2" component="span">
                ({downvotes})
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <Avatar src={userProfilePictureUrl}>{userName[0]}</Avatar>
            </Grid>
            <Grid item>
              <div>{userName}</div>
              <TimeAgo date={dateCreated} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>{description}</Grid>
      </Grid>
      <Box marginBottom={2} marginTop={2}>
        <Divider />
      </Box>
    </Box>
  );
}

export default ReviewListItem;
export type { ReviewListItemProps };
