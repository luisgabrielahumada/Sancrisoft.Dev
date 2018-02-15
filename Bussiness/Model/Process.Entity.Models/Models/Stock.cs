using Arquitectura.Entity.Model.Models;
using System;

namespace Process.Entity.Models
{
    public partial class Stock : BaseEntity
    {
        public Guid Product_Id { set; get; }
        public int StockBy { set; get; }
        public int StockSale { set; get; }
    }
}
