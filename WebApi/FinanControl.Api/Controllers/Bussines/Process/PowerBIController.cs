using Configuration.Entity.Models;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
/*
https://powerbi.microsoft.com/en-us/documentation/powerbi-developer-register-app/
https://support.sapho.com/hc/en-us/articles/115003897125-Getting-Power-BI-Client-ID-and-Secret
https://powerbi.microsoft.com/en-us/documentation/powerbi-developer-authenticate-a-client-app/
https://dev.powerbi.com/apps
https://github.com/Microsoft/PowerBI-CSharp*/
namespace FinanControl.Api.Controllers
{
    [AllowAnonymous]
    public class PowerBIController : ApiController
    {
        const string baseUri = "https://api.powerbi.com/beta/myorg/";
        const string AuthorityUri = "https://login.windows.net/common/oauth2/authorize";
        const string ResourceUri = "https://analysis.windows.net/powerbi/api";
        //string PBIUser = ConfigurationManager.AppSettings["PowerBIUser"].ToString();
        //string PBIPassword = ConfigurationManager.AppSettings["PowerBIPassword"].ToString();
        //string PBIClientId = ConfigurationManager.AppSettings["PowerBIClientId"].ToString();
        [HttpGet]
        public HttpResponseMessage GetReport(string reportName, bool isDashboard, string Workspace, string accessToken)
        {
            try
            {
                WebRequest request;
                if (!isDashboard)
                {
                    request = WebRequest.Create(
                        String.Format("{0}/Reports",
                        baseUri)) as HttpWebRequest;
                }
                else
                {
                    request = WebRequest.Create(
                        String.Format("{0}/Dashboards",
                        baseUri)) as HttpWebRequest;
                }

                request.Method = "GET";
                request.ContentLength = 0;
                request.Headers.Add("Authorization", String.Format("Bearer {0}", accessToken));

                using (var response = request.GetResponse() as HttpWebResponse)
                {
                    using (var reader = new StreamReader(response.GetResponseStream()))
                    {
                        PBIReports Reports = JsonConvert.DeserializeObject<PBIReports>(reader.ReadToEnd());
                        var data = (from p in Reports.value where p.displayName == reportName select p.embedUrl).FirstOrDefault();
                        if (!isDashboard)
                            data = (from p in Reports.value where p.name == reportName select p.embedUrl).FirstOrDefault();

                        return Request.CreateResponse(HttpStatusCode.OK, new
                        {
                            data = data
                        });
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, new
                {
                    data = "Ha ocurrido un error obteniendo el reporte de PowerBI " + ex.Message
                });
            }
        }

        [HttpPost]
        public HttpResponseMessage GetAccessToken(Report item)
        {
            AuthenticationContext authContext = new AuthenticationContext(item.AuthorityUri);
            var token = authContext.AcquireToken(ResourceUri, item.ClientId, new UserCredential(item.UserName, item.Password)).AccessToken;
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = token
            });
        }
    }

    //Power BI Reports used to deserialize the Get Reports response.
    public class PBIReports
    {
        public PBIReport[] value { get; set; }
    }
    public class PBIReport
    {
        public string id { get; set; }
        public string name { get; set; }
        public string webUrl { get; set; }
        public string embedUrl { get; set; }
        public string displayName { get; set; }
    }
}

