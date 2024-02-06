using Microsoft.EntityFrameworkCore;
using ScotchScore.Application.Contracts;
using ScotchScore.Contracts;
using Review = ScotchScore.Domain.Review;

namespace ScotchScore.Infrastructure.Repositories;

public class ReviewRepository(DatabaseContext databaseContext) : IReviewRepository
{
    public Task<Review?> GetReview(string reviewId, CancellationToken cancellationToken = default)
    {
        return databaseContext.Reviews
            .FirstOrDefaultAsync(x => x.Id == reviewId, cancellationToken);
    }

    public Task<Review?> GetReview(string scotchId, string userId, CancellationToken cancellationToken = default)
    {
        return databaseContext.Reviews
            .FirstOrDefaultAsync(x => x.ScotchId == scotchId && x.UserId == userId, cancellationToken);
    }

    public async Task<IReadOnlyList<Review>> GetReviews
    (
        string scotchId,
        ReviewSearchParameters searchParameters,
        CancellationToken cancellationToken = default
    )
    {
        var reviews = await databaseContext.Reviews
            .Where(x => x.ScotchId == scotchId)
            .OrderBy(x => x.DateCreated)
            .Skip(searchParameters.PageIndex * searchParameters.PageSize)
            .Take(searchParameters.PageSize)
            .ToArrayAsync(cancellationToken);

        return reviews;
    }

    public void Add(Review review)
    {
        databaseContext.Reviews.Add(review);
    }
}