using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
using ScotchScore.Application.Mappers;
using Review = ScotchScore.Contracts.Review;

namespace ScotchScore.Application.Commands;

public class CreateReviewCommand
{
    public string Description { get; init; } = string.Empty;
    public int Rating { get; init; }
    public string ScotchId { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string UserEmail { get; init; } = string.Empty;
    public string UserId { get; init; } = string.Empty;
    public string UserName { get; init; } = string.Empty;
    public string UserProfilePictureUrl { get; init; } = string.Empty;
}

public class CreateReviewCommandHandler(
    IScotchRepository scotchRepository,
    IReviewRepository reviewRepository,
    IUnitOfWork unitOfWork)
    : IRequestHandler<CreateReviewCommand, Result<Review>>
{
    public async Task<Result<Review>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
    {
        var scotch = await scotchRepository.GetScotch(request.ScotchId, cancellationToken);

        if (scotch is null)
        {
            return Result<Review>.NotFound();
        }
        
        var existingReview = await reviewRepository.GetReview(request.ScotchId, request.UserId, cancellationToken);
        
        if (existingReview is not null)
        {
            return Result<Review>.Conflict();
        }

        var review = new Domain.Review
        {
            Description = request.Description,
            Rating = request.Rating,
            ScotchId = request.ScotchId,
            Title = request.Title,
            UserEmail = request.UserEmail,
            UserId = request.UserId,
            UserName = request.UserName,
            UserProfilePictureUrl = request.UserProfilePictureUrl
        };

        reviewRepository.Add(review);

        scotch.Rate(request.Rating);

        await unitOfWork.Commit(cancellationToken);

        var reviewDto = ReviewMapper.Map(review);

        return reviewDto;
    }
}