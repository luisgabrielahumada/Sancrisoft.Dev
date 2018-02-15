using System.Data.Entity.ModelConfiguration;

namespace Process.Entity.Models.Mapping
{
    public class SaleOrderMap : EntityTypeConfiguration<SaleOrder>
    {
        public SaleOrderMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            //// Table & Column Mappings
            this.ToTable("SaleOrders");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Customer_Id).HasColumnName("Customer_Id");
            this.Property(t => t.Number).HasColumnName("Number");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.Discount).HasColumnName("Discount");
            this.Property(t => t.PricePending).HasColumnName("PricePending");
            this.Property(t => t.PriceTotal).HasColumnName("PriceTotal");
            this.Property(t => t.Transaction).HasColumnName("Transaction");
            this.Property(t => t.StatusOrders).HasColumnName("StatusOrders");
            this.Property(t => t.StatusTransaction).HasColumnName("StatusTransaction");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
            this.Property(t => t.UpdatedId).HasColumnName("UpdatedId");



            this.HasRequired(t => t.Customer)
                          .WithMany()
                          .HasForeignKey(d => d.Customer_Id);
        }
    }
}
