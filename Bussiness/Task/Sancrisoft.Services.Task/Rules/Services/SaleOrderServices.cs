using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Arquitectura.Core.Helper;
using Arquitectura.Entity.Model.Models;
using Process.Entity.Models;
using System;
using System.Collections.Generic;

namespace Process.Services.Task
{
    public class SaleOrderServices : ISaleOrder
    {
        private IRepositoryBase<SaleOrder> db;
        private SaleOrderItemServices dbItems;

        public SaleOrderServices(IRepositoryBase<SaleOrder> _db, IRepositoryBase<SaleOrderItem> _dbItems)
        {
            db = _db;
            dbItems = new SaleOrderItemServices(_dbItems);
        }
        public SaleOrderServices(IRepositoryBase<SaleOrder> _db)
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

        public SaleOrder Get(Guid item)
        {
            return db.Get(item, e => e.Customer, t => t.SaleOrderItem);
        }

        public PagerRecord<SaleOrder> Get(int PageSize, int PageNumber)
        {
            int PageTotal = 0;
            return db.GetQuery(out PageTotal, PageSize, PageNumber, e => e.Customer);
        }
        public List<SaleOrder> OrdersReport()
        {
            return db.GetQuery(e => e.Status == true, t => t.Customer);
        }
        public Guid Insert(SaleOrder item, Guid UpdatedId)
        {
            var number = Guid.NewGuid();
            item.State = ObjectState.Added;
            item.UpdatedId = UpdatedId;
            item.Number = number.ToString().Substring(0, 10);
            var id = db.Save(item);
            return id;
        }
        public void Remove(Guid item)
        {
            var Q = db.Get(item);
            Check.IsNotNull(Q, $"No Existen Registro para este item {item}.");
            Q.State = ObjectState.Deleted;
            db.Remove(Q);
        }

        public void Update(Guid id, SaleOrder item, Guid UpdatedId)
        {
            var Q = db.Get(id);
            Check.IsNotNull(Q, $"No Existen Registro para este item {item.Number}.");
            Q.Customer_Id = item.Customer_Id;
            Q.Discount = item.Discount;
            Q.Description = item.Description;
            Q.Transaction = item.Transaction;
            Q.Discount = item.Discount;
            Q.StatusOrders = item.StatusOrders;
            Q.PriceTotal = item.PriceTotal;
            Q.State = ObjectState.Modified;
            Q.StatusTransaction = item.StatusTransaction;
            Q.UpdatedId = UpdatedId;
            db.Save(Q);
        }
    }
}
