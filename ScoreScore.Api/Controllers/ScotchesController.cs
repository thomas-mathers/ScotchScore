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
public class ScotchesController(
    IRequestHandler<GetScotchQuery, Result<Scotch?>> getScotchQueryHandler,
    IRequestHandler<GetScotchesQuery, Result<IReadOnlyList<Scotch>>> getScotchesQueryHandler,
    IRequestHandler<CreateReviewCommand, Result<Review>> createReviewCommandHandler,
    IRequestHandler<GetReviewsQuery, Result<IReadOnlyList<Review>>> getReviewsQueryHandler)
    : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Scotch>>> GetScotches([FromQuery] GetScotchesRequest query)
    {
        var getScotchesQuery = new GetScotchesQuery
        {
            Name = query.Name,
            PageIndex = query.PageIndex,
            PageSize = query.PageSize,
            SortBy = query.SortBy,
            SortDirection = query.SortDirection
        };

        var result = await getScotchesQueryHandler.Handle(getScotchesQuery, CancellationToken.None);

        return result.ToActionResult(this);
    }

    [HttpGet("{scotchId}")]
    public async Task<ActionResult<Scotch?>> GetScotch([FromRoute] string scotchId)
    {
        var result =
            await getScotchQueryHandler.Handle(new GetScotchQuery { ScotchId = scotchId }, CancellationToken.None);

        return result.ToActionResult(this);
    }

    [HttpPost("{scotchId}/reviews")]
    public async Task<ActionResult<Review>> CreateReview(string scotchId, [FromBody] CreateReviewRequest request)
    {
        var createReviewCommand = new CreateReviewCommand
        {
            ScotchId = scotchId,
            Title = request.Title,
            Description = request.Description,
            Rating = request.Rating,
            UserName = request.UserName,
            UserEmail = request.UserEmail
        };

        var result = await createReviewCommandHandler.Handle(createReviewCommand, CancellationToken.None);

        return result.ToActionResult(this);
    }

    [HttpGet("{scotchId}/reviews")]
    public async Task<ActionResult<IReadOnlyList<Review>>> GetReviews([FromRoute] string scotchId,
        [FromQuery] GetScotchReviewsRequest request)
    {
        var getReviewsQuery = new GetReviewsQuery
        {
            Name = request.Name,
            ScotchId = scotchId,
            PageIndex = request.PageIndex,
            PageSize = request.PageSize,
            SortBy = request.SortBy,
            SortDirection = request.SortDirection
        };

        var result = await getReviewsQueryHandler.Handle(getReviewsQuery, CancellationToken.None);

        return result.ToActionResult(this);
    }
}