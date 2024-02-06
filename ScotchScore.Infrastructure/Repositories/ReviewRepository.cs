using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ScotchScore.Application.Contracts;
using ScotchScore.Contracts;
using Review = ScotchScore.Domain.Review;

namespace ScotchScore.Infrastructure.Repositories;

public class ReviewRepository(DatabaseContext databaseContext) : IReviewRepository
{
    private static Dictionary<ReviewSortColumn, Expression<Func<Review, object>>> SortByMapping { get; } =
        new()
        {
            [ReviewSortColumn.DateCreated] = review => review.DateCreated,
            [ReviewSortColumn.Rating] = review => review.Rating,
            [ReviewSortColumn.Upvotes] = review => review.Upvotes,
            [ReviewSortColumn.Downvotes] = review => review.Downvotes
        };
    
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
        var query = databaseContext.Reviews
            .Where(x => x.ScotchId == scotchId)
            .AsQueryable();
        
        if (SortByMapping.TryGetValue(searchParameters.SortBy, out var keySelector))
        {
            query = searchParameters.SortDirection == SortDirection.Ascending
                ? query.OrderBy(keySelector)
                : query.OrderByDescending(keySelector);
        }
        else
        {
            query = searchParameters.SortDirection == SortDirection.Ascending
                ? query.OrderBy(x => x.DateCreated)
                : query.OrderByDescending(x => x.DateCreated);
        }
        
        if (!string.IsNullOrWhiteSpace(searchParameters.Title))
        {
            query = query.Where(x => x.Title.ToLower().Contains(searchParameters.Title.ToLower()));
        }
        
        var reviews = await query
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