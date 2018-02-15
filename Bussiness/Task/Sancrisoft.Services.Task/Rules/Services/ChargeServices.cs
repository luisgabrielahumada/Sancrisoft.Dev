using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Arquitectura.Core.Helper;
using Arquitectura.Entity.Model.Models;
using Process.Entity.Models;
using System;

namespace Process.Services.Task
{
    public class ChargeServices : ICharges
    {
        private IRepositoryBase<Charges> db;

        public ChargeServices(IRepositoryBase<Charges> _db)
        {
            db = _db;
        }

        public Charges Get(Guid item)
        {
            throw new NotImplementedException();
        }

        public PagerRecord<Charges> Get(int PageSize, int PageNumber)
        {
            int PageTotal = 0;
            return db.GetQuery(out PageTotal, PageSize, PageNumber);
        }

        public void Insert(Charges item, Guid UpdatedId)
        {
            var Q = db.GetByWhere(e => e.name==item.name);
            Check.IsNull(Q, $"Existen Registro para este Nombre {item.name}.");
            item.State = ObjectState.Added;
            db.Save(item);
        }

        public void Update(Guid id, Charges item, Guid UpdatedId)
        {
            throw new NotImplementedException();
        }
    }
}
