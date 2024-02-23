using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using ScotchScore.Application.Contracts;
using ScotchScore.Contracts;
using Scotch = ScotchScore.Domain.Scotch;

namespace ScotchScore.Infrastructure.Repositories;

public class ScotchRepository(DatabaseContext databaseContext) : IScotchRepository
{
    private static Dictionary<ScotchSortColumn, Expression<Func<Scotch, object>>> SortByMapping { get; } =
        new()
        {
            [ScotchSortColumn.Name] = scotch => scotch.Name,
            [ScotchSortColumn.Distillery] = scotch => scotch.Distillery,
            [ScotchSortColumn.Region] = scotch => scotch.Region,
            [ScotchSortColumn.Age] = scotch => scotch.Age,
            [ScotchSortColumn.Amount] = scotch => scotch.Amount,
            [ScotchSortColumn.AverageRating] = scotch => scotch.AverageRating,
            [ScotchSortColumn.DateCreated] = scotch => scotch.DateCreated
        };

    public async Task<Page<Scotch>> GetScotches
    (
        ScotchSearchParameters searchParameters,
        CancellationToken cancellationToken = default
    )
    {
        var query = databaseContext.Scotches.AsQueryable();

        if (SortByMapping.TryGetValue(searchParameters.SortBy, out var keySelector))
        {
            query = searchParameters.SortDirection == SortDirection.Ascending
                ? query.OrderBy(keySelector)
                : query.OrderByDescending(keySelector);
        }
        else
        {
            query = searchParameters.SortDirection == SortDirection.Ascending
                ? query.OrderBy(x => x.Name)
                : query.OrderByDescending(x => x.Name);
        }

        if (!string.IsNullOrWhiteSpace(searchParameters.Name))
        {
            query = query.Where(x => x.Name.Contains(searchParameters.Name, StringComparison.OrdinalIgnoreCase));
        }
        
        var totalScotches = await query.CountAsync(cancellationToken);

        var scotches = await query
            .Skip(searchParameters.PageIndex * searchParameters.PageSize)
            .Take(searchParameters.PageSize)
            .ToArrayAsync(cancellationToken);

        return new Page<Scotch>(searchParameters.PageIndex, searchParameters.PageSize, totalScotches, scotches);
    }

    public Task<Scotch?> GetScotch(string scotchId, CancellationToken cancellationToken = default)
    {
        return databaseContext.Scotches
            .FirstOrDefaultAsync(x => x.Id == scotchId, cancellationToken);
    }
}