using Microsoft.EntityFrameworkCore;
using ScotchScore.Application.Reviews.Repositories;
using ScotchScore.Domain;

namespace ScotchScore.Infrastructure.Reviews.Repositories;

public class ReviewRepository(DatabaseContext databaseContext) : IReviewRepository
{
    public async Task<IReadOnlyList<Review>> GetReviews(string scotchId, int pageIndex = 0, int pageSize = 100,
        CancellationToken cancellationToken = default)
    {
        var reviews = await databaseContext.Reviews
            .Where(x => x.ScotchId == scotchId)
            .OrderBy(x => x.DateCreated)
            .Skip(pageIndex * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
        
        return reviews;
    }
}