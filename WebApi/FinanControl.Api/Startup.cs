using Owin;
using Microsoft.Owin;
using Microsoft.AspNet.SignalR;
using Arquirectura.Core.NotificationServer;

[assembly: OwinStartup(typeof(FinanControl.Api.Startup))]
namespace FinanControl.Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR<NotificationHub>("/notificationhub", new ConnectionConfiguration { EnableJSONP = true });
            //app.MapSignalR();
        }
    }
}


