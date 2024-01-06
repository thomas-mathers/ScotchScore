using ScotchScore.Application.Scotches.Repositories;
using ScotchScore.Domain;

namespace ScotchScore.Application.Scotches.Queries;

public class GetScotchQuery
{
    public Guid ScotchId { get; init; }
}

public class GetScotchQueryHandler(IScotchRepository scotchRepository) : IQueryHandler<GetScotchQuery, Scotch?>
{
    public async Task<Scotch?> Handle(GetScotchQuery request, CancellationToken cancellationToken)
    {
        var scotch = await scotchRepository.GetScotch(request.ScotchId, cancellationToken);

        return scotch;
    }
}