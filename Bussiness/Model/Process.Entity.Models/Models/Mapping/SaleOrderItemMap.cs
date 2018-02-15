using System.Data.Entity.ModelConfiguration;

namespace Process.Entity.Models.Mapping
{
    public class SaleOrderItemMap : EntityTypeConfiguration<SaleOrderItem>
    {
        public SaleOrderItemMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.Product_Id)
                .IsRequired();

            //// Table & Column Mappings
            this.ToTable("SaleOrderItems");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Product_Id).HasColumnName("Product_Id");
           // this.Property(t => t.SaleOrder_Id).HasColumnName("SaleOrder_Id");
            this.Property(t => t.Unit).HasColumnName("Unit");
            this.Property(t => t.PriceSalebyUnit).HasColumnName("PriceSalebyUnit");
            this.Property(t => t.Utility).HasColumnName("Utility");
            this.Property(t => t.Transaction).HasColumnName("Transaction");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
            this.Property(t => t.UpdatedId).HasColumnName("UpdatedId");

            //this.HasRequired(t => t.SaleOrder)
            //              .WithMany(t => t.SaleOrderItem)
            //              .HasForeignKey(d => d.SaleOrder_Id);

            //this.HasMany(c => c.TaxeOrder)
            //    .WithOptional(d => d.SaleOrderItem)
            //    .HasForeignKey(d => d.SaleOrderItem_Id);
        }
    }
}
