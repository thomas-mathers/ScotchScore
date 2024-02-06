using System;
using System.Collections.Generic;

namespace ScotchScore.Domain
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
        
        public void Rate(int rating)
        {
            if (rating < 1 || rating > 5)
            {
                throw new ArgumentOutOfRangeException(nameof(rating), "Rating must be between 1 and 5.");
            }

            RatingCounts[rating - 1]++;
            AverageRating = CalculateRating();
        }

        private decimal CalculateRating()
        {
            var numOfRatings = 0;
            var sumOfRatings = 0;

            for (var i = 0; i < RatingCounts.Length; i++)
            {
                numOfRatings += RatingCounts[i];
                sumOfRatings += (i + 1) * RatingCounts[i];
            }

            return numOfRatings == 0 ? 0 : (decimal) sumOfRatings / numOfRatings;
        }
    }
}