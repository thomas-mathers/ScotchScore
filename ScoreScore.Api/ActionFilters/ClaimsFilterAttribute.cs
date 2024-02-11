using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ScoreScore.Api.ActionFilters;

public class ClaimsFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var userId = context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        context.ActionArguments["userId"] = userId;
    }
}