using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Configuration.Entity.Models;
using Process.Entity.Models;
using System;
using System.Linq;

namespace Infrastruture.Task
{
    public class StockEvent : IStock
    {
        private IRepositoryBase<Inventory> db;
        private IRepositoryBase<Product> dbProduct;
        private IRepositoryBase<SaleOrderItem> dbOrder;

        public StockEvent(IRepositoryBase<Inventory> _db, IRepositoryBase<SaleOrderItem> _dbOrder, IRepositoryBase<Product> _dbProduct)
        {
            db = _db;
            dbOrder = _dbOrder;
            dbProduct = _dbProduct;
        }

        public bool ExistsProduct(Guid id, Guid OrderId, int quantity)
        {
            bool result = false;
            var query = db.GetQuery(t => t.Product_Id == id)
                           .Where(m => m.DueDate.Date >= DateTimeOffset.Now.Date && m.Status == true);

            //var items = dbOrder.GetQuery(k => k.SaleOrder_Id == OrderId && k.Product_Id == id);
            var items = dbOrder.GetQuery(k => k.SaleOrder.Id == OrderId && k.Product_Id == id);

            var sumOrder = items.Sum(t => t.Unit);
            var sumProduct = query.Sum(t => t.Quantity);

            if (((sumOrder + quantity) - sumProduct) <= 0)
                result = false;

            if (((sumOrder + quantity) - sumProduct) > 0)
                result = true;

            return result;
        }

        public Product GetInventory(Guid id, DateTimeOffset duedate, int quantity = 0)
        {
            Inventory item = new Inventory();
            if (quantity == 0)
                item = db.GetQuery(t => t.Product_Id == id && t.DueDate >= duedate)
                          .OrderBy(m => m.DueDate)
                         .FirstOrDefault();
            if (quantity > 0)
                item = db.GetQuery(t => t.Product_Id == id && t.DueDate >= duedate && t.Quantity >= quantity)
                         .OrderBy(m => m.DueDate)
                         .FirstOrDefault();
            Check.IsNotNull(item, $"No Existen Registro para el item seleccionado.");
            return new Product
            {
                Code = item.Product.Code,
                Id = item.Product_Id,
                Name = item.Product.Name,
                PriceSale = item.PriceSale,
                Taxe = item.Product.Taxe,
                Utility=item.Product.Utility
            };
        }
    }
}
