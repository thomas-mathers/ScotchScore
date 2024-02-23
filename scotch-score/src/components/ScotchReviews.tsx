import { Typography } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import useAccessToken from '../hooks/useAccessToken';
import { getReviews } from '../services/reviewService';
import ReviewSearchParameters from '../types/reviewSearchParameters';
import ReviewListItem from './ReviewListItem';

interface ScotchReviewsProps {
  scotchId: string;
}

function ScotchReviews({ scotchId }: ScotchReviewsProps) {
  const { loading: isFetchingAccessToken, accessToken } = useAccessToken();

  const [reviewSearchParameters] = useState<ReviewSearchParameters>({
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

  return (
    <InfiniteScroll
      dataLength={reviews?.length ?? 0}
      next={() => fetchMoreReviews()}
      hasMore={hasMoreReviews}
      loader={<Typography>Loading...</Typography>}
    >
      {reviews?.map((review) => (
        <ReviewListItem key={review.id} review={review} />
      ))}
    </InfiniteScroll>
  );
}

export default ScotchReviews;
