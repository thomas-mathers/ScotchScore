using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ScotchScore.Application.Common.Interfaces;
using ScotchScore.Application.Reviews.Repositories;
using ScotchScore.Application.Scotches.Repositories;
using ScotchScore.Infrastructure.Reviews.Repositories;
using ScotchScore.Infrastructure.Scotches.Repositories;

namespace ScotchScore.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection serviceCollection,
        InfrastructureSettings infrastructureSettings)
    {
        serviceCollection.AddDbContext<DatabaseContext>(options =>
        {
            options.UseCosmos(infrastructureSettings.CosmosConnectionString,
                infrastructureSettings.CosmosDatabaseName);
        });
        serviceCollection.AddScoped<IUnitOfWork, UnitOfWork>();
        serviceCollection.AddScoped<IScotchRepository, ScotchRepository>();
        serviceCollection.AddScoped<IReviewRepository, ReviewRepository>();

        return serviceCollection;
    }

    public static IServiceCollection AddInfrastructure(this IServiceCollection serviceCollection,
        IConfiguration configuration)
    {
        var infrastructureSettings = new InfrastructureSettings();

        configuration.Bind(nameof(InfrastructureSettings), infrastructureSettings);

        return serviceCollection.AddInfrastructure(infrastructureSettings);
    }
}