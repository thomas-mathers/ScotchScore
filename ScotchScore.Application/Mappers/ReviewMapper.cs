using Review = ScotchScore.Contracts.Review;

namespace ScotchScore.Application.Mappers;

public static class ReviewMapper
{
    public static Review Map(Domain.Review review, Domain.ReviewVote? vote = null)
    {
        return new Review
        {
            Id = review.Id,
            ScotchId = review.ScotchId,
            Title = review.Title,
            Description = review.Description,
            Rating = review.Rating,
            UserId = review.UserId,
            UserName = review.UserName,
            UserProfilePictureUrl = review.UserProfilePictureUrl,
            UserEmail = review.UserEmail,
            Upvotes = review.Upvotes,
            Downvotes = review.Downvotes,
            DateCreated = review.DateCreated,
            UserVote = vote is not null ? ReviewVoteMapper.Map(vote) : null
        };
    }
}