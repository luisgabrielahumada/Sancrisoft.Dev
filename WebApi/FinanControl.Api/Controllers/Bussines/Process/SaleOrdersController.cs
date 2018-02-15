using Arquitectura.Bussiness.Core.Filter;
using Arquitectura.Bussiness.Core.WebControllers;
using Configuration.Services.Task;
using Process.Entity.Models;
using Process.Services.Task;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Bussiness.Api.Controllers
{
    [UnhandledExceptionFilter]
    [AuthorizeUser]
    public class SaleOrdersController : WebApiController
    {
        private readonly ISaleOrder _process;
        private readonly ICustomer _processCustomer;
        private readonly ISaleOrderItem _processItems;
        public SaleOrdersController(ISaleOrder process, ICustomer processCustomer, ISaleOrderItem processItems)
        {
            _process = process;
            _processCustomer = processCustomer;
            _processItems = processItems;
        }

        [HttpGet]
        [AllowAnonymous]
        [AccessUser(Actions.Get)]
        public HttpResponseMessage OrdersReport()
        {
            var data = _process.OrdersReport();
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = data
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
        [AccessUser(Actions.Edit)]
        public HttpResponseMessage Get(Guid id)
        {
            var order = _process.Get(id);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = order
            });
        }

        [HttpPost]
        [AccessUser(Actions.Modify)]
        public HttpResponseMessage Post([FromBody]SaleOrder row)
        {
            var id = _process.Insert(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = id
            });
        }
        
        [HttpPost]
        [HttpPut]
        // PUT: api/Users/5
        public HttpResponseMessage Put(Guid id, [FromBody]SaleOrder row)
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
