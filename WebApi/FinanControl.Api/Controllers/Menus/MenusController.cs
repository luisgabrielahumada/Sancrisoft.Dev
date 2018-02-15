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
    public class MenusController : WebApiController
    {
        private readonly IMenus _process;
        public  IProfilesMenu _processprofilemenu;
        public MenusController(IMenus process, IProfilesMenu processprofilemenu)
        {
            _process = process;
            _processprofilemenu = processprofilemenu;
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
        public HttpResponseMessage Post([FromBody]Menu row)
        {
            _process.Insert(row, UpdatedId);
            _processprofilemenu.ClearCache(item: Session);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [HttpPut]
        [AccessUser(Actions.Modify)]
        public HttpResponseMessage Put(Guid id, [FromBody]Menu row)
        {
            _process.Update(id, row, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }


        [HttpPost]
        [HttpPut]
        //[AccessUser(Actions.Modify)]
        public HttpResponseMessage AddProfileMenu(Guid id, Guid key, [FromBody]ProfileMenu item)
        {
            _processprofilemenu.AddProfileMenu(id, key, item, UpdatedId);
            _processprofilemenu.ClearCache(item: Session);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [HttpPut]
        //[AccessUser(Actions.Modify)]
        public HttpResponseMessage UpdateProfileMenu(Guid id, [FromBody]ProfileMenu item)
        {
            _processprofilemenu.UpdateProfileMenu(id, item, UpdatedId);
            _processprofilemenu.ClearCache(item: Session);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        [AccessUser(Actions.Delete)]
        public HttpResponseMessage RemoveProfileMenu(Guid id)
        {
            _processprofilemenu.RemoveProfileMenu(item: id);
            _processprofilemenu.ClearCache(item: Session);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        [AccessUser(Actions.Modify)]
        public HttpResponseMessage GetProfileMenuID(Guid id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = _processprofilemenu.GetPermissionMenuID(item: id)
            });
        }

        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage MenuOptionSession()
        {
            var result = _process.GetMenus(Session: Session);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = result
            });
        }

        [HttpGet]
        [AccessUser(Actions.Edit)]
        public HttpResponseMessage GetPermissionMenuID(Guid id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = _processprofilemenu.GetPermissionMenuID(id)
            });
        }

        [HttpDelete]
        // DELETE: api/Users/5
        public HttpResponseMessage Remove(Guid id)
        {
            _process.Remove(id);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPatch]
        // DELETE: api/Users/5
        public HttpResponseMessage Patch(Guid id, bool Status)
        {
            _process.Delete(id, Status, UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}
