using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
using ScotchScore.Application.Mappers;
using ScotchScore.Contracts;

namespace ScotchScore.Application.Queries;

public class GetScotchQuery
{
    public string ScotchId { get; init; } = string.Empty;
}

public class GetScotchQueryHandler(IScotchRepository scotchRepository)
    : IRequestHandler<GetScotchQuery, Result<Scotch>>
{
    public async Task<Result<Scotch>> Handle(GetScotchQuery request, CancellationToken cancellationToken)
    {
        var scotch = await scotchRepository.GetScotch(request.ScotchId, cancellationToken);
        
        if (scotch is null)
        {
            return Result<Scotch>.NotFound();
        }
        
        return ScotchMapper.Map(scotch);
    }
}