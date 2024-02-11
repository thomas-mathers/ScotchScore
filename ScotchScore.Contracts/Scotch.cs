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
        public DateTime DateCreated { get; set; }
        public string Description { get; set; }
        public string Distillery { get; set; }
        public string Id { get; set; }
        public IReadOnlyList<string> Images { get; set; }
        public string Name { get; set; }
        public int[] RatingCounts { get; set; }
        public Region Region { get; set; }
    }
}