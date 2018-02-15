using Arquitectura.Bussiness.Core.Filter;
using Arquitectura.Bussiness.Core.WebControllers;
using Process.Entity.Models;
using Process.Services.Task;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Bussiness.Api.Controllers
{
    [UnhandledExceptionFilter]
    [AuthorizeUser]
    public class SaleOrderItemsController : WebApiController
    {
        private readonly ISaleOrderItem _process;
        public SaleOrderItemsController(ISaleOrderItem process)
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
        public HttpResponseMessage Post([FromBody]SaleOrderItem row)
        {
            _process.Insert(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        [HttpPost]
        [HttpPut]
        // PUT: api/Users/5
        public HttpResponseMessage Put(Guid id, [FromBody]SaleOrderItem row)
        {
            _process.UpdateSingle(id, row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [AccessUser(Actions.Modify)]
        public HttpResponseMessage Bath(Guid id, List<SaleOrderItem> rows)
        {
           _process.UpdateBath(id, rows, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
        [HttpPatch]
        [AccessUser(Actions.Status)]
        public HttpResponseMessage Patch(Guid id, bool Status)
        {
            _process.Delete(id, Status, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
