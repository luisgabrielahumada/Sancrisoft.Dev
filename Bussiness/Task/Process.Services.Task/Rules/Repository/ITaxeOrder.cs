using System;
using Arquitectura.Core.Helper;
using Configuration.Entity.Models;
using System.Collections.Generic;

namespace Process.Services.Task
{
    public interface ITaxeOrder
    {
        void Update(Guid id, Taxe item, Guid UpdatedId);
        void Insert(Taxe item, Guid UpdatedId);
        void Remove(Guid item);
        void Delete(Guid item, bool Status, Guid UpdatedId);
        Taxe Get(Guid item);
        PagerRecord<Taxe> Get(int PageSize, int PageNumber);
    }
}
