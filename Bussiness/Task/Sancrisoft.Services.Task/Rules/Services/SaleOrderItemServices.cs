using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Arquitectura.Core.Helper;
using Arquitectura.Entity.Model.Models;
using Configuration.Entity.Models;
using Configuration.Services.Task;
using Infrastruture.Task;
using Process.Entity.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Process.Services.Task
{
    public class SaleOrderItemServices : ISaleOrderItem
    {
        private IRepositoryBase<SaleOrderItem> db;
        private SaleOrderServices dbSaleOrder;
        private ProductServices dbProduct;
        private StockEvent dbStock;
        private IRepositoryBase<TaxeOrder> dbTaxeOrder;

        public SaleOrderItemServices(IRepositoryBase<SaleOrderItem> _db, IRepositoryBase<SaleOrder> _dbOrder, IRepositoryBase<Product> _dbProduct, IRepositoryBase<Inventory> _dbStock, IRepositoryBase<Taxe> _dbTaxe, IRepositoryBase<TaxeOrder> _dbTaxeOrder)
        {
            db = _db;
            dbSaleOrder = new SaleOrderServices(_dbOrder);
            dbProduct = new ProductServices(_dbProduct, _dbTaxe);
            dbStock = new StockEvent(_dbStock, _db, _dbProduct);
            dbTaxeOrder = _dbTaxeOrder;
        }
        public SaleOrderItemServices(IRepositoryBase<SaleOrderItem> _db)
        {
            db = _db;
        }
        

        public SaleOrderItem Get(Guid item)
        {
            return db.Get(item);
        }

        public PagerRecord<SaleOrderItem> Get(int PageSize, int PageNumber)
        {
            int PageTotal = 0;
            return db.GetQuery(out PageTotal, PageSize, PageNumber);
        }

        public List<SaleOrderItem> GetWhereOrderId(Guid Id)
        {
            //var result = db.GetQuery(e => e.SaleOrder_Id == Id);
            var result = db.GetQuery(e => e.SaleOrder.Id == Id);
            foreach (var item in result)
            {
                var p = dbProduct.Get(item.Product_Id);
                item.Utility = p.Utility;
                //item.PriceSaleTotal = item.Status ? (item.PriceSalebyUnit * item.Unit) : 0;
            }
            return result;
        }

        public void Insert(SaleOrderItem item, Guid UpdatedId)
        {
            var inventory = dbStock.ExistsProduct(item.Product_Id, item.SaleOrder.Id, item.Unit);
            Check.IsEquals(inventory, false, "No existe inventario disponible para este producto");
            var Query = dbProduct.GetProductByTaxeWhere(item.Product_Id).ToList();
            List<TaxeOrder> taxe = new List<TaxeOrder>();
            if (Query != null)
                taxe = Query
                            .Select(t => new TaxeOrder
                            {
                                Id = Guid.NewGuid(),
                                Code = t.Code,
                                Name = t.Name,
                                Parent = t.Parent,
                                SaleOrderItem = item,
                                ServiceType = t.ServiceType,
                                State = ObjectState.Added,
                                Status = true,
                                Type = t.Type,
                                UpdatedId = UpdatedId,
                                Creation = DateTime.UtcNow,
                                Value = t.Value,
                                PriceTax = CalculateTax(item.Unit, item.PriceSalebyUnit, t.Value, t.Type)
                            })
                            .ToList();
            item.TaxeOrder = taxe;
            item.UpdatedId = UpdatedId;
            item.State = ObjectState.Added;
            var id = db.Save(item);
            ChangePriceTotal(item);
        }

        public void UpdateSingle(Guid id, SaleOrderItem item, Guid UpdatedId)
        {
            var inventory = dbStock.ExistsProduct(item.Product_Id, item.SaleOrder.Id, item.Unit);
            Check.IsEquals(inventory, false, "No exite inventario disponible para este producto");
            item.State = ObjectState.Modified;
            item.UpdatedId = UpdatedId;
            db.Save(item);
            ChangePriceTotal(item);
        }
        public void Delete(Guid item, bool Status, Guid UpdatedId)
        {
            var Q = db.Get(item, t => t.SaleOrder);
            int quantity = Q.Unit;
            Check.IsNotNull(Q, $"No Existen Registro para este Item {item}.");
            Q.Status = Status;
            Q.State = ObjectState.Modified;
            Q.UpdatedId = UpdatedId;
            Q.Unit = 0;
            foreach (var k in Q.TaxeOrder)
            {
                k.PriceTax = CalculateTax(0, 0, k.Value, k.Type);
                k.State = ObjectState.Modified;
            }
            db.Delete(Q);
            var Order = dbSaleOrder.Get(Q.SaleOrder.Id);
            if (Status)
                Order.PriceTotal = Order.PriceTotal + (Q.PriceSalebyUnit * quantity);
            if (!Status)
                Order.PriceTotal = Order.PriceTotal - (Q.PriceSalebyUnit * quantity);
            //dbSaleOrder.Update(Q.SaleOrder_Id, Order, Q.UpdatedId);
            dbSaleOrder.Update(Q.SaleOrder.Id, Order, Q.UpdatedId);
        }
        public void UpdateBath(Guid id, List<SaleOrderItem> items, Guid UpdatedId)
        {
            foreach (var item in items)
            {
                var Q = db.Get(item.Id, t => t.SaleOrder);
                var inventory = dbStock.ExistsProduct(item.Product_Id, id, item.Unit);
                Check.IsEquals(inventory, false, "No exite inventario disponible para este producto");
                Q.State = ObjectState.Modified;
                Q.UpdatedId = UpdatedId;
                Q.Unit = item.Unit;
                Q.PriceSalebyUnit = item.PriceSalebyUnit;
                foreach (var k in Q.TaxeOrder)
                {
                    k.PriceTax = CalculateTax(Q.Unit, Q.PriceSalebyUnit, k.Value, k.Type);
                    k.State = ObjectState.Modified;
                }
                db.Save(Q);
                ChangePriceTotal(Q);
            }
        }

        private void ChangePriceTotal(SaleOrderItem item)
        {
            var Order = dbSaleOrder.Get(item.SaleOrder.Id);
            Order.PriceTotal = Order.SaleOrderItem
                                    .Where(s => s.Status == true)
                                    .Sum(t => t.PriceSalebyUnit * t.Unit);
            dbSaleOrder.Update(item.SaleOrder.Id, Order, item.UpdatedId);
        }

        private Double CalculateTax(int unit, Double price, Double value, TypeTax type)
        {
            Double tax = 0;
            var totalprice = unit * price;
            switch (type)
            {
                case TypeTax.ByPercentage:
                    tax = (totalprice * (value / 100));
                    break;
                case TypeTax.ByValue:
                    tax = value;
                    break;
            }
            return tax;
        }
    }
}
