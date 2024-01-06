using ScotchScore.Domain;

namespace ScotchScore.Application.Reviews.Repositories;

public interface IReviewRepository
{
    Task<IReadOnlyList<Review>> GetReviews(Guid scotchId, int pageIndex = 0, int pageSize = 100,
        CancellationToken cancellationToken = default);
}