using Arquitectura.Entity.Model.Models;
using System;
using System.Collections.Generic;

namespace Process.Entity.Models
{
    public partial class SaleOrder : BaseEntity
    {
        private DateTimeOffset transaction;
        public String Number { set; get; }
        public Guid Customer_Id { set; get; }
        public Customer Customer { set; get; }
        public Double Discount { set; get; }
        public String Description { set; get; }
        public Double PriceTotal { set; get; }
        public Double PricePending { set; get; }
        public DateTimeOffset Transaction {
            set
            {

                transaction = value;
            }
            get
            {
                return transaction.Date;
            }
        }
        public Orders StatusOrders { set; get; }
        public Transaction StatusTransaction { set; get; }
        public virtual ICollection<SaleOrderItem> SaleOrderItem { set; get; }
        public virtual ICollection<PaymentOrder> PaymentOrder { set; get; }
    }
}
