using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ScotchScore.Contracts
{
    public class ScotchSearchParameters
    {
        public string Name { get; set; }

        [Range(0, int.MaxValue)]
        [DefaultValue(0)]
        public int PageIndex { get; set; }

        [Range(1, 100)]
        [DefaultValue(100)]
        public int PageSize { get; set; } = 100;

        public ScotchSortColumn SortBy { get; set; } = ScotchSortColumn.Name;
        public SortDirection SortDirection { get; set; } = SortDirection.Ascending;
    }
}