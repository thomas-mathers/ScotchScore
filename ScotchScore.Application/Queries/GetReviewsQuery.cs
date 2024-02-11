using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
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

        if (request.UserId is null)
        {
            return reviews.Select(r => ReviewMapper.Map(r)).ToArray();
        }

        var reviewToVote = await reviewVoteRepository.GetUserVotes
        (
            request.ScotchId, 
            request.UserId, 
            cancellationToken
        );

        var reviewDtos = reviews.Select(r => ReviewMapper.Map(r, reviewToVote.GetValueOrDefault(r.Id))).ToArray();

        return reviewDtos;
    }
}