using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using ScotchScore.Application;
using ScotchScore.Application.Reviews.Queries;
using ScotchScore.Domain;
using ScotchScore.Functions.Extensions;

namespace ScotchScore.Functions.Reviews.HttpTriggers;

public class GetReviewsHttpTrigger(IQueryHandler<GetReviewsQuery, IReadOnlyList<Review>> queryHandler)
{
    [Function(nameof(GetReviewsHttpTrigger))]
    public async Task<IReadOnlyList<Review>> Run(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "scotches/{scotchId:Guid}/reviews")]
        HttpRequestData request,
        Guid scotchId,
        CancellationToken cancellationToken)
    {
        var queryParams = request.Query.ToDictionary();

        var pageIndex = queryParams.GetInt("pageIndex", 0);
        var pageSize = queryParams.GetInt("pageSize", 100);
        
        var response = await queryHandler.Handle
        (
            new GetReviewsQuery
            {
                ScotchId = scotchId,
                PageIndex = pageIndex,
                PageSize = pageSize
            }, 
            cancellationToken
        );

        return response;
    }
}