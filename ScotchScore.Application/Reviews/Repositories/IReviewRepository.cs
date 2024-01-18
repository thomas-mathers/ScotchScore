using ScotchScore.Contracts;
using Review = ScotchScore.Domain.Review;

namespace ScotchScore.Application.Reviews.Repositories;

public interface IReviewRepository
{
    Task<IReadOnlyList<Review>> GetReviews
    (
        string scotchId, 
        int pageIndex = 0, 
        int pageSize = 100,
        string sortBy = nameof(Review.DateCreated), 
        SortDirection sortDirection = SortDirection.Ascending,
        CancellationToken cancellationToken = default
    );

    void Add(Review review);
}