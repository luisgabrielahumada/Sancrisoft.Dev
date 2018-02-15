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
    [AuthorizeUser]
    public class PaymentOrderController : WebApiController
    {
        private readonly IPaymentOrder _process;
        public PaymentOrderController(IPaymentOrder process, ICustomer processCustomer, ISaleOrderItem processItems)
        {
            _process = process;
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

        [HttpPost]
        [AccessUser(Actions.Modify)]
        public HttpResponseMessage Post([FromBody]PaymentOrder row)
        {
            var id = _process.Insert(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = id
            });
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
