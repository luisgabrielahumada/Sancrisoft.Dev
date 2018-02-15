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
    public class AuthController : WebApiController
    {
        private readonly IAuth _process;
        public AuthController(IAuth process)
        {
            _process = process;
        }
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage Login([FromBody]User item)
        {
            var result = _process.Login(UserName: item.UserName, Password: item.Password);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = result
            });
        }

        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage SignOut(Guid id)
        {
            _process.SignOut(Session: Session);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage RefreshToken([FromBody]User item)
        {
            var data = _process.RefreshToken(UserName: item.UserName, Session: Session);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                result= data
            });
        }

        [HttpGet]
        public HttpResponseMessage ResetPassword()
        {
            _process.ResetPassword(Session: Session, UpdatedId: UpdatedId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [AccessUser(Actions.Modify)]
        public HttpResponseMessage ChangePassword([FromBody]ViewUsers item)
        {
            _process.ChangePassword(item.UserName, item.PasswordOld, item.NewPassword, item.ConfirmPassword, UpdatedId);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage RecoveryPassword([FromBody]User item)
        {
            // Database.CurrentCnn.As<IAppDatabase>().SS_Users_RecoveryPassword(ds_email: item.ds_email, id_updated: UserlogonId);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpPost]
        [AllowAnonymous]
        // POST: api/Countries
        public HttpResponseMessage RegisterUser([FromBody]ViewUsers item)
        {
            _process.RegisterUser(item.UserName, item.NewPassword, item.Email, item.FirstName, item.LastName);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
