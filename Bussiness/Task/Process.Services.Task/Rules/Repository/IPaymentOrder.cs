using System;
using Arquitectura.Core.Helper;
using Process.Entity.Models;
using System.Collections.Generic;

namespace Process.Services.Task
{
    public interface IPaymentOrder
    {
        Guid Insert(PaymentOrder item, Guid UpdatedId);
        void Remove(Guid item);
        List<PaymentOrder> Get(Guid id);
    }
}
