using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ScotchScore.Contracts
{
    public class ReviewSearchParameters
    {
        [Range(0, int.MaxValue)]
        [DefaultValue(0)]
        public int PageIndex { get; set; }

        [Range(1, 100)]
        [DefaultValue(100)]
        public int PageSize { get; set; } = 100;

        public ReviewSortColumn SortBy { get; set; } = ReviewSortColumn.DateCreated;
        public SortDirection SortDirection { get; set; } = SortDirection.Ascending;
        public string Title { get; set; }
        public string UserId { get; set; }
    }
}