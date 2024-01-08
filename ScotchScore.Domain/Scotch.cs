using System;
using System.Collections.Generic;

namespace ScotchScore.Domain
{
    public class Scotch
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Distillery { get; set; } = string.Empty;
        public Region Region { get; set; }
        public int Age { get; set; }
        public decimal Amount { get; set; }
        public CurrencyCode Currency { get; set; }
        public IReadOnlyList<string> Images { get; set; } = Array.Empty<string>();
        public int NumberOfOneStarReviews { get; set; }
        public int NumberOfTwoStarReviews { get; set; }
        public int NumberOfThreeStarReviews { get; set; }
        public int NumberOfFourStarReviews { get; set; }
        public int NumberOfFiveStarReviews { get; set; }
        public int NumberOfPositiveRecommendations { get; set; }
        public int NumberOfNegativeRecommendations { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}