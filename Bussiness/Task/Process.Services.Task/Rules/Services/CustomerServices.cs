using Arquitectura.Core.Helper;
using System;
using Process.Entity.Models;
using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Arquitectura.Entity.Model.Models;

namespace Process.Services.Task
{
    public class CustomerServices : ICustomer
    {
        private IRepositoryBase<Customer> db;

        public CustomerServices(IRepositoryBase<Customer> _db)
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

        public Customer Get(Guid item)
        {
            return db.Get(item);
        }

        public PagerRecord<Customer> Get(int PageSize, int PageNumber)
        {
            int PageTotal = 0;
            return db.GetQuery(out PageTotal, PageSize, PageNumber);
        }

        public Customer GetWhereDocument(String Document, String TypeDocument)
        {
            return db.GetByWhere(e => e.Document == Document && e.TypeDocument== TypeDocument);
        }

        public void Insert(Customer item, Guid UpdatedId)
        {
            var Q = db.GetByWhere(e => e.Document == item.Document);
            Check.IsNull(Q, $"Existen Registro para este item {item.Document}.");
            item.State = ObjectState.Added;
            item.UpdatedId = UpdatedId;
            db.Save(item);
        }

        public void Remove(Guid item)
        {
            var Q = db.Get(item);
            Check.IsNotNull(Q, $"No Existen Registro para este item {item}.");
            Q.State = ObjectState.Deleted;
            db.Remove(Q);
        }

        public void Update(Guid id, Customer item, Guid UpdatedId)
        {
            Check.IsNotNull(id, $"La Key es requerida para la actualización.");
            var Q = db.Get(id);
            Check.IsNotNull(Q, $"No Existen Registro para este item {item.Document}.");
            Q.Document = item.Document;
            Q.Email = item.Email;
            Q.FirtsName = item.FirtsName;
            Q.LastName = item.LastName;
            Q.Phone = item.Phone;
            Q.TypeDocument = item.TypeDocument;
            Q.Status = item.Status;
            Q.State = ObjectState.Modified;
            Q.UpdatedId = UpdatedId;
            db.Save(Q);
        }
    }
}
