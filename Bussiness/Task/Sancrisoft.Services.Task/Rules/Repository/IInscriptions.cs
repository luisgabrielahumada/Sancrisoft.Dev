using Arquitectura.Core.Helper;
using Process.Entity.Models;
using System;

namespace Process.Services.Task
{
    public interface IInscriptions
    {
        void Update(Guid id, Inscriptions item, Guid UpdatedId);
        Guid Insert(Inscriptions item, Guid UpdatedId);
        Inscriptions Get(Guid item);
        PagerRecord<Inscriptions> Get(int PageSize, int PageNumber);
    }
}
