using ScotchScore.Domain;

namespace ScotchScore.Application.Scotches.Repositories;

public interface IScotchRepository
{
    Task<IReadOnlyList<Scotch>> GetScotches
    (
        string name = "", 
        int pageIndex = 0, 
        int pageSize = 100,
        string sortBy = nameof(Scotch.Name), 
        string sortDirection = "asc",
        CancellationToken cancellationToken = default
    );
    
    Task<Scotch?> GetScotch(string scotchId, CancellationToken cancellationToken = default);
}