using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;

namespace ScotchScore.Application.Commands;

public class DeleteReviewVoteCommand
{
    public string UserId { get; set; } = string.Empty;
    public string ReviewVoteId { get; init; } = string.Empty;
}

public class DeleteReviewVoteCommandHandler(
    IReviewRepository reviewRepository,
    IReviewVoteRepository reviewVoteRepository,
    IUnitOfWork unitOfWork)
    : IRequestHandler<DeleteReviewVoteCommand, Result<bool>>
{
    public async Task<Result<bool>> Handle(DeleteReviewVoteCommand request, CancellationToken cancellationToken)
    {
        var vote = await reviewVoteRepository.GetVote(request.ReviewVoteId, cancellationToken);

        if (vote is null)
        {
            return Result<bool>.NotFound();
        }

        if (vote.UserId != request.UserId)
        {
            return Result<bool>.Forbidden();
        }
        
        var review = await reviewRepository.GetReview(vote.ReviewId, cancellationToken);
        
        if (review is null)
        {
            return Result<bool>.NotFound();
        }
        
        if (vote.ReviewVoteType == Domain.ReviewVoteType.Upvote)
        {
            review.Upvotes--;
        }
        else
        {
            review.Downvotes--;
        }

        reviewVoteRepository.Delete(vote);
        
        await unitOfWork.Commit(cancellationToken);

        return true;
    }
}