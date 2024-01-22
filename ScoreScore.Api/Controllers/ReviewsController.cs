using Ardalis.Result;
using Ardalis.Result.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using ScotchScore.Application.Commands;
using ScotchScore.Application.Common;
using ScotchScore.Contracts;

namespace ScoreScore.Api.Controllers;

[ApiController]
[Route("[controller]")]
[Consumes("application/json")]
[Produces("application/json")]
public class ReviewsController(
    IRequestHandler<UpvoteReviewCommand, Result<Review>> upvoteReviewCommandHandler,
    IRequestHandler<DownvoteReviewCommand, Result<Review>> downvoteReviewCommandHandler)
    : ControllerBase
{
    [HttpPost("{reviewId}/upvote")]
    public async Task<ActionResult<Review>> Upvote(string reviewId, CancellationToken cancellationToken)
    {
        var result = await upvoteReviewCommandHandler.Handle
        (
            new UpvoteReviewCommand
            {
                ReviewId = reviewId
            },
            cancellationToken
        );

        return result.ToActionResult(this);
    }
    
    [HttpPost("{reviewId}/downvote")]
    public async Task<ActionResult<Review>> Downvote(string reviewId, CancellationToken cancellationToken)
    {
        var result = await downvoteReviewCommandHandler.Handle
        (
            new DownvoteReviewCommand
            {
                ReviewId = reviewId
            },
            cancellationToken
        );

        return result.ToActionResult(this);
    }
}