using Arquitectura.Bussiness.Core.Filter;
using Arquitectura.Bussiness.Core.WebControllers;
using Arquitectura.Core.Extensions;
using Bussiness.Administrator.Task;
using Entity.Model.Administrator.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinanControl.Api.Controllers
{
    [UnhandledExceptionFilter]
    [AllowAnonymous]
    public class CommonController : WebApiController
    {
        [HttpGet]
        //[AccessUser(Actions.Get)]
        public HttpResponseMessage GetTypeDocuments()
        {
            object result = EnumExtensions.GetEnumListKeyValue<TypeDocument>();
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = result
            });
        }
        public HttpResponseMessage GetStatusOrder()
        {
            object result = EnumExtensions.GetEnumListKeyValue<Orders>();
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = result
            });
        }
        public HttpResponseMessage GetStatusTransaction()
        {
            object result = EnumExtensions.GetEnumListKeyValue<Transaction>();
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = result
            });
        }


        public HttpResponseMessage GetTypeResolution()
        {
            object result = EnumExtensions.GetEnumListKeyValue<TypeResolution>();
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = result
            });
        }

        public HttpResponseMessage GetMonths()
        {
            object result = EnumExtensions.GetEnumListKeyValue<Month>();
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = result
            });
        }

        public HttpResponseMessage GetTypePayment()
        {
            object result = EnumExtensions.GetEnumListKeyValue<TypePayment>();
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = result
            });
        }
    }
}
