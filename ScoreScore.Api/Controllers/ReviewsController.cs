using Ardalis.Result;
using Ardalis.Result.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScoreScore.Api.ActionFilters;
using ScotchScore.Application.Commands;
using ScotchScore.Application.Common;
using ScotchScore.Contracts;

namespace ScoreScore.Api.Controllers;

[ApiController]
[Route("[controller]")]
[Consumes("application/json")]
[Produces("application/json")]
public class ReviewsController(
    IRequestHandler<UpvoteReviewCommand, Result<ReviewVote>> upvoteReviewCommandHandler,
    IRequestHandler<DownvoteReviewCommand, Result<ReviewVote>> downvoteReviewCommandHandler)
    : ControllerBase
{
    [Authorize]
    [ClaimsFilter]
    [HttpPost("{reviewId}/upvote")]
    public async Task<ActionResult<ReviewVote>> Upvote(string? userId, string reviewId, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(userId);

        var result = await upvoteReviewCommandHandler.Handle
        (
            new UpvoteReviewCommand
            {
                UserId = userId,
                ReviewId = reviewId
            },
            cancellationToken
        );

        return result.ToActionResult(this);
    }

    [Authorize]
    [ClaimsFilter]
    [HttpPost("{reviewId}/downvote")]
    public async Task<ActionResult<ReviewVote>> Downvote(string? userId, string reviewId,
        CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(userId);

        var result = await downvoteReviewCommandHandler.Handle
        (
            new DownvoteReviewCommand
            {
                UserId = userId,
                ReviewId = reviewId
            },
            cancellationToken
        );

        return result.ToActionResult(this);
    }
}