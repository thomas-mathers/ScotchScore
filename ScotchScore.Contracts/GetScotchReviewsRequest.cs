using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ScotchScore.Contracts
{
    public class GetScotchReviewsRequest
    {
        public string Name { get; set; } = string.Empty;

        [Range(0, int.MaxValue)]
        [DefaultValue(0)]
        public int PageIndex { get; set; }

        [Range(1, 100)] 
        [DefaultValue(100)] 
        public int PageSize { get; set; } = 100;

        public string SortBy { get; set; } = string.Empty;
        public SortDirection SortDirection { get; set; } = SortDirection.Ascending;
    }
}