using Microsoft.EntityFrameworkCore;
using ScotchScore.Application.Reviews.Repositories;
using ScotchScore.Contracts;
using Review = ScotchScore.Domain.Review;

namespace ScotchScore.Infrastructure.Reviews.Repositories;

public class ReviewRepository(DatabaseContext databaseContext) : IReviewRepository
{
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
            .ToListAsync(cancellationToken);

        return reviews;
    }

    public void Add(Review review)
    {
        databaseContext.Reviews.Add(review);
    }
}