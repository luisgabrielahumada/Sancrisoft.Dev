using Arquitectura.Core.Helper;
using System;
using Process.Entity.Models;
namespace Process.Services.Task
{
    public interface IResolution
    {
        void Update(Guid id, Resolution item, Guid UpdatedId);
        void Insert(Resolution item, Guid UpdatedId);
        void Remove(Guid item);
        void Delete(Guid item, bool Status, Guid UpdatedId);
        Resolution Get(Guid item);
        PagerRecord<Resolution> Get(int PageSize, int PageNumber);
    }
}
