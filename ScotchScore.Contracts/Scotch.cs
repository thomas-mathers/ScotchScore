using System;
using System.Collections.Generic;

namespace ScotchScore.Contracts
{
    public class Scotch
    {
        public int Age { get; set; }
        public decimal Amount { get; set; }
        public decimal AverageRating { get; set; }
        public CurrencyCode Currency { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public string Description { get; set; } = string.Empty;
        public string Distillery { get; set; } = string.Empty;
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public IReadOnlyList<string> Images { get; set; } = Array.Empty<string>();
        public string Name { get; set; } = string.Empty;
        public int[] RatingCounts { get; set; } = new int[5];
        public Region Region { get; set; }
    }
}