using ScotchScore.Contracts;
using Scotch = ScotchScore.Domain.Scotch;

namespace ScotchScore.Application.Contracts;

public interface IScotchRepository
{
    Task<IReadOnlyList<Scotch>> GetScotches
    (
        ScotchSearchParameters searchParameters,
        CancellationToken cancellationToken = default
    );

    Task<Scotch?> GetScotch(string scotchId, CancellationToken cancellationToken = default);
}