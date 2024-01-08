using System.Text.Json;
using System.Text.Json.Serialization;
using Azure.Identity;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ScotchScore.Application.Extensions;
using ScotchScore.Infrastructure;
using ScotchScore.Infrastructure.Extensions;

var hostBuilder = new HostBuilder();

var host = hostBuilder
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureAppConfiguration((configurationBuilder) =>
    {
        var settings = configurationBuilder.Build();

        var appConfigurationServiceUrl = settings["AzureAppConfigurationEndpoint"];
        
        if (string.IsNullOrWhiteSpace(appConfigurationServiceUrl))
        {
            throw new Exception("Azure App Configuration Service URL is missing.");
        }

        var appConfigurationServiceEndpoint = new Uri(appConfigurationServiceUrl);
        var appConfigurationCredentials = new DefaultAzureCredential();
        
        configurationBuilder.AddAzureAppConfiguration(options =>
        {
            options.Connect(appConfigurationServiceEndpoint, appConfigurationCredentials)
                   .ConfigureKeyVault(kv => kv.SetCredential(appConfigurationCredentials));
        });
    })
    .ConfigureServices((hostContext, services) =>
    {
        var configuration = hostContext.Configuration;
        
        services.AddAzureAppConfiguration();
        
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();

        services.AddHttpClient();
        
        services.Configure<JsonSerializerOptions>(options =>
        {
            options.AllowTrailingCommas = true;
            options.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.PropertyNameCaseInsensitive = true;
            options.Converters.Add(new JsonStringEnumConverter());
        });
        
        services.AddApplication();
        
        var infrastructureSettings = configuration
            .GetSection("InfrastructureSettings")
            .Get<InfrastructureSettings>();
        
        if (infrastructureSettings is null)
        {
            throw new Exception("Infrastructure settings are missing.");
        }
        
        services.AddInfrastructure(infrastructureSettings);
    })
    .Build();

host.Run();