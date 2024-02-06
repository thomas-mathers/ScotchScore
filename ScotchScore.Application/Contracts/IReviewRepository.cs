using ScotchScore.Contracts;
using Review = ScotchScore.Domain.Review;

namespace ScotchScore.Application.Contracts;

public interface IReviewRepository
{
    Task<Review?> GetReview(string reviewId, CancellationToken cancellationToken = default);
    
    Task<Review?> GetReview(string scotchId, string userId, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Review>> GetReviews
    (
        string scotchId,
        ReviewSearchParameters searchParameters,
        CancellationToken cancellationToken = default
    );

    void Add(Review review);
}