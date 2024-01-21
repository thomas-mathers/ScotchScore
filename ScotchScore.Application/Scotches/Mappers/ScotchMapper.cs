using ScotchScore.Contracts;
using Scotch = ScotchScore.Contracts.Scotch;

namespace ScotchScore.Application.Scotches.Mappers;

public static class ScotchMapper
{
    public static Scotch Map(Domain.Scotch scotch)
    {
        return new Scotch
        {
            Id = scotch.Id,
            Name = scotch.Name,
            Description = scotch.Description,
            Distillery = scotch.Distillery,
            Region = Map(scotch.Region),
            Age = scotch.Age,
            Amount = scotch.Amount,
            Currency = Map(scotch.Currency),
            Images = scotch.Images,
            RatingCounts = scotch.RatingCounts,
            AverageRating = scotch.AverageRating,
            DateCreated = scotch.DateCreated
        };
    }

    private static CurrencyCode Map(Domain.CurrencyCode currencyCode)
    {
        return currencyCode switch
        {
            Domain.CurrencyCode.CAD => CurrencyCode.CAD,
            _ => throw new ArgumentOutOfRangeException(nameof(currencyCode), currencyCode, null)
        };
    }

    private static Region Map(Domain.Region region)
    {
        return region switch
        {
            Domain.Region.Highland => Region.Highland,
            Domain.Region.Island => Region.Island,
            Domain.Region.Islay => Region.Islay,
            Domain.Region.Lowland => Region.Lowland,
            Domain.Region.Speyside => Region.Speyside,
            _ => throw new ArgumentOutOfRangeException(nameof(region), region, null)
        };
    }
}