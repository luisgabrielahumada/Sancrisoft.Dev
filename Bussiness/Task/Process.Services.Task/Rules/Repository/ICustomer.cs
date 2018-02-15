using Arquitectura.Core.Helper;
using System;
using Process.Entity.Models;
namespace Process.Services.Task
{
    public interface ICustomer
    {
        void Update(Guid id, Customer item, Guid UpdatedId);
        void Insert(Customer item, Guid UpdatedId);
        void Remove(Guid item);
        void Delete(Guid item, bool Status, Guid UpdatedId);
        Customer Get(Guid item);
        Customer GetWhereDocument(String Document, String TypeDocument);
        PagerRecord<Customer> Get(int PageSize, int PageNumber);
    }
}
