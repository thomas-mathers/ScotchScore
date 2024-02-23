using System;
using System.Collections.Generic;

namespace ScotchScore.Contracts
{
    public class Page<T>
    {
        public int PageIndex { get; }
        public int PageSize { get; }
        public int TotalPages => PageSize == 0 ? 0 : (TotalRecords + PageSize - 1) / PageSize;
        public int TotalRecords { get; }
        public IReadOnlyList<T> Records { get; }
        
        public Page(int pageIndex, int pageSize, int totalRecords, IReadOnlyList<T> records)
        {
            if (pageIndex < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(pageIndex), "Page index cannot be negative.");
            }
            
            if (pageSize < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(pageSize), "Page size cannot be negative.");
            }
            
            if (totalRecords < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(totalRecords), "Total records cannot be negative.");
            }
            
            if (records is null)
            {
                throw new ArgumentNullException(nameof(records));
            }
            
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalRecords = totalRecords;
            Records = records;
        }
    }
}