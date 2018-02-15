using Arquitectura.Core.Helper;
using System;
using Configuration.Entity.Models;
using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Arquitectura.Entity.Model.Models;
using System.Collections.Generic;

namespace Configuration.Services.Task
{
    public class ReportServices : IReport
    {
        private IRepositoryBase<Report> db;

        public ReportServices(IRepositoryBase<Report> _db)
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

        public Report Get(Guid item)
        {
            return db.Get(item);
        }

        public PagerRecord<Report> Get(int PageSize, int PageNumber)
        {
            int PageTotal = 0;
            return db.GetQuery(out PageTotal, PageSize, PageNumber);
        }

        public List<Report> GetItems()
        {
            return db.GetQuery(e => e.Status == true);
        }

        public void Insert(Report item, Guid UpdatedId)
        {
            var Q = db.GetByWhere(e => e.Name.ToLower() == item.Name.ToLower());
            Check.IsNull(Q, $"No Existen Registro para este item {item.Name}.");
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

        public void Update(Guid id, Report item, Guid UpdatedId)
        {
            Check.IsNotNull(id, $"La Key es requerida para la actualización.");
            var Q = db.Get(id);
            Check.IsNotNull(Q, $"Existen Registro para este item {item.Name}.");
            Q.Name = item.Name;
            Q.Url = item.Url;
            Q.ClientId = item.ClientId;
            Q.Password = item.Password;
            Q.UserName = item.UserName;
            Q.AuthorityUri = item.AuthorityUri;
            Q.Status = item.Status;
            Q.AreaJob = item.AreaJob;
            Q.IsDashBoard = item.IsDashBoard;
            Q.State = ObjectState.Modified;
            Q.UpdatedId = UpdatedId;
            db.Save(Q);
        }
    }
}
