using Ardalis.Result;
using Ardalis.Result.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScotchScore.Api.ActionFilters;
using ScotchScore.Application.Commands;
using ScotchScore.Application.Common;
using ScotchScore.Application.Queries;
using ScotchScore.Contracts;

namespace ScotchScore.Api.Controllers;

[ApiController]
[Route("[controller]")]
[Consumes("application/json")]
[Produces("application/json")]
public class ScotchesController(
    IRequestHandler<GetScotchQuery, Result<Scotch>> getScotchQueryHandler,
    IRequestHandler<GetScotchesQuery, Result<IReadOnlyList<Scotch>>> getScotchesQueryHandler,
    IRequestHandler<CreateReviewCommand, Result<Review>> createReviewCommandHandler,
    IRequestHandler<GetReviewsQuery, Result<IReadOnlyList<Review>>> getReviewsQueryHandler)
    : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(200)]
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
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<Scotch>> GetScotch([FromRoute] string scotchId,
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

    [Authorize]
    [ClaimsFilter]
    [HttpPost("{scotchId}/reviews")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    public async Task<ActionResult<Review>> CreateReview(string? userId, string? scotchId,
        [FromBody] CreateReviewRequest request,
        CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(userId);
        ArgumentNullException.ThrowIfNull(scotchId);

        var result = await createReviewCommandHandler.Handle
        (
            new CreateReviewCommand
            {
                Description = request.Description,
                Rating = request.Rating,
                ScotchId = scotchId,
                Title = request.Title,
                UserEmail = request.UserEmail,
                UserId = userId,
                UserName = request.UserName,
                UserProfilePictureUrl = request.UserProfilePictureUrl
            },
            cancellationToken
        );

        return result.ToActionResult(this);
    }

    [ClaimsFilter]
    [HttpGet("{scotchId}/reviews")]
    [ProducesResponseType(200)]
    public async Task<ActionResult<IReadOnlyList<Review>>> GetReviews(string? userId, [FromRoute] string scotchId,
        [FromQuery] ReviewSearchParameters searchParameters, CancellationToken cancellationToken)
    {
        var result = await getReviewsQueryHandler.Handle
        (
            new GetReviewsQuery
            {
                UserId = userId,
                ScotchId = scotchId,
                SearchParameters = searchParameters
            },
            cancellationToken
        );

        return result.ToActionResult(this);
    }
}