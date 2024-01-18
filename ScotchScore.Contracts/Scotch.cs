using System;
using System.Collections.Generic;

namespace ScotchScore.Contracts
{
    public class Scotch
    {
        public int Age { get; set; }
        public decimal Amount { get; set; }
        public CurrencyCode Currency { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public string Description { get; set; } = string.Empty;
        public string Distillery { get; set; } = string.Empty;
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public IReadOnlyList<string> Images { get; set; } = Array.Empty<string>();
        public string Name { get; set; } = string.Empty;
        public int NumberOfFiveStarReviews { get; set; }
        public int NumberOfFourStarReviews { get; set; }
        public int NumberOfNegativeRecommendations { get; set; }
        public int NumberOfOneStarReviews { get; set; }
        public int NumberOfPositiveRecommendations { get; set; }
        public int NumberOfThreeStarReviews { get; set; }
        public int NumberOfTwoStarReviews { get; set; }
        public Region Region { get; set; }
    }
}