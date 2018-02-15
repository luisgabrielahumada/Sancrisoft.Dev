using Arquitectura.Bussiness.Core.Filter;
using Arquitectura.Bussiness.Core.WebControllers;
using Arquitectura.Bussiness.Task.Rules.Repository.Security;
using Arquitectura.Entity.Model.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinanControl.Api.Controllers
{
    [UnhandledExceptionFilter]
    [AuthorizeUser]
    public class MessagesController : WebApiController
    {
        private readonly IMessages _process;
        public MessagesController(IMessages process)
        {
            _process = process;
        }
        [HttpGet]
        // GET: api/Users
        [AccessUser(Actions.Get)]
        public HttpResponseMessage Get(int PageSize = 5, int PageIndex = 1)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = _process.Get(PageSize, PageIndex)
            });
        }

        [HttpGet]
        // GET: api/Users/5
        [AccessUser(Actions.Get)]
        public HttpResponseMessage Get(Guid id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = _process.Get(id)
            });
        }

        [HttpPost]
        // POST: api/Users
        [AccessUser(Actions.Modify)]
        public HttpResponseMessage Post([FromBody]Message row)
        {
            _process.Insert(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpDelete]
        // DELETE: api/Users/5
        [AccessUser(Actions.Delete)]
        public HttpResponseMessage Remove(Guid id)
        {
            _process.Remove(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
