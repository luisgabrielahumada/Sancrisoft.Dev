
using Arquirectura.Helper.Core.Enumumerable;
using Arquitectura.Entity.Model.Models;
using System;

namespace Process.Entity.Models
{
    public partial class Inscription: BaseEntity
    {
        public String Name { set; get; }
        public String Code { set; get; }
        public Double Value { set; get; }
        public Double? PriceTax { set; get; }

        public Guid? Parent { get; set; }
        public virtual SaleOrderItem SaleOrderItem { get; set; }
    }
}
