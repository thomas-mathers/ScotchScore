using Ardalis.Result;
using ScotchScore.Application.Common.Interfaces;
using ScotchScore.Application.Reviews.Mappers;
using ScotchScore.Application.Reviews.Repositories;
using Review = ScotchScore.Contracts.Review;

namespace ScotchScore.Application.Reviews.Commands;

public class CreateReviewCommand
{
    public string Description { get; init; } = string.Empty;
    public decimal Rating { get; init; }
    public string ScotchId { get; init; } = string.Empty;
    public string Title { get; init; } = string.Empty;
    public string UserEmail { get; init; } = string.Empty;
    public string UserName { get; init; } = string.Empty;
}

public class CreateReviewCommandHandler(IReviewRepository reviewRepository, IUnitOfWork unitOfWork)
    : IRequestHandler<CreateReviewCommand, Result<Review>>
{
    public async Task<Result<Review>> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
    {
        var review = new Domain.Review
        {
            ScotchId = request.ScotchId,
            Title = request.Title,
            Description = request.Description,
            Rating = request.Rating,
            UserName = request.UserName,
            UserEmail = request.UserEmail
        };

        reviewRepository.Add(review);

        await unitOfWork.Commit(cancellationToken);

        var reviewDto = ReviewMapper.Map(review);

        return reviewDto;
    }
}