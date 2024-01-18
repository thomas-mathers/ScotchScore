﻿using System;

namespace ScotchScore.Domain
{
    public class Review
    {
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public string Description { get; set; } = string.Empty;
        public int Downvotes { get; set; } = 0;
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public decimal Rating { get; set; } = 0;
        public string ScotchId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int Upvotes { get; set; } = 0;
        public string UserEmail { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string UserProfilePictureUrl { get; set; } = string.Empty;
    }
}