using Ardalis.Result;
using ScotchScore.Application.Common.Interfaces;
using ScotchScore.Application.Reviews.Mappers;
using ScotchScore.Application.Reviews.Repositories;
using ScotchScore.Contracts;

namespace ScotchScore.Application.Reviews.Queries;

public class GetReviewsQuery
{
    public string ScotchId { get; init; } = string.Empty;
    public ReviewSearchParameters SearchParameters { get; init; } = new();
}

public class GetReviewsQueryHandler(IReviewRepository reviewRepository)
    : IRequestHandler<GetReviewsQuery, Result<IReadOnlyList<Review>>>
{
    public async Task<Result<IReadOnlyList<Review>>> Handle(GetReviewsQuery request,
        CancellationToken cancellationToken)
    {
        var reviews = await reviewRepository.GetReviews
        (
            request.ScotchId,
            request.SearchParameters,
            cancellationToken
        );

        return reviews.Select(ReviewMapper.Map).ToArray();
    }
}