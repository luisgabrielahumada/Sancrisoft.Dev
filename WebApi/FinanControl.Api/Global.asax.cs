using Arquitectura.Bussiness.Infrastructure.Database.Context;
using FinanControl.Bussiness.Domine.ServiceLocation;
using System;
using System.Configuration;
using System.Data.Entity;
using System.Web.Http;

namespace FinanControl.Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters.Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);
            NinjectBindingsConfigurator.Start();

            GlobalConfiguration.Configure(WebApiConfig.Register);

            Database.SetInitializer<EntityDBContext>(null);
        }
    }
}
