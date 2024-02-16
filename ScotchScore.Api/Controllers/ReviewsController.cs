using Ardalis.Result;
using Ardalis.Result.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScotchScore.Api.ActionFilters;
using ScotchScore.Application.Commands;
using ScotchScore.Application.Common;
using ScotchScore.Contracts;

namespace ScotchScore.Api.Controllers;

[ApiController]
[Route("[controller]")]
[Consumes("application/json")]
[Produces("application/json")]
public class ReviewsController(
    IRequestHandler<CreateReviewVoteCommand, Result<ReviewVote>> createReviewCommandHandler,
    IRequestHandler<UpdateReviewVoteCommand, Result<ReviewVote>> updateReviewVoteCommandHandler,
    IRequestHandler<DeleteReviewVoteCommand, Result<bool>> deleteReviewVoteCommandHandler)
    : ControllerBase
{
    [Authorize]
    [ClaimsFilter]
    [HttpPost("{reviewId}/votes")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    public async Task<ActionResult<ReviewVote>> CreateVote(string? userId, string reviewId,
        CreateReviewVoteRequest request,
        CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(userId);

        var result = await createReviewCommandHandler.Handle
        (
            new CreateReviewVoteCommand
            {
                UserId = userId,
                ReviewId = reviewId,
                ReviewVoteType = request.ReviewVoteType
            },
            cancellationToken
        );

        return result.ToActionResult(this);
    }
    
    [Authorize]
    [ClaimsFilter]
    [HttpPut("{reviewId}/votes/{reviewVoteId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(403)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<ReviewVote>> UpdateVote(string? userId, string reviewId, string reviewVoteId,
        UpdateReviewVoteRequest request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(userId);

        var result = await updateReviewVoteCommandHandler.Handle
        (
            new UpdateReviewVoteCommand
            {
                UserId = userId,
                ReviewVoteId = reviewVoteId,
                ReviewVoteType = request.ReviewVoteType
            },
            cancellationToken
        );

        return result.ToActionResult(this);
    }    
    

    [Authorize]
    [ClaimsFilter]
    [HttpDelete("{reviewId}/votes/{reviewVoteId}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(403)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<bool>> DeleteVote(string? userId, string reviewId, string reviewVoteId,
        CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(userId);

        var result = await deleteReviewVoteCommandHandler.Handle
        (
            new DeleteReviewVoteCommand
            {
                UserId = userId,
                ReviewVoteId = reviewVoteId
            },
            cancellationToken
        );

        return result.ToActionResult(this);
    }
}