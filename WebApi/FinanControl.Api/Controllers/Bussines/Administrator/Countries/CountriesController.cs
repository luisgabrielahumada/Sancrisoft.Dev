using Arquitectura.Bussiness.Core.Filter;
using Arquitectura.Bussiness.Core.WebControllers;
using Arquitectura.Bussiness.Task.Rules.Repository.Security;
using Bussiness.Administrator.Task;
using Entity.Model.Administrator.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinanControl.Api.Controllers
{
    [UnhandledExceptionFilter]
    [AuthorizeUser]
    public class CountriesController : WebApiController
    {
        private readonly ICountries _process;
        public CountriesController(ICountries process)
        {
            _process = process;
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
        public HttpResponseMessage Post([FromBody]Country row)
        {
            _process.Insert(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        [HttpPost]
        [HttpPut]
        // PUT: api/Users/5
        public HttpResponseMessage Put(Guid id, [FromBody]Country row)
        {
            _process.Update(id, row, UpdatedId);
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
