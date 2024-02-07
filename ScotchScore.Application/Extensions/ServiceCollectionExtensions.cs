using Ardalis.Result;
using Microsoft.Extensions.DependencyInjection;
using ScotchScore.Application.Commands;
using ScotchScore.Application.Common;
using ScotchScore.Application.Queries;
using ScotchScore.Contracts;
using Review = ScotchScore.Contracts.Review;
using Scotch = ScotchScore.Contracts.Scotch;

namespace ScotchScore.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IRequestHandler<CreateReviewCommand, Result<Review>>, CreateReviewCommandHandler>();
        serviceCollection
            .AddScoped<IRequestHandler<GetReviewsQuery, Result<IReadOnlyList<Review>>>, GetReviewsQueryHandler>();
        serviceCollection.AddScoped<IRequestHandler<GetScotchQuery, Result<Scotch>>, GetScotchQueryHandler>();
        serviceCollection
            .AddScoped<IRequestHandler<GetScotchesQuery, Result<IReadOnlyList<Scotch>>>, GetScotchesQueryHandler>();
        serviceCollection
            .AddScoped<IRequestHandler<DownvoteReviewCommand, Result<ReviewVote>>, DownvoteReviewCommandHandler>();
        serviceCollection
            .AddScoped<IRequestHandler<UpvoteReviewCommand, Result<ReviewVote>>, UpvoteReviewCommandHandler>();

        return serviceCollection;
    }
}