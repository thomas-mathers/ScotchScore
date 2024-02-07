using System;

namespace ScotchScore.Contracts
{
    public class Review
    {
        public DateTime DateCreated { get; set; }
        public string Description { get; set; }
        public int Downvotes { get; set; }
        public string Id { get; set; }
        public decimal Rating { get; set; }
        public string ScotchId { get; set; }
        public string Title { get; set; }
        public int Upvotes { get; set; }
        public string UserEmail { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string UserProfilePictureUrl { get; set; }
    }
}