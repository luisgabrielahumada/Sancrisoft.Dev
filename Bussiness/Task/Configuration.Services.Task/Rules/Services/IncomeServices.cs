using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Arquitectura.Core.Helper;
using Arquitectura.Entity.Model.Models;
using Configuration.Entity.Models;
using System;
using System.Linq;

namespace Configuration.Services.Task
{
    public class IncomeServices : IIncome
    {
        private IRepositoryBase<Income> db;

        public IncomeServices(IRepositoryBase<Income> _db)
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

        public Income Get(Guid item)
        {
            return db.Get(item);
        }

        public PagerRecord<Income> Get(int PageSize, int PageNumber, Guid UpdatedId)
        {
            int PageTotal = 0;
            return db.GetQuery(out PageTotal, PageSize, PageNumber, predicate: t => t.UpdatedId == UpdatedId);
        }

        public Guid Insert(Income item, Guid UpdatedId)
        {
            var QC = db.GetByWhere(e => e.Name == item.Name);
            Check.IsNull(QC, $"Existen Registro con este codigo {item.Name}.");

            //var QE = db.GetByWhere(e => e.Product_Id != item.Product_Id && e.DueDate == item.DueDate);
            //Check.IsNull(QE, $"Existen Registro para esta fecha { item.DueDate.Date}.");

            item.State = ObjectState.Added;
            item.UpdatedId = UpdatedId;
            foreach (var row in item.MonthsIncome)
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

        public void Update(Guid id, Income item, Guid UpdatedId)
        {
            Check.IsNotNull(id, $"La Key es requerida para la actualización.");
            var Q = db.GetByWhere(e => e.Id == id);
            Check.IsNotNull(Q, $"Existen Registro con este codigo {item.Name}.");

            Q.Name = item.Name;
            Q.Description = item.Description;
            Q.Value = item.Value;
            Q.Status = item.Status;
            Q.State = ObjectState.Modified;
            Q.UpdatedId = UpdatedId;
            foreach (var row in Q.MonthsIncome)
            {
                row.State = ObjectState.Modified;
                row.UpdatedId = UpdatedId;
            }
            if (item.MonthsIncome.Count > Q.MonthsIncome.Count)
            {
                var diff = item
                            .MonthsIncome
                            .Where(p => !Q.MonthsIncome.Any(p2 => p2.Value == p.Value));
                foreach (var row in diff)
                {
                    Q.MonthsIncome.Add(new MonthsIncome { Value = row.Value, State = ObjectState.Added });
                }
            }
            if (item.MonthsIncome.Count < Q.MonthsIncome.Count)
            {
                var diff = Q
                            .MonthsIncome
                            .Where(p => !item.MonthsIncome.Any(p2 => p2.Value == p.Value));
                foreach (var row in diff)
                {
                    row.State = ObjectState.Deleted;
                }
            }
            db.Save(Q);
        }
    }
}
