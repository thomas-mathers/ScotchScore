using Azure.Identity;

namespace ScotchScore.Api.Extensions;

public static class ConfigurationManagerExtensions
{
    public static IConfigurationBuilder AddAzureAppConfiguration(this IConfigurationManager configurationBuilder,
        string appConfigurationServiceUrl)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(appConfigurationServiceUrl);

        var appConfigurationServiceEndpoint = new Uri(appConfigurationServiceUrl);
        var appConfigurationCredentials = new DefaultAzureCredential();

        configurationBuilder.AddAzureAppConfiguration(options =>
        {
            options.Connect(appConfigurationServiceEndpoint, appConfigurationCredentials)
                .ConfigureKeyVault(kv => kv.SetCredential(appConfigurationCredentials));
        });

        return configurationBuilder;
    }
}