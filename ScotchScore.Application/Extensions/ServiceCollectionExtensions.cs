using Microsoft.Extensions.DependencyInjection;
using ScotchScore.Application.Reviews.Queries;
using ScotchScore.Application.Scotches.Queries;
using ScotchScore.Domain;

namespace ScotchScore.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddApplication(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IQueryHandler<GetReviewsQuery, IReadOnlyList<Review>>, GetReviewsQueryHandler>();
        serviceCollection.AddScoped<IQueryHandler<GetScotchesQuery, IReadOnlyList<Scotch>>, GetScotchesQueryHandler>();
    }
}