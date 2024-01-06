using ScotchScore.Domain;

namespace ScotchScore.Application.Scotches.Repositories;

public interface IScotchRepository
{
    Task<IReadOnlyList<Scotch>> GetScotches(string name = "", int pageIndex = 0, int pageSize = 100,
        CancellationToken cancellationToken = default);
    
    Task<Scotch?> GetScotch(Guid scotchId, CancellationToken cancellationToken = default);
}