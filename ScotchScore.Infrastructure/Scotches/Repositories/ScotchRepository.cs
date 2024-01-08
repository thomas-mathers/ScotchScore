using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ScotchScore.Application.Scotches.Repositories;
using ScotchScore.Domain;

namespace ScotchScore.Infrastructure.Scotches.Repositories;

public class ScotchRepository(DatabaseContext databaseContext) : IScotchRepository
{
    private static Dictionary<string, Expression<Func<Scotch, object>>> SortByMapping { get; } = new(StringComparer.CurrentCultureIgnoreCase)
    {
        [nameof(Scotch.Name)] = scotch => scotch.Name,
        [nameof(Scotch.Region)] = scotch => scotch.Region,
        [nameof(Scotch.Age)] = scotch => scotch.Age,
        [nameof(Scotch.Amount)] = scotch => scotch.Amount,
    };
    
    public async Task<IReadOnlyList<Scotch>> GetScotches
    (
        string name = "", 
        int pageIndex = 0, 
        int pageSize = 100,
        string sortBy = nameof(Scotch.Name), 
        string sortDirection = "asc",
        CancellationToken cancellationToken = default
    )
    {
        var query = databaseContext.Scotches.AsQueryable();
        
        if (SortByMapping.TryGetValue(sortBy, out var keySelector))
        {
            query = sortDirection == "asc"
                ? query.OrderBy(keySelector)
                : query.OrderByDescending(keySelector);
        }
        else
        {
            query = sortDirection == "asc"
                ? query.OrderBy(x => x.Name)
                : query.OrderByDescending(x => x.Name);
        }

        if (!string.IsNullOrWhiteSpace(name))
        {
            query = query.Where(x => x.Name.Contains(name, StringComparison.CurrentCultureIgnoreCase));
        }
        
        var scotches = await query
            .Skip(pageIndex * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return scotches;
    }

    public Task<Scotch?> GetScotch(string scotchId, CancellationToken cancellationToken = default)
    {
        return databaseContext.Scotches
            .FirstOrDefaultAsync(x => x.Id == scotchId, cancellationToken);
    }
}