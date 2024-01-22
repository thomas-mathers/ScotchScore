using ScotchScore.Domain;

namespace ScotchScore.Application.Contracts;

public interface IReviewVoteRepository
{
    void Add(ReviewVote reviewVote);
    
    Task<IReadOnlyList<ReviewVote>> GetVotes
    (
        string userId,
        string scotchId,
        CancellationToken cancellationToken = default
    );
}