using ScotchScore.Contracts;

namespace ScotchScore.Application.Extensions;

public static class PageExtensions
{
    public static Page<TDestination> Map<TSource, TDestination>
    (
        this Page<TSource> source,
        Func<TSource, TDestination> map
    )
    {
        return new Page<TDestination>
        (
            source.PageIndex, 
            source.PageSize, 
            source.TotalRecords,
            source.Records.Select(map).ToArray()
        );
    }
}