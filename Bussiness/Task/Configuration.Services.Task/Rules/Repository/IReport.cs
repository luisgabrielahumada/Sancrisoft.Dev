using System;
using Arquitectura.Core.Helper;
using Configuration.Entity.Models;
using System.Collections.Generic;
namespace Configuration.Services.Task
{
    public interface IReport
    {
        void Update(Guid id, Report item, Guid UpdatedId);
        void Insert(Report item, Guid UpdatedId);
        void Remove(Guid item);
        void Delete(Guid item, bool Status, Guid UpdatedId);
        Report Get(Guid item);
        PagerRecord<Report> Get(int PageSize, int PageNumber);
        List<Report> GetItems();
    }
}
