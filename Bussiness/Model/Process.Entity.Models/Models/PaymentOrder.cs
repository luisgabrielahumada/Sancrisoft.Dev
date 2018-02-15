using Arquitectura.Entity.Model.Models;
using System;

namespace Process.Entity.Models
{
    public partial class PaymentOrder : BaseEntity
    {
        //public Guid SaleOrder_Id { set; get; }
        public SaleOrder SaleOrder { set; get; }
        public FormatPayment Payment { set; get; }
        public String Observation { set; get; }
        public String VoucherCard { set; get; }
        public double PricePayment { set; get; }
        public double PricePending { set; get; }
    }
}
