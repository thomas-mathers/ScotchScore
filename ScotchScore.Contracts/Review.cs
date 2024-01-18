using System;

namespace ScotchScore.Contracts
{
    public class Review
    {
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public string Description { get; set; } = string.Empty;
        public int Downvotes { get; set; }
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public decimal Rating { get; set; }
        public string ScotchId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int Upvotes { get; set; }
        public string UserEmail { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string UserProfilePictureUrl { get; set; } = string.Empty;
    }
}