using Process.Entity.Models;
using System.Data.Entity.ModelConfiguration;

namespace Configuration.Entity.Models.Mapping
{
    public class PaymentOrderMap : EntityTypeConfiguration<PaymentOrder>
    {
        public PaymentOrderMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);


            //// Table & Column Mappings
            this.ToTable("PaymentOrders");
            this.Property(t => t.Id).HasColumnName("Id");
            //this.Property(t => t.SaleOrder_Id).HasColumnName("SaleOrder_Id");
            this.Property(t => t.VoucherCard).HasColumnName("VoucherCard");
            this.Property(t => t.Payment).HasColumnName("Payment");
            this.Property(t => t.Observation).HasColumnName("Observation");
            this.Property(t => t.PricePayment).HasColumnName("PricePayment");
            this.Property(t => t.PricePending).HasColumnName("PricePending");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
            this.Property(t => t.UpdatedId).HasColumnName("UpdatedId");
        }
    }
}
