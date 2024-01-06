namespace ScotchScore.Application;

public interface IQueryHandler<TRequest, TResponse>
{
    Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
}