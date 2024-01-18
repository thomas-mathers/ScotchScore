using Ardalis.Result;
using ScotchScore.Application.Common.Interfaces;
using ScotchScore.Application.Scotches.Mappers;
using ScotchScore.Application.Scotches.Repositories;
using ScotchScore.Contracts;

namespace ScotchScore.Application.Scotches.Queries;

public class GetScotchQuery
{
    public string ScotchId { get; init; } = string.Empty;
}

public class GetScotchQueryHandler(IScotchRepository scotchRepository)
    : IRequestHandler<GetScotchQuery, Result<Scotch?>>
{
    public async Task<Result<Scotch?>> Handle(GetScotchQuery request, CancellationToken cancellationToken)
    {
        var scotch = await scotchRepository.GetScotch(request.ScotchId, cancellationToken);

        return scotch is null ? null : ScotchMapper.Map(scotch);
    }
}