using System;

namespace ScotchScore.Domain
{
    public class ReviewVote
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string ScotchId { get; set; } = string.Empty;
        public string ReviewId { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public ReviewVoteType ReviewVoteType { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}