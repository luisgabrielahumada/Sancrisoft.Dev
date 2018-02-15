using Arquitectura.Core.Helper;
using Process.Entity.Models;
using System;

namespace Process.Services.Task
{
    public interface IUploadFiles
    {
        Guid Insert(UploadFiles item, Guid UpdatedId);
        UploadFiles GetToken(Guid item);
    }
}
