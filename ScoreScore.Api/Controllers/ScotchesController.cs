using Ardalis.Result;
using Ardalis.Result.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using ScotchScore.Application.Common.Interfaces;
using ScotchScore.Application.Reviews.Commands;
using ScotchScore.Application.Reviews.Queries;
using ScotchScore.Application.Scotches.Queries;
using ScotchScore.Contracts;

namespace ScoreScore.Api.Controllers;

[ApiController]
[Route("[controller]")]
[Consumes("application/json")]
[Produces("application/json")]
public class ScotchesController(
    IRequestHandler<GetScotchQuery, Result<Scotch?>> getScotchQueryHandler,
    IRequestHandler<GetScotchesQuery, Result<IReadOnlyList<Scotch>>> getScotchesQueryHandler,
    IRequestHandler<CreateReviewCommand, Result<Review>> createReviewCommandHandler,
    IRequestHandler<GetReviewsQuery, Result<IReadOnlyList<Review>>> getReviewsQueryHandler)
    : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Scotch>>> GetScotches(
        [FromQuery] ScotchSearchParameters searchParameters, CancellationToken cancellationToken)
    {
        var result = await getScotchesQueryHandler.Handle
        (
            new GetScotchesQuery
            {
                SearchParameters = searchParameters
            }, 
            cancellationToken
        );

        return result.ToActionResult(this);
    }

    [HttpGet("{scotchId}")]
    public async Task<ActionResult<Scotch?>> GetScotch([FromRoute] string scotchId, 
        CancellationToken cancellationToken)
    {
        var result = await getScotchQueryHandler.Handle
        (
            new GetScotchQuery
            {
                ScotchId = scotchId
            }, 
            cancellationToken
        );

        return result.ToActionResult(this);
    }

    [HttpPost("{scotchId}/reviews")]
    public async Task<ActionResult<Review>> CreateReview(string scotchId, [FromBody] CreateReviewRequest request,
        CancellationToken cancellationToken)
    {
        var result = await createReviewCommandHandler.Handle
        (
            new CreateReviewCommand
            {
                ScotchId = scotchId,
                Title = request.Title,
                Description = request.Description,
                Rating = request.Rating,
                UserName = request.UserName,
                UserEmail = request.UserEmail
            }, 
            cancellationToken
        );

        return result.ToActionResult(this);
    }

    [HttpGet("{scotchId}/reviews")]
    public async Task<ActionResult<IReadOnlyList<Review>>> GetReviews([FromRoute] string scotchId,
        [FromQuery] ReviewSearchParameters searchParameters, CancellationToken cancellationToken)
    {
        var result = await getReviewsQueryHandler.Handle
        (
            new GetReviewsQuery
            {
                ScotchId = scotchId,
                SearchParameters = searchParameters
            }, 
            cancellationToken
        );

        return result.ToActionResult(this);
    }
}