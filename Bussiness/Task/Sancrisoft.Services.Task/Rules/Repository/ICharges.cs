using Arquitectura.Core.Helper;
using Process.Entity.Models;
using System;

namespace Process.Services.Task
{
    public interface ICharges
    {
        void Update(Guid id, Charges item, Guid UpdatedId);
        void Insert(Charges item, Guid UpdatedId);
        Charges Get(Guid item);
        PagerRecord<Charges> Get(int PageSize, int PageNumber);
    }
}
