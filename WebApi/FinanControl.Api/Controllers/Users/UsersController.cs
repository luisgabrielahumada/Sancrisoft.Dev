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
    public class UsersController : WebApiController
    {
        private readonly IUsers _process;
        public UsersController(IUsers process)
        {
            _process = process;
        }
        [HttpGet]
        [AccessUser(Actions.Get)]
        // GET: api/Users
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

        [HttpGet]
        // GET: api/Users/5
        [AccessUser(Actions.Get)]
        public HttpResponseMessage ProfilUser()
        {
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = _process.ProfilUser(Session)
            });
        }

        [HttpPost]
        // POST: api/Users
        [AccessUser(Actions.Modify)]
        public HttpResponseMessage Post([FromBody]User row)
        {
            _process.Insert(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [HttpPut]
        // PUT: api/Users/5
        [AccessUser(Actions.Modify)]
        public HttpResponseMessage Put(Guid id, [FromBody]User row)
        {
            _process.Update(id, row, UpdatedId);
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

        [HttpPatch]
        // DELETE: api/Users/5
        [AccessUser(Actions.Status)]
        public HttpResponseMessage Patch(Guid id, bool Status)
        {
            _process.Delete(id, Status, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
