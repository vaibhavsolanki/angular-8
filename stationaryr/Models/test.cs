using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace stationaryr.Models
{
    public class test : ActionFilterAttribute
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ISession _session;
        public string Roles { get; set; }
        //public test(IHttpContextAccessor httpContextAccessor)
        //{
        //    _httpContextAccessor = httpContextAccessor;
        //    _session = httpContextAccessor.HttpContext.Session;

        //}
        public test(params string[] roles)
        {
            Roles = String.Join(",", roles);
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var user=context.HttpContext.Session.GetString("user");
            base.OnActionExecuting(context);
        }
    }
}
