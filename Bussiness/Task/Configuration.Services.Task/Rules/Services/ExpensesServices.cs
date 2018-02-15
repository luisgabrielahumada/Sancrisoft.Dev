using Arquitectura.Core.Helper;
using System;
using Configuration.Entity.Models;
using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Entity.Model.Models;
using Arquitectura.Core.DomainExceptions;
using System.Collections.Generic;
using System.Linq;

namespace Configuration.Services.Task
{
    public class ExpensesServices : IExpenses
    {
        private IRepositoryBase<Expenses> db;
        public ExpensesServices(IRepositoryBase<Expenses> _db)
        {
            db = _db;
        }
        public void Delete(Guid item, bool Status, Guid UpdatedId)
        {
            var Q = db.Get(item);
            Check.IsNotNull(Q, $"No Existen Registro para este Item {item}.");
            Q.Status = Status;
            Q.State = ObjectState.Modified;
            Q.UpdatedId = UpdatedId;
            db.Delete(Q);
        }

        public Expenses Get(Guid item)
        {
            return db.Get(item);
        }

        public PagerRecord<Expenses> Get(int PageSize, int PageNumber, Guid UpdatedId)
        {
            int PageTotal = 0;
            return db.GetQuery(out PageTotal, PageSize, PageNumber,predicate: t => t.UpdatedId == UpdatedId);
        }

        public Guid Insert(Expenses item, Guid UpdatedId)
        {
            var Q = db.GetByWhere(e => e.Name == item.Name);
            Check.IsNull(Q, $"No Existen Registro para este item {item.Name}.");
            item.State = ObjectState.Added;
            item.UpdatedId = UpdatedId;
            foreach (var row in item.MonthsExpenses)
            {
                row.State = ObjectState.Added;
                row.UpdatedId = UpdatedId;
            }
            return db.Save(item);
        }

        public void Remove(Guid item)
        {
            var Q = db.Get(item);
            Check.IsNotNull(Q, $"No Existen Registro para este item {item}.");
            Q.State = ObjectState.Deleted;
            db.Remove(Q);
        }

        public void Update(Guid id, Expenses item, Guid UpdatedId)
        {
            Check.IsNotNull(id, $"La Key es requerida para la actualización.");
            var Q = db.GetByWhere(e => e.Id == id);
            Check.IsNotNull(Q, $"Existen Registro con este codigo {item.Name}.");

            Q.Name = item.Name;
            Q.Description = item.Description;
            Q.Value = item.Value;
            Q.Account = item.Account;
            Q.Status = item.Status;
            Q.State = ObjectState.Modified;
            Q.UpdatedId = UpdatedId;
            foreach (var row in Q.MonthsExpenses)
            {
                row.State = ObjectState.Modified;
                row.UpdatedId = UpdatedId;
            }
            if (item.MonthsExpenses.Count > Q.MonthsExpenses.Count)
            {
                var diff = item
                            .MonthsExpenses
                            .Where(p => !Q.MonthsExpenses.Any(p2 => p2.Value == p.Value));
                foreach (var row in diff)
                {
                    Q.MonthsExpenses.Add(new MonthsExpenses { Value = row.Value, State = ObjectState.Added });
                }
            }
            if (item.MonthsExpenses.Count < Q.MonthsExpenses.Count)
            {
                var diff = Q
                            .MonthsExpenses
                            .Where(p => !item.MonthsExpenses.Any(p2 => p2.Value == p.Value));
                foreach (var row in diff)
                {
                    row.State = ObjectState.Deleted;
                }
            }
            db.Save(Q);
        }
    }
}
