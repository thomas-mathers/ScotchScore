using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
using ScotchScore.Application.Mappers;
using ScotchScore.Contracts;
using Scotch = ScotchScore.Contracts.Scotch;

namespace ScotchScore.Application.Queries;

public class GetScotchesQuery
{
    public ScotchSearchParameters SearchParameters { get; init; } = new();
}

public class GetScotchesQueryHandler(IScotchRepository scotchRepository)
    : IRequestHandler<GetScotchesQuery, Result<IReadOnlyList<Scotch>>>
{
    public async Task<Result<IReadOnlyList<Scotch>>> Handle(GetScotchesQuery request,
        CancellationToken cancellationToken)
    {
        var scotches = await scotchRepository.GetScotches
        (
            request.SearchParameters,
            cancellationToken
        );

        return scotches.Select(ScotchMapper.Map).ToArray();
    }
}