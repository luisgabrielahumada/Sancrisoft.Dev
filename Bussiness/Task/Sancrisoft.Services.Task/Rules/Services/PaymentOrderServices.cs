using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Arquitectura.Core.Helper;
using Arquitectura.Entity.Model.Models;
using Process.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Process.Services.Task
{
    public class PaymentOrderServices : IPaymentOrder
    {
        private IRepositoryBase<PaymentOrder> db;
        private SaleOrderServices dbSaleOrder;

        public PaymentOrderServices(IRepositoryBase<PaymentOrder> _db, IRepositoryBase<SaleOrder> _dbSaleOrder)
        {
            db = _db;
            dbSaleOrder = new SaleOrderServices(_dbSaleOrder);
        }
        public PaymentOrderServices(IRepositoryBase<PaymentOrder> _db)
        {
            db = _db;
        }
        public List<PaymentOrder> Get(Guid id)
        {
            return db.GetQuery(e => e.SaleOrder.Id == id);
        }

        public Guid Insert(PaymentOrder item, Guid UpdatedId)
        {
            var number = Guid.NewGuid();
            item.State = ObjectState.Added;
            item.UpdatedId = UpdatedId;
            var id = db.Save(item);
            var Q = dbSaleOrder.Get(item.SaleOrder.Id);
            var QO = db.GetQuery(e => e.SaleOrder.Id == item.SaleOrder.Id);
            Q.PricePending = Q.PriceTotal - QO.Sum(t => t.PricePayment);
            if (Q.PricePending <= 0)
                Q.StatusTransaction = Transaction.Ok;
            dbSaleOrder.Update(item.SaleOrder.Id, Q, UpdatedId);
            return id;
        }

        public void Remove(Guid item)
        {
            var Q = db.Get(item, e => e.SaleOrder);
            Check.IsNotNull(Q, $"No Existen Registro para este item {item}.");
            Q.State = ObjectState.Deleted;
            var QO = dbSaleOrder.Get(Q.SaleOrder.Id);
            QO.PricePending = QO.PricePending + Q.PricePayment ;
            dbSaleOrder.Update(Q.SaleOrder.Id, QO, QO.UpdatedId);
            db.Remove(Q);


        }

        public void Update(Guid id, PaymentOrder item, Guid UpdatedId)
        {
            var Q = db.Get(id);
            Check.IsNotNull(Q, $"No Existen Registro para este item {item.SaleOrder.Number}.");
            // Q.SaleOrder_Id = item.SaleOrder_Id;
            Q.Payment = item.Payment;
            Q.PricePayment = item.PricePayment;
            Q.PricePending = item.PricePending;
            Q.Observation = item.Observation;
            Q.VoucherCard = item.VoucherCard;
            Q.State = ObjectState.Modified;
            Q.UpdatedId = UpdatedId;
            db.Save(Q);
        }
    }
}
