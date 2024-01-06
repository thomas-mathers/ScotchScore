using System.Collections.Specialized;

namespace ScotchScore.Functions.Extensions;

public static class NameValueCollectionExtensions
{
    public static Dictionary<string, string> ToDictionary(this NameValueCollection collection)
    {
        return collection.AllKeys.ToDictionary(key => key, key => collection[key]);
    }
}