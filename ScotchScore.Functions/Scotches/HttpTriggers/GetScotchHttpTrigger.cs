using Microsoft.Azure.Functions.Worker;
using ScotchScore.Application;
using ScotchScore.Application.Scotches.Queries;
using ScotchScore.Domain;

namespace ScotchScore.Functions.Scotches.HttpTriggers;

public class GetScotchHttpTrigger(IQueryHandler<GetScotchQuery, Scotch> queryHandler)
{
    [Function(nameof(GetScotchHttpTrigger))]
    public async Task<Scotch?> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "scotches/{id:Guid}")] 
        Guid id,
        CancellationToken cancellationToken)
    {
        var response = await queryHandler.Handle(new GetScotchQuery { ScotchId = id }, cancellationToken);

        return response;
    }
}