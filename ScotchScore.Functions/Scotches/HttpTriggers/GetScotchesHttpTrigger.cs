using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using ScotchScore.Application;
using ScotchScore.Application.Scotches.Queries;
using ScotchScore.Domain;
using ScotchScore.Functions.Extensions;

namespace ScotchScore.Functions.Scotches.HttpTriggers;

public class GetScotchesHttpTrigger(IQueryHandler<GetScotchesQuery, IReadOnlyList<Scotch>> queryHandler)
{
    [Function(nameof(GetScotchesHttpTrigger))]
    public async Task<IReadOnlyList<Scotch>> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "scotches")]
        HttpRequestData request,
        CancellationToken cancellationToken)
    {
        var queryParams = request.Query.ToDictionary();

        var name = queryParams.GetValueOrDefault("name", string.Empty);
        var pageIndex = queryParams.GetInt("pageIndex", 0);
        var pageSize = queryParams.GetInt("pageSize", 100);

        var response = await queryHandler.Handle
        (
            new GetScotchesQuery
            {
                Name = name,
                PageIndex = pageIndex,
                PageSize = pageSize
            },
            cancellationToken
        );

        return response;
    }
}