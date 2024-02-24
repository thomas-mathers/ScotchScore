import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import useAccessToken from '../hooks/useAccessToken';
import { getReviews } from '../services/reviewService';
import ReviewSearchParameters from '../types/reviewSearchParameters';
import ReviewSortColumn from '../types/reviewSortColumn';
import SortDirection from '../types/sortDirection';
import ReviewListItem from './ReviewListItem';

interface ScotchReviewsProps {
  scotchId: string;
}

function ScotchReviewsLoader() {
  return (
    <Box display="flex" justifyContent="center">
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography component="span">Loading...</Typography>
        <CircularProgress size={20} />
      </Stack>
    </Box>
  );
}

interface SortOption {
  sortBy: ReviewSortColumn;
  sortDirection: SortDirection;
}

const sortOptions: SortOption[] = [
  { sortBy: 'dateCreated', sortDirection: 'Ascending' },
  { sortBy: 'dateCreated', sortDirection: 'Descending' },
  { sortBy: 'rating', sortDirection: 'Ascending' },
  { sortBy: 'rating', sortDirection: 'Descending' },
  { sortBy: 'upvotes', sortDirection: 'Ascending' },
  { sortBy: 'upvotes', sortDirection: 'Descending' },
  { sortBy: 'downvotes', sortDirection: 'Ascending' },
  { sortBy: 'downvotes', sortDirection: 'Descending' },
];

function ScotchReviews({ scotchId }: ScotchReviewsProps) {
  const { loading: isFetchingAccessToken, accessToken } = useAccessToken();

  const [reviewSearchParameters, setReviewSearchParameters] =
    useState<ReviewSearchParameters>({
      pageIndex: 0,
      pageSize: 10,
    });

  const {
    data: reviewPages,
    hasNextPage: hasMoreReviews,
    fetchNextPage: fetchMoreReviews,
  } = useInfiniteQuery({
    queryKey: ['reviews', scotchId, reviewSearchParameters, accessToken],
    queryFn: ({ pageParam: pageIndex }) =>
      getReviews(
        scotchId,
        { ...reviewSearchParameters, pageIndex },
        accessToken,
      ),
    enabled: !isFetchingAccessToken,
    getNextPageParam: (lastPage) =>
      lastPage.pageIndex + 1 < lastPage.totalPages
        ? lastPage.pageIndex + 1
        : undefined,
    initialPageParam: 0,
  });

  const reviews = reviewPages?.pages.flatMap((review) => review.records);

  const handleSortChange = (selectionIndex: number) => {
    const sortOption = sortOptions[selectionIndex];

    setReviewSearchParameters({
      ...reviewSearchParameters,
      sortBy: sortOption.sortBy,
      sortDirection: sortOption.sortDirection,
    });
  };

  return (
    <Box>
      <FormControl variant="outlined">
        <InputLabel id="sort-label">Sort by</InputLabel>
        <Select
          labelId="sort-label"
          label="Sort by"
          value={0}
          onChange={(e) => handleSortChange(e.target.value as number)}
        >
          <MenuItem value={0}>Date Created (Asc)</MenuItem>
          <MenuItem value={1}>Date Created (Desc)</MenuItem>
          <MenuItem value={2}>Rating (Asc)</MenuItem>
          <MenuItem value={3}>Rating (Desc)</MenuItem>
          <MenuItem value={4}>Upvotes (Asc)</MenuItem>
          <MenuItem value={5}>Upvotes (Desc)</MenuItem>
          <MenuItem value={6}>Downvotes (Asc)</MenuItem>
          <MenuItem value={7}>Downvotes (Desc)</MenuItem>
        </Select>
      </FormControl>
      <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
      <InfiniteScroll
        dataLength={reviews?.length ?? 0}
        next={fetchMoreReviews}
        hasMore={hasMoreReviews}
        loader={<ScotchReviewsLoader />}
      >
        {reviews?.map((review) => (
          <ReviewListItem key={review.id} review={review} />
        ))}
      </InfiniteScroll>
    </Box>
  );
}

export default ScotchReviews;
