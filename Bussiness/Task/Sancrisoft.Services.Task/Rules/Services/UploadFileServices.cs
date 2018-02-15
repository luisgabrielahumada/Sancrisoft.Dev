using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Arquitectura.Entity.Model.Models;
using Process.Entity.Models;
using System;

namespace Process.Services.Task
{
    public class UploadFileServices : IUploadFiles
    {
        private IRepositoryBase<UploadFiles> db;

        public UploadFileServices(IRepositoryBase<UploadFiles> _db)
        {
            db = _db;
        }

        public UploadFiles GetToken(Guid item)
        {
            return db.GetByWhere(e=>e.token==item);
        }

        public Guid Insert(UploadFiles item, Guid UpdatedId)
        {
            Check.IsNotNull(item.token, $"Token relacion requerido {item.token}.");
            Check.IsNotNull(item.type, $"Tipo de archivo requerido {item.type}.");
            Check.IsNotNull(item.name, $"Nombre archivo requerido {item.name}.");
            item.State = ObjectState.Added;
            item.UpdatedId = UpdatedId;
            return db.Save(item);
        }

    }
}
