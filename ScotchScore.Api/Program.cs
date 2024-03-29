using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using ScotchScore.Api.Extensions;
using ScotchScore.Application.Extensions;
using ScotchScore.Infrastructure.Extensions;

const string corsPolicyName = "AllowAll";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var configuration = builder.Configuration;

configuration.AddAzureAppConfiguration(configuration["AzureAppConfigurationEndpoint"]);

builder.Services.AddApplication().AddInfrastructure(configuration);

builder.Services.AddControllers()
    .AddJsonOptions(options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });

builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.Authority = configuration["Auth0:Authority"];
        options.Audience = configuration["Auth0:Audience"];
    });

builder.Services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

builder.Services.Configure<MvcOptions>(options =>
{
    options.ModelMetadataDetailsProviders.Add(new SystemTextJsonValidationMetadataProvider());
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName,
        corsPolicyBuilder => { corsPolicyBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(o =>
{
    o.DescribeAllParametersInCamelCase();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(corsPolicyName);
app.UseAuthorization();
app.MapControllers();

app.Run();