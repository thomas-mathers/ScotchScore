using Microsoft.EntityFrameworkCore;
using ScotchScore.Application.Scotches.Repositories;
using ScotchScore.Domain;

namespace ScotchScore.Infrastructure.Scotches.Repositories;

public class ScotchRepository(DatabaseContext databaseContext) : IScotchRepository
{
    public async Task<IReadOnlyList<Scotch>> GetScotches(string name = "", int pageIndex = 0, int pageSize = 100,
        CancellationToken cancellationToken = default)
    {
        var entities = databaseContext.Scotches.AsQueryable();
        
        if (!string.IsNullOrWhiteSpace(name))
        {
            entities = entities.Where(x => x.Name.Contains(name));
        }
        
        var scotches = await entities
            .OrderBy(x => x.Name)
            .Skip(pageIndex * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
        
        return scotches;
    }

    public Task<Scotch?> GetScotch(Guid scotchId, CancellationToken cancellationToken = default)
    {
        return databaseContext.Scotches
            .FirstOrDefaultAsync(x => x.Id == scotchId, cancellationToken);
    }
}