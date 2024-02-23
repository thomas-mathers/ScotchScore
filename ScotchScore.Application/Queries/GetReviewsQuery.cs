using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
using ScotchScore.Application.Extensions;
using ScotchScore.Application.Mappers;
using ScotchScore.Contracts;

namespace ScotchScore.Application.Queries;

public class GetReviewsQuery
{
    public string ScotchId { get; init; } = string.Empty;
    public string? UserId { get; init; }
    public ReviewSearchParameters SearchParameters { get; init; } = new();
}

public class GetReviewsQueryHandler(IReviewRepository reviewRepository, IReviewVoteRepository reviewVoteRepository)
    : IRequestHandler<GetReviewsQuery, Result<Page<Review>>>
{
    public async Task<Result<Page<Review>>> Handle(GetReviewsQuery request,
        CancellationToken cancellationToken)
    {
        var reviews = await reviewRepository.GetReviews
        (
            request.ScotchId,
            request.SearchParameters,
            cancellationToken
        );

        if (request.UserId is null)
        {
            return reviews.Map(r => ReviewMapper.Map(r));
        }

        var reviewToVote = await reviewVoteRepository.GetUserVotes
        (
            request.ScotchId, 
            request.UserId, 
            cancellationToken
        );

        var reviewDtos = reviews.Map(r => ReviewMapper.Map(r, reviewToVote.GetValueOrDefault(r.Id)));

        return reviewDtos;
    }
}