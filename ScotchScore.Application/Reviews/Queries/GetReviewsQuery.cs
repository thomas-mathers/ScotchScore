using ScotchScore.Application.Reviews.Repositories;
using ScotchScore.Domain;

namespace ScotchScore.Application.Reviews.Queries;

public class GetReviewsQuery
{
    public int PageIndex { get; init; }
    public int PageSize { get; init; }
    public string ScotchId { get; init; }
}

public class GetReviewsQueryHandler(IReviewRepository reviewRepository) 
    : IQueryHandler<GetReviewsQuery, IReadOnlyList<Review>>
{
    public async Task<IReadOnlyList<Review>> Handle(GetReviewsQuery request, CancellationToken cancellationToken)
    {
        var reviews =
            await reviewRepository.GetReviews(request.ScotchId, request.PageIndex, request.PageSize,
                cancellationToken);

        return reviews;
    }
}