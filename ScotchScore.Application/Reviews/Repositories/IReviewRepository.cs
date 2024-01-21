﻿using ScotchScore.Contracts;
using Review = ScotchScore.Domain.Review;

namespace ScotchScore.Application.Reviews.Repositories;

public interface IReviewRepository
{
    Task<Review?> GetReview(string reviewId, CancellationToken cancellationToken = default);
    
    Task<IReadOnlyList<Review>> GetReviews
    (
        string scotchId,
        ReviewSearchParameters searchParameters,
        CancellationToken cancellationToken = default
    );

    void Add(Review review);
}