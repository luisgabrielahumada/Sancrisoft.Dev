using Configuration.Entity.Models;
using Process.Entity.Models;
using System;
using System.Collections.Generic;

namespace Process.Services.Task
{
    public interface IBalanceSheet
    {
        List<Year> YearBalance(Guid UpdatedId);
        BalanceSheet Balance(int month, int year, Guid UpdatedId);
        BalanceSheet BalanceOfMonth(Guid UpdatedId);
        dynamic BalanceMonthPayment(Guid UpdatedId);
        void Apply(BalanceSheet item, Guid UpdatedId);
        void Delete(BalanceSheet item, Guid UpdatedId);
        void Lock(BalanceSheet item, Guid UpdatedId);
        void UnLock(BalanceSheet item, Guid UpdatedId);
        void Rejected(BalanceSheet item, Guid UpdatedId);
    }
}
