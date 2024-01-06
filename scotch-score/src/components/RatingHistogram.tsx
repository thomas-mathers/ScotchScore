import { LinearProgress, Box } from "@mui/material";

interface RatingHistogramProps {
  ratings: number[];
}

function RatingHistogram({ ratings }: RatingHistogramProps) {
  const totalRatings = ratings.reduce((acc, rating) => acc + rating, 0);
  return (
    <Box>
      <p>Ratings Snapshot</p>
      {ratings
        .slice()
        .reverse()
        .map((rating, i) => (
          <Box display="flex" alignItems="center" gap={1}>
            <Box>{ratings.length - i} stars</Box>
            <Box flex="1">
              <LinearProgress
                variant="determinate"
                value={(rating / totalRatings) * 100}
              />
            </Box>
            <Box width="40px">{rating}</Box>
          </Box>
        ))}
    </Box>
  );
}

export default RatingHistogram;
