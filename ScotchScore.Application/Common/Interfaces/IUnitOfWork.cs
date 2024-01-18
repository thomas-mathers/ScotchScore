namespace ScotchScore.Application.Common.Interfaces;

public interface IUnitOfWork
{
    Task<int> Commit(CancellationToken cancellationToken = default);
}