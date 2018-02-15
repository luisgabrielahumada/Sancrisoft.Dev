using Arquitectura.Entity.Model.Models;
using Configuration.Entity.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Process.Entity.Models
{
    public partial class SaleOrderItem : BaseEntity
    {
        public SaleOrderItem()
        {
            this.TaxeOrder= new List<Inscription>();
        }
        public Guid Product_Id { set; get; }
        public SaleOrder SaleOrder { set; get; }
        [NotMapped]
        public Double PriceSaleTotal { get { return this.Unit * this.PriceSalebyUnit; } }
        public int Unit { set; get; } = 0;
        public Double PriceSalebyUnit { set; get; } = 0;
        public Double Utility { set; get; }
        public DateTimeOffset Transaction { set; get; } = DateTimeOffset.Now.Date;
        public virtual ICollection<Inscription> TaxeOrder { set; get; }
    }
}
