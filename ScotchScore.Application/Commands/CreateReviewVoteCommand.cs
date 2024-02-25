using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
using ScotchScore.Application.Mappers;
using ScotchScore.Contracts;

namespace ScotchScore.Application.Commands;

public class CreateReviewVoteCommand
{
    public string ReviewId { get; init; } = string.Empty;
    public string UserId { get; init; } = string.Empty;
    public ReviewVoteType VoteType { get; init; }
}

public class CreateReviewVoteCommandHandler(
    IReviewRepository reviewRepository,
    IReviewVoteRepository reviewVoteRepository,
    IUnitOfWork unitOfWork)
    : IRequestHandler<CreateReviewVoteCommand, Result<ReviewVote>>
{
    public async Task<Result<ReviewVote>> Handle(CreateReviewVoteCommand request, CancellationToken cancellationToken)
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
        
        if (request.VoteType == ReviewVoteType.Upvote)
        {
            review.Upvotes++;
        }
        else
        {
            review.Downvotes++;
        }

        var vote = new Domain.ReviewVote
        {
            ScotchId = review.ScotchId,
            ReviewId = review.Id,
            UserId = request.UserId,
            ReviewVoteType = request.VoteType == ReviewVoteType.Upvote
                ? Domain.ReviewVoteType.Upvote
                : Domain.ReviewVoteType.Downvote
        };

        reviewVoteRepository.Add(vote);

        await unitOfWork.Commit(cancellationToken);

        var voteDto = ReviewVoteMapper.Map(vote);

        return voteDto;
    }
}