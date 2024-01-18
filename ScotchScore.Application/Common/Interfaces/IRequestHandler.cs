namespace ScotchScore.Application.Common.Interfaces;

public interface IRequestHandler<in TRequest, TResponse>
{
    Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
}