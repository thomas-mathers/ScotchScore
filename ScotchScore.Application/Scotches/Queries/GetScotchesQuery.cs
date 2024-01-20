using Ardalis.Result;
using ScotchScore.Application.Common.Interfaces;
using ScotchScore.Application.Scotches.Mappers;
using ScotchScore.Application.Scotches.Repositories;
using ScotchScore.Contracts;
using Scotch = ScotchScore.Contracts.Scotch;

namespace ScotchScore.Application.Scotches.Queries;

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