using System;

namespace ScotchScore.Contracts
{
    public class ReviewVote
    {
        public DateTime DateCreated { get; set; }
        public string Id { get; set; }
        public string ReviewId { get; set; }
        public ReviewVoteType ReviewVoteType { get; set; }
        public string ScotchId { get; set; }
        public string UserId { get; set; }
    }
}