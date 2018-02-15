using Arquitectura.Bussiness.Core.Filter;
using System.Web.Http;

namespace FinanControl.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Filters.Add(new UnhandledExceptionFilterAttribute());
            config.Filters.Add(new AuthorizeUserAttribute());
            config.Routes.MapHttpRoute(
                                        name: "DefaultApi",
                                        routeTemplate: "api/{controller}/{action}/{id}",
                                        defaults: new { id = RouteParameter.Optional }
                                    );

            config.Routes.MapHttpRoute(name: "DefaultApi_01",
                                        routeTemplate: "api/{controller}/{action}/{id}/{key}",
                                        defaults: new {id = RouteParameter.Optional, key = RouteParameter.Optional });
        }
    }
}
