using Process.Entity.Models;
using Process.Services.Task;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
namespace Arquitectura.Bussiness.Api.Controllers
{
    public class UploadController : ApiController
    {
        private readonly IUploadFiles _process;
        public UploadController(IUploadFiles process)
        {
            _process = process;
        }
        [HttpPost]
        [AllowAnonymous]
        public HttpResponseMessage Post(HttpRequestMessage item)
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            var RQ = HttpContext.Current.Request.QueryString;
            // This illustrates how to get the file names.
            HttpFileCollection _Files = HttpContext.Current.Request.Files;
            for (int i = 0; i <= _Files.Count - 1; i++)
            {

                var filename = _Files[i].FileName;
                Stream fileStream = _Files[i].InputStream;
                var mStreamer = new MemoryStream();
                mStreamer.SetLength(fileStream.Length);
                fileStream.Read(mStreamer.GetBuffer(), 0, (int)fileStream.Length);
                mStreamer.Seek(0, SeekOrigin.Begin);
                byte[] fileBytes = mStreamer.GetBuffer();
                string base64 = Convert.ToBase64String(fileBytes);
                _process.Insert(new UploadFiles { body = base64, name = filename, type = RQ["type"], description = RQ["d"], token = Guid.Parse(RQ["id"]) }, Guid.NewGuid());
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        [AllowAnonymous]
        public HttpResponseMessage GetImg(Guid id)
        {
            var row=_process.GetToken(id);
            return Request.CreateResponse(HttpStatusCode.OK, new
            {
                data = row
            });
        }
    }
}
