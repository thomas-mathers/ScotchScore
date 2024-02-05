using Ardalis.Result;
using ScotchScore.Application.Common;
using ScotchScore.Application.Contracts;
using ScotchScore.Application.Mappers;
using ScotchScore.Domain;
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

        Rate(scotch, request.Rating);

        await unitOfWork.Commit(cancellationToken);

        var reviewDto = ReviewMapper.Map(review);

        return reviewDto;
    }

    private static void Rate(Scotch scotch, int rating)
    {
        if (rating is < 1 or > 5)
        {
            throw new ArgumentOutOfRangeException(nameof(rating), "Rating must be between 1 and 5");
        }

        scotch.RatingCounts[rating - 1]++;
        scotch.AverageRating = CalculateRating(scotch);
    }

    private static decimal CalculateRating(Scotch scotch)
    {
        var numOfRatings = 0;
        var sumOfRatings = 0;

        for (var i = 0; i < scotch.RatingCounts.Length; i++)
        {
            numOfRatings += scotch.RatingCounts[i];
            sumOfRatings += (i + 1) * scotch.RatingCounts[i];
        }

        return numOfRatings == 0 ? 0 : (decimal)sumOfRatings / numOfRatings;
    }
}