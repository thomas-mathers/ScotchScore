using Microsoft.EntityFrameworkCore;
using ScotchScore.Application.Contracts;
using ScotchScore.Domain;

namespace ScotchScore.Infrastructure.Repositories;

public class ReviewVoteRepository(DatabaseContext databaseContext) : IReviewVoteRepository
{
    public void Add(ReviewVote reviewVote)
    {
        databaseContext.ReviewVotes.Add(reviewVote);
    }

    public async Task<IReadOnlyDictionary<string, ReviewVote>> GetUserVotes(string scotchId,
        string userId,
        CancellationToken cancellationToken = default)
    {
        return await databaseContext.ReviewVotes
            .Where(reviewVote => reviewVote.UserId == userId && reviewVote.ScotchId == scotchId)
            .ToDictionaryAsync(k => k.ReviewId, v => v, cancellationToken);
    }

    public Task<ReviewVote?> GetVote(string reviewId, string userId, CancellationToken cancellationToken)
    {
        return databaseContext.ReviewVotes
            .FirstOrDefaultAsync(x => x.ReviewId == reviewId && x.UserId == userId, cancellationToken);
    }
}