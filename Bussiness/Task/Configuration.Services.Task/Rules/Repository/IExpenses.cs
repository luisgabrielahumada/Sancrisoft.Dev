using System;
using Arquitectura.Core.Helper;
using Configuration.Entity.Models;
using System.Collections.Generic;

namespace Configuration.Services.Task
{
    public interface IExpenses
    {
        void Update(Guid id, Expenses item, Guid UpdatedId);
        Guid Insert(Expenses item, Guid UpdatedId);
        void Remove(Guid item);
        void Delete(Guid item, bool Status, Guid UpdatedId);
        Expenses Get(Guid item);
        PagerRecord<Expenses> Get(int PageSize, int PageNumber, Guid UpdatedId);
    }
}
