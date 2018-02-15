using Arquitectura.Bussiness.Core.Filter;
using Arquitectura.Bussiness.Core.WebControllers;
using Arquitectura.Bussiness.Task.Rules.Repository.Security;
using Process.Entity.Models;
using Process.Services.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sancrisoft.Api.Controllers
{
    [UnhandledExceptionFilter]
    [AllowAnonymous]
    public class InscriptionsController : WebApiController
    {
        private readonly IInscriptions _process;
        public InscriptionsController(IInscriptions process)
        {
            _process = process;
        }
        [HttpPost]
        public HttpResponseMessage Post([FromBody]Inscriptions row)
        {
            var id=_process.Insert(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = id
            });
        }
        [HttpGet]
        [AccessUser(Actions.Get)]
        public HttpResponseMessage Get(int PageSize = 5, int PageIndex = 1)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = _process.Get(PageSize, PageIndex)
            });
        }
        [HttpGet]
        [AccessUser(Actions.Get)]
        public HttpResponseMessage Get(Guid id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = _process.Get(id)
            });
        }
    }
}
