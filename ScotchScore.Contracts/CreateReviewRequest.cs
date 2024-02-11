using System.ComponentModel.DataAnnotations;

namespace ScotchScore.Contracts
{
    public class CreateReviewRequest
    {
        [Required]
        public string Description { get; set; }

        [Required]
        [Range(0, 5)]
        public int Rating { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        [EmailAddress]
        public string UserEmail { get; set; }

        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string UserName { get; set; }

        [Required]
        public string UserProfilePictureUrl { get; set; }
    }
}