using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
using ScotchScore.Application.Mappers;
using ScotchScore.Contracts;

namespace ScotchScore.Application.Commands;

public class UpdateReviewVoteCommand
{
    public string UserId { get; init; } = string.Empty;
    public string VoteId { get; init; } = string.Empty;
    public ReviewVoteType VoteType { get; init; }
}

public class UpdateReviewVoteCommandHandler(
    IReviewRepository reviewRepository,
    IReviewVoteRepository reviewVoteRepository,
    IUnitOfWork unitOfWork)
    : IRequestHandler<UpdateReviewVoteCommand, Result<ReviewVote>>
{
    public async Task<Result<ReviewVote>> Handle(UpdateReviewVoteCommand request, CancellationToken cancellationToken)
    {
        var vote = await reviewVoteRepository.GetVote(request.VoteId, cancellationToken);

        if (vote is null)
        {
            return Result<ReviewVote>.NotFound();
        }

        if (vote.UserId != request.UserId)
        {
            return Result<ReviewVote>.Forbidden();
        }
        
        var review = await reviewRepository.GetReview(vote.ReviewId, cancellationToken);
        
        if (review is null)
        {
            return Result<ReviewVote>.NotFound();
        }
        
        var reviewVoteType = request.VoteType == ReviewVoteType.Upvote
            ? Domain.ReviewVoteType.Upvote
            : Domain.ReviewVoteType.Downvote;
        
        if (reviewVoteType == vote.ReviewVoteType)
        {
            return ReviewVoteMapper.Map(vote);
        }
        
        if (reviewVoteType == Domain.ReviewVoteType.Upvote && vote.ReviewVoteType == Domain.ReviewVoteType.Downvote)
        {
            review.Upvotes++;
            review.Downvotes--;
            
            vote.ReviewVoteType = Domain.ReviewVoteType.Upvote;
        }
        else
        {
            review.Upvotes--;
            review.Downvotes++;
            
            vote.ReviewVoteType = Domain.ReviewVoteType.Downvote;
        }
        
        await unitOfWork.Commit(cancellationToken);

        return ReviewVoteMapper.Map(vote);
    }
}