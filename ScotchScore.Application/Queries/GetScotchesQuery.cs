using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
using ScotchScore.Application.Extensions;
using ScotchScore.Application.Mappers;
using ScotchScore.Contracts;
using Scotch = ScotchScore.Contracts.Scotch;

namespace ScotchScore.Application.Queries;

public class GetScotchesQuery
{
    public ScotchSearchParameters SearchParameters { get; init; } = new();
}

public class GetScotchesQueryHandler(IScotchRepository scotchRepository)
    : IRequestHandler<GetScotchesQuery, Result<Page<Scotch>>>
{
    public async Task<Result<Page<Scotch>>> Handle(GetScotchesQuery request,
        CancellationToken cancellationToken)
    {
        var pageOfScotches = await scotchRepository.GetScotches
        (
            request.SearchParameters,
            cancellationToken
        );

        return pageOfScotches.Map(ScotchMapper.Map);
    }
}