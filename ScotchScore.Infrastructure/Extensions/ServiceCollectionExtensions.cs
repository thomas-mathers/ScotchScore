using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ScotchScore.Application.Reviews.Repositories;
using ScotchScore.Application.Scotches.Repositories;
using ScotchScore.Infrastructure.Reviews.Repositories;
using ScotchScore.Infrastructure.Scotches.Repositories;

namespace ScotchScore.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddInfrastructure(this IServiceCollection serviceCollection,
        InfrastructureSettings infrastructureSettings)
    {
        serviceCollection.AddDbContext<DatabaseContext>(options =>
        {
            options.UseCosmos(infrastructureSettings.CosmosConnectionString,
                infrastructureSettings.CosmosDatabaseName);
        });
        serviceCollection.AddScoped<IScotchRepository, ScotchRepository>();
        serviceCollection.AddScoped<IReviewRepository, ReviewRepository>();
    }
}