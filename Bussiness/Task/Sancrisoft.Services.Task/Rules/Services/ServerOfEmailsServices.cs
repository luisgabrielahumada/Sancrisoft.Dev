using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.Helper;
using Process.Entity.Models;
using System;

namespace Process.Services.Task
{
    public class ServerOfEmailsServices : IServerOfEmails
    {
        private IRepositoryBase<ServerOfEmails> db;

        public ServerOfEmailsServices(IRepositoryBase<ServerOfEmails> _db)
        {
            db = _db;
        }

        public ServerOfEmails Get(Guid item)
        {
            return db.Get(item);
        }

        public PagerRecord<ServerOfEmails> Get(int PageSize, int PageNumber)
        {
            int PageTotal = 0;
            return db.GetQuery(out PageTotal, PageSize, PageNumber);
        }

        public void Insert(ServerOfEmails item, Guid UpdatedId)
        {
            throw new NotImplementedException();
        }

        public void Update(Guid id, ServerOfEmails item, Guid UpdatedId)
        {
            throw new NotImplementedException();
        }
    }
}
