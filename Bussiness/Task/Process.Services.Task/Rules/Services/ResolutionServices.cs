using Arquitectura.Core.Helper;
using System;
using Process.Entity.Models;
using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Arquitectura.Entity.Model.Models;

namespace Process.Services.Task
{
    public class ResolutionServices : IResolution
    {
        private IRepositoryBase<Resolution> db;

        public ResolutionServices(IRepositoryBase<Resolution> _db)
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

        public Resolution Get(Guid item)
        {
            return db.Get(item);
        }

        public PagerRecord<Resolution> Get(int PageSize, int PageNumber)
        {
            int PageTotal = 0;
            return db.GetQuery(out PageTotal, PageSize, PageNumber);
        }
 
        public void Insert(Resolution item, Guid UpdatedId)
        {
            var Q = db.GetByWhere(e => e.Expiration <= DateTime.Now);
            Check.IsNull(Q, $"No Existen Registro para este item {item.Prefix}.");
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

        public void Update(Guid id, Resolution item, Guid UpdatedId)
        {
            Check.IsNotNull(id, $"La Key es requerida para la actualización.");
            var Q = db.Get(id);
            Check.IsNotNull(Q, $"No Existen Registro para este item {item.Prefix}.");
            Q.Expiration = item.Expiration;
            Q.FinalRange = item.FinalRange;
            Q.InitialRange = item.InitialRange;
            Q.Prefix = item.Prefix;
            Q.Type = item.Type;
            Q.Description = item.Description;
            Q.Status = item.Status;
            Q.State = ObjectState.Modified;
            Q.UpdatedId = UpdatedId;
            db.Save(Q);
        }
    }
}
