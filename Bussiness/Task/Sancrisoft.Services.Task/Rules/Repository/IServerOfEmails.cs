using Arquitectura.Core.Helper;
using Process.Entity.Models;
using System;

namespace Process.Services.Task
{
    public interface IServerOfEmails
    {
        void Update(Guid id, ServerOfEmails item, Guid UpdatedId);
        void Insert(ServerOfEmails item, Guid UpdatedId);
        ServerOfEmails Get(Guid item);
        PagerRecord<ServerOfEmails> Get(int PageSize, int PageNumber);
    }
}
