using ScotchScore.Application.Common.Interfaces;

namespace ScotchScore.Infrastructure;

public class UnitOfWork(DatabaseContext databaseContext) : IUnitOfWork
{
    public Task<int> Commit(CancellationToken cancellationToken = default)
    {
        return databaseContext.SaveChangesAsync(cancellationToken);
    }
}