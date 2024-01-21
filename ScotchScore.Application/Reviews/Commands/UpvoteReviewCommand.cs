using Ardalis.Result;
using ScotchScore.Application.Common.Interfaces;
using ScotchScore.Application.Reviews.Mappers;
using ScotchScore.Application.Reviews.Repositories;
using ScotchScore.Contracts;

namespace ScotchScore.Application.Reviews.Commands;

public class UpvoteReviewCommand
{
    public string ReviewId { get; init; } = string.Empty;
}

public class UpvoteReviewCommandHandler(IReviewRepository reviewRepository, IUnitOfWork unitOfWork)
    : IRequestHandler<UpvoteReviewCommand, Result<Review>>
{
    public async Task<Result<Review>> Handle(UpvoteReviewCommand request, CancellationToken cancellationToken)
    {
        var review = await reviewRepository.GetReview(request.ReviewId, cancellationToken);

        if (review is null)
        {
            return Result<Review>.NotFound();
        }
        
        review.Upvotes++;

        await unitOfWork.Commit(cancellationToken);

        var reviewDto = ReviewMapper.Map(review);

        return reviewDto;
    }
}