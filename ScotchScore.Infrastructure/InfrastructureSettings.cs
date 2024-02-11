namespace ScotchScore.Infrastructure;

public class InfrastructureSettings
{
    public string CosmosConnectionString { get; init; } = string.Empty;
    public string CosmosDatabaseName { get; init; } = string.Empty;
}