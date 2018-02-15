using System;
using Arquitectura.Core.Helper;
using Process.Entity.Models;
using System.Collections.Generic;

namespace Process.Services.Task
{
    public interface ISaleOrder
    {
        void Update(Guid id, SaleOrder item, Guid UpdatedId);
        Guid Insert(SaleOrder item, Guid UpdatedId);
        void Remove(Guid item);
        void Delete(Guid item, bool Status, Guid UpdatedId);
        SaleOrder Get(Guid item);
        PagerRecord<SaleOrder> Get(int PageSize, int PageNumber);

        List<SaleOrder> OrdersReport();
    }
}
