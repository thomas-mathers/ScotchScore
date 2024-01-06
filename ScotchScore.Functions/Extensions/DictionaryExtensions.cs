namespace ScotchScore.Functions.Extensions;

public static class DictionaryExtensions
{
    public static int GetInt(this Dictionary<string, string> dictionary, string key, int defaultValue = 0)
    {
        if (dictionary.TryGetValue(key, out var value) && int.TryParse(value, out var i))
        {
            return i;
        }

        return defaultValue;
    }
}