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

    public async Task<IReadOnlyList<ReviewVote>> GetVotes(string userId, string scotchId, CancellationToken cancellationToken = default)
    {
        return await databaseContext.ReviewVotes
            .Where(reviewVote => reviewVote.UserId == userId && reviewVote.ScotchId == scotchId)
            .ToArrayAsync(cancellationToken);
    }
}