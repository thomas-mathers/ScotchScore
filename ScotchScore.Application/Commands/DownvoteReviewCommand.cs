using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
using ScotchScore.Application.Mappers;
using ScotchScore.Contracts;

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
    : IRequestHandler<DownvoteReviewCommand, Result<ReviewVote>>
{
    public async Task<Result<ReviewVote>> Handle(DownvoteReviewCommand request, CancellationToken cancellationToken)
    {
        var review = await reviewRepository.GetReview(request.ReviewId, cancellationToken);

        if (review is null)
        {
            return Result<ReviewVote>.NotFound();
        }
        
        var existingVote = await reviewVoteRepository.GetVote(request.ReviewId, request.UserId, cancellationToken);
        
        if (existingVote is not null)
        {
            return Result<ReviewVote>.Conflict();
        }

        review.Downvotes++;

        var vote = new Domain.ReviewVote
        {
            ScotchId = review.ScotchId,
            ReviewId = review.Id,
            UserId = request.UserId,
            ReviewVoteType = Domain.ReviewVoteType.Downvote
        };

        reviewVoteRepository.Add(vote);

        await unitOfWork.Commit(cancellationToken);
        
        var voteDto = ReviewVoteMapper.Map(vote);

        return voteDto;
    }
}