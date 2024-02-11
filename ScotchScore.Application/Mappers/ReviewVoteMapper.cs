using ScotchScore.Contracts;

namespace ScotchScore.Application.Mappers;

public static class ReviewVoteMapper
{
    public static ReviewVote Map(Domain.ReviewVote reviewVote)
    {
        return new ReviewVote
        {
            Id = reviewVote.Id,
            ReviewId = reviewVote.ReviewId,
            ReviewVoteType = Map(reviewVote.ReviewVoteType),
            ScotchId = reviewVote.ScotchId,
            UserId = reviewVote.UserId,
            DateCreated = reviewVote.DateCreated
        };
    }

    private static ReviewVoteType Map(Domain.ReviewVoteType reviewVoteType)
    {
        return reviewVoteType switch
        {
            Domain.ReviewVoteType.Upvote => ReviewVoteType.Upvote,
            Domain.ReviewVoteType.Downvote => ReviewVoteType.Downvote,
            _ => throw new ArgumentOutOfRangeException(nameof(reviewVoteType), reviewVoteType, null)
        };
    }
}