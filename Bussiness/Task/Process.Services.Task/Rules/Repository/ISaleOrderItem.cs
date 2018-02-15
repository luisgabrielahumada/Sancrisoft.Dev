using System;
using Arquitectura.Core.Helper;
using Process.Entity.Models;
using System.Collections.Generic;

namespace Process.Services.Task
{
    public interface ISaleOrderItem
    {
        void UpdateSingle(Guid id, SaleOrderItem item, Guid UpdatedId);
        void UpdateBath(Guid id, List<SaleOrderItem> items, Guid UpdatedId);
        void Insert(SaleOrderItem item, Guid UpdatedId);
        void Delete(Guid item, bool Status, Guid UpdatedId);
        SaleOrderItem Get(Guid item);
        List<SaleOrderItem> GetWhereOrderId(Guid Id);
        PagerRecord<SaleOrderItem> Get(int PageSize, int PageNumber);
    }
}
