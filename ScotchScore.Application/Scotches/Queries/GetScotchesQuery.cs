using Ardalis.Result;
using ScotchScore.Application.Common.Interfaces;
using ScotchScore.Application.Scotches.Mappers;
using ScotchScore.Application.Scotches.Repositories;
using ScotchScore.Contracts;
using Scotch = ScotchScore.Contracts.Scotch;

namespace ScotchScore.Application.Scotches.Queries;

public class GetScotchesQuery
{
    public string Name { get; init; } = string.Empty;
    public int PageIndex { get; init; } = 0;
    public int PageSize { get; init; } = 100;
    public string SortBy { get; init; } = nameof(Domain.Scotch.Name);
    public SortDirection SortDirection { get; init; } = SortDirection.Ascending;
}

public class GetScotchesQueryHandler(IScotchRepository scotchRepository)
    : IRequestHandler<GetScotchesQuery, Result<IReadOnlyList<Scotch>>>
{
    public async Task<Result<IReadOnlyList<Scotch>>> Handle(GetScotchesQuery request,
        CancellationToken cancellationToken)
    {
        var scotches = await scotchRepository.GetScotches
        (
            request.Name,
            request.PageIndex,
            request.PageSize,
            request.SortBy,
            request.SortDirection,
            cancellationToken
        );

        return scotches.Select(ScotchMapper.Map).ToArray();
    }
}