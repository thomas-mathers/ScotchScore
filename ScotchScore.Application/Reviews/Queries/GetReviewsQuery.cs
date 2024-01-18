using Ardalis.Result;
using ScotchScore.Application.Common.Interfaces;
using ScotchScore.Application.Reviews.Mappers;
using ScotchScore.Application.Reviews.Repositories;
using ScotchScore.Contracts;
using Review = ScotchScore.Domain.Review;

namespace ScotchScore.Application.Reviews.Queries;

public class GetReviewsQuery
{
    public string Name { get; set; } = string.Empty;
    public int PageIndex { get; init; }
    public int PageSize { get; init; }
    public string ScotchId { get; init; } = string.Empty;
    public string SortBy { get; init; } = nameof(Review.Title);
    public SortDirection SortDirection { get; init; } = SortDirection.Ascending;
}

public class GetReviewsQueryHandler(IReviewRepository reviewRepository)
    : IRequestHandler<GetReviewsQuery, Result<IReadOnlyList<Contracts.Review>>>
{
    public async Task<Result<IReadOnlyList<Contracts.Review>>> Handle(GetReviewsQuery request,
        CancellationToken cancellationToken)
    {
        var reviews = await reviewRepository.GetReviews
        (
            request.ScotchId,
            request.PageIndex,
            request.PageSize,
            request.SortBy,
            request.SortDirection,
            cancellationToken
        );

        return reviews.Select(ReviewMapper.Map).ToArray();
    }
}