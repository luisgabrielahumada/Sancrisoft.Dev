using Arquitectura.Bussiness.Core.Filter;
using Arquitectura.Bussiness.Core.WebControllers;
using Process.Services.Task;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sancrisoft.Api.Controllers
{
    [UnhandledExceptionFilter]
    [AllowAnonymous]
    public class ChargesController : WebApiController
    {
        private readonly ICharges _process;
        public ChargesController(ICharges process)
        {
            _process = process;
        }
        [HttpGet]
        public HttpResponseMessage Get(int PageSize = 5, int PageIndex = 1)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = _process.Get(PageSize, PageIndex)
            });
        }

    }
}
