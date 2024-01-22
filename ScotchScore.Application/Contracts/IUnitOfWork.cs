namespace ScotchScore.Application.Contracts;

public interface IUnitOfWork
{
    Task<int> Commit(CancellationToken cancellationToken = default);
}