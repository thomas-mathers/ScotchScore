using System;

namespace ScotchScore.Domain
{
    public class Review
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string ScotchId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string UserProfilePictureUrl { get; set; } = string.Empty;
        public int Upvotes { get; set; }
        public int Downvotes { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}