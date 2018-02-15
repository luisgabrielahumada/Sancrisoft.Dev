using Configuration.Entity.Models;
using System;

namespace Infrastruture.Task
{
    public interface IStock
    {
        bool ExistsProduct(Guid id, Guid orderId, int quantity);
        Product GetInventory(Guid id, DateTimeOffset duedate, int quantity = 0);
    }
}
