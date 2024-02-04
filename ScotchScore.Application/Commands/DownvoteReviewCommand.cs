using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
using ScotchScore.Application.Mappers;
using ScotchScore.Domain;
using Review = ScotchScore.Contracts.Review;

namespace ScotchScore.Application.Commands;

public class DownvoteReviewCommand
{
    public string ReviewId { get; init; } = string.Empty;
    public string UserId { get; init; } = string.Empty;
}

public class DownvoteReviewCommandHandler(
    IReviewRepository reviewRepository,
    IReviewVoteRepository reviewVoteRepository,
    IUnitOfWork unitOfWork)
    : IRequestHandler<DownvoteReviewCommand, Result<Review>>
{
    public async Task<Result<Review>> Handle(DownvoteReviewCommand request, CancellationToken cancellationToken)
    {
        var review = await reviewRepository.GetReview(request.ReviewId, cancellationToken);

        if (review is null)
        {
            return Result<Review>.NotFound();
        }

        review.Downvotes++;

        var vote = new ReviewVote
        {
            ScotchId = review.ScotchId,
            ReviewId = review.Id,
            UserId = request.UserId,
            ReviewVoteType = ReviewVoteType.Downvote
        };

        reviewVoteRepository.Add(vote);

        await unitOfWork.Commit(cancellationToken);

        var reviewDto = ReviewMapper.Map(review);

        return reviewDto;
    }
}