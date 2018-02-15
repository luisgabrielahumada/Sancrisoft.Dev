using Arquitectura.Bussiness.Core.Filter;
using Arquitectura.Bussiness.Core.WebControllers;
using Process.Entity.Models;
using Process.Services.Task;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinanControl.Api.Controllers
{
    [UnhandledExceptionFilter]
    [AuthorizeUser]
    public class BalanceController : WebApiController
    {
        private readonly IBalanceSheet _process;
        public BalanceController(IBalanceSheet process)
        {
            _process = process;
        }
        [HttpGet]
        [AccessUser(Actions.Get)]
        public HttpResponseMessage Get(int month, int year)
        {
            var data = _process.Balance(month, year, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = data
            });
        }
        [HttpGet]
        [AccessUser(Actions.Get)]
        public HttpResponseMessage BalanceOfMonth()
        {
            var data = _process.BalanceOfMonth(UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = data
            });
        }
        [HttpGet]
        [AccessUser(Actions.Get)]
        public HttpResponseMessage BalanceMonthPayment()
        {
            var data = _process.BalanceMonthPayment(UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = data
            });
        }
        [HttpGet]
        [AccessUser(Actions.Get)]
        public HttpResponseMessage GetYear()
        {
            var data = _process.YearBalance(UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = data
            });
        }
        [HttpPost]
        [HttpPut]
        [AccessUser(Actions.Other)]
        public HttpResponseMessage Apply(BalanceSheet row)
        {
            _process.Apply(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [HttpPut]
        [AccessUser(Actions.Other)]
        public HttpResponseMessage Rejected(BalanceSheet row)
        {
            _process.Rejected(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [HttpPut]
        [AccessUser(Actions.Other)]
        public HttpResponseMessage Delete(BalanceSheet row)
        {
            _process.Delete(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [HttpPut]
        [AccessUser(Actions.Other)]
        public HttpResponseMessage Lock(BalanceSheet row)
        {
            _process.Lock(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [HttpPut]
        [AccessUser(Actions.Other)]
        public HttpResponseMessage UnLock(BalanceSheet row)
        {
            _process.UnLock(row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
