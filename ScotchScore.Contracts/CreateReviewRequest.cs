using System.ComponentModel.DataAnnotations;

namespace ScotchScore.Contracts
{
    public class CreateReviewRequest
    {
        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(0, 5)]
        public int Rating { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string UserEmail { get; set; } = string.Empty;

        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string UserName { get; set; } = string.Empty;
    }
}