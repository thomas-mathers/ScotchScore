using ScotchScore.Domain;

namespace ScotchScore.Application.Contracts;

public interface IReviewVoteRepository
{
    void Add(ReviewVote reviewVote);

    Task<ReviewVote?> GetVote(string reviewVoteId, CancellationToken cancellationToken = default);
    
    Task<ReviewVote?> GetVote(string reviewId, string userId, CancellationToken cancellationToken);

    Task<IReadOnlyDictionary<string, ReviewVote>> GetUserVotes(string scotchId, string userId,
        CancellationToken cancellationToken = default);
    
    void Delete(ReviewVote id);
}