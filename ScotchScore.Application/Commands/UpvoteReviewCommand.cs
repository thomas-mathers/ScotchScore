using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
using ScotchScore.Application.Mappers;
using ScotchScore.Domain;
using Review = ScotchScore.Contracts.Review;

namespace ScotchScore.Application.Commands;

public class UpvoteReviewCommand
{
    public string ReviewId { get; init; } = string.Empty;
    public string UserId { get; init; } = string.Empty;
}

public class UpvoteReviewCommandHandler(
    IReviewRepository reviewRepository,
    IReviewVoteRepository reviewVoteRepository,
    IUnitOfWork unitOfWork)
    : IRequestHandler<UpvoteReviewCommand, Result<Review>>
{
    public async Task<Result<Review>> Handle(UpvoteReviewCommand request, CancellationToken cancellationToken)
    {
        var review = await reviewRepository.GetReview(request.ReviewId, cancellationToken);

        if (review is null)
        {
            return Result<Review>.NotFound();
        }

        review.Upvotes++;

        var vote = new ReviewVote
        {
            ScotchId = review.ScotchId,
            ReviewId = review.Id,
            UserId = request.UserId,
            ReviewVoteType = ReviewVoteType.Upvote
        };

        reviewVoteRepository.Add(vote);

        await unitOfWork.Commit(cancellationToken);

        var reviewDto = ReviewMapper.Map(review);

        return reviewDto;
    }
}