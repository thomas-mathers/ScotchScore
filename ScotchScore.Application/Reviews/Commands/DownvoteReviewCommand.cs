using Ardalis.Result;
using ScotchScore.Application.Common.Interfaces;
using ScotchScore.Application.Reviews.Mappers;
using ScotchScore.Application.Reviews.Repositories;
using ScotchScore.Contracts;

namespace ScotchScore.Application.Reviews.Commands;

public class DownvoteReviewCommand
{
    public string ReviewId { get; init; } = string.Empty;
}

public class DownvoteReviewCommandHandler(IReviewRepository reviewRepository, IUnitOfWork unitOfWork)
    : IRequestHandler<DownvoteReviewCommand, Result<Review>>
{
    public async Task<Result<Review>> Handle(DownvoteReviewCommand request, CancellationToken cancellationToken)
    {
        var review = await reviewRepository.GetReview(request.ReviewId, cancellationToken);

        if (review is null)
        {
            return Result<Review>.NotFound();
        }
        
        review.Downvotes++;

        await unitOfWork.Commit(cancellationToken);

        var reviewDto = ReviewMapper.Map(review);

        return reviewDto;
    }
}