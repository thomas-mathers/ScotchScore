using ScotchScore.Application.Scotches.Repositories;
using ScotchScore.Domain;

namespace ScotchScore.Application.Scotches.Queries;

public class GetScotchesQuery
{
    public string Name { get; init; } = string.Empty;
    public int PageIndex { get; init; } = 0;
    public int PageSize { get; init; } = 100;
    public string SortBy { get; init; } = nameof(Scotch.Name);
    public string SortDirection { get; init; } = "asc";
}

public class GetScotchesQueryHandler(IScotchRepository scotchRepository)
    : IQueryHandler<GetScotchesQuery, IReadOnlyList<Scotch>>
{
    public async Task<IReadOnlyList<Scotch>> Handle(GetScotchesQuery request, CancellationToken cancellationToken)
    {
        var scotches =
            await scotchRepository.GetScotches(request.Name, request.PageIndex, request.PageSize, request.SortBy,
                request.SortDirection, cancellationToken);

        return scotches;
    }
}