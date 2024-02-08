using ScotchScore.Domain;

namespace ScotchScore.Application.Contracts;

public interface IReviewVoteRepository
{
    void Add(ReviewVote reviewVote);

    Task<IReadOnlyList<ReviewVote>> GetUserVotes(string scotchId, string userId,
        CancellationToken cancellationToken = default);

    Task<ReviewVote?> GetVote(string reviewId, string userId, CancellationToken cancellationToken);
}