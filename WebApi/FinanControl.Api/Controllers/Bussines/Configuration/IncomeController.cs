using Arquirectura.Helper.Core.NotificationServer;
using Arquitectura.Bussiness.Core.Filter;
using Arquitectura.Bussiness.Core.WebControllers;
using Configuration.Entity.Models;
using Configuration.Services.Task;
using Microsoft.AspNet.SignalR;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinanControl.Api.Controllers
{
    [UnhandledExceptionFilter]
    [AuthorizeUser]
    public class IncomeController : WebApiController
    {
        private readonly IIncome _process;
        public IncomeController(IIncome process)
        {
            _process = process;
        }
        [HttpGet]
        [AccessUser(Actions.Get)]
        public HttpResponseMessage Get(int PageSize = 5, int PageIndex = 1)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = _process.Get(PageSize, PageIndex,UpdatedId)
            });
        }
        [HttpGet]
        [AccessUser(Actions.Edit)]
        public HttpResponseMessage Get(Guid id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = _process.Get(id)
            });
        }

        [HttpPost]
        [AccessUser(Actions.Modify)]
        public HttpResponseMessage Post([FromBody]Income row)
        {
            var key = _process.Insert(row, UpdatedId);
            //var item = _process.Get(key);
            //Notifications.NotifyClientActivity(item, TypeNotifications.Notifications, $"+ {item.Name}", HttpStatusCode.OK);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                id = key
            }); ;
        }
        [HttpPost]
        [HttpPut]
        // PUT: api/Users/5
        public HttpResponseMessage Put(Guid id, [FromBody]Income row)
        {
            _process.Update(id, row, UpdatedId);
            //var item = _process.Get(id);
            //Notifications.NotifyClientActivity(item, TypeNotifications.Notifications, $"Act {item.Name}", HttpStatusCode.OK);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        [HttpPatch]
        [AccessUser(Actions.Status)]
        public HttpResponseMessage Patch(Guid id, bool Status)
        {
            _process.Delete(id, Status, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpDelete]
        [AccessUser(Actions.Delete)]
        public HttpResponseMessage Remove(Guid id)
        {
            _process.Remove(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
