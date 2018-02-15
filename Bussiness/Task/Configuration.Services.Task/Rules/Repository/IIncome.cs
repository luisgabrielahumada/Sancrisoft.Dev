using System;
using Arquitectura.Core.Helper;
using Configuration.Entity.Models;
using System.Collections.Generic;

namespace Configuration.Services.Task
{
    public interface IIncome
    {
        void Update(Guid id, Income item, Guid UpdatedId);
        Guid Insert(Income item, Guid UpdatedId);
        void Remove(Guid item);
        void Delete(Guid item, bool Status, Guid UpdatedId);
        Income Get(Guid item);
        PagerRecord<Income> Get(int PageSize, int PageNumber, Guid UpdatedId);
    }
}
