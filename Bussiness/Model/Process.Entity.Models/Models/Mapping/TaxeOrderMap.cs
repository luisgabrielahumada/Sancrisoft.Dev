using System.Data.Entity.ModelConfiguration;

namespace Process.Entity.Models.Mapping
{
    public class TaxeOrderMap : EntityTypeConfiguration<Inscription>
    {
        public TaxeOrderMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.Name)
                .IsRequired();

            this.HasRequired(t => t.SaleOrderItem);

            //// Table & Column Mappings
            this.ToTable("TaxesOrderItems");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Value).HasColumnName("Value");
            this.Property(t => t.PriceTax).HasColumnName("PriceTax");
            //this.Property(t => t.SaleOrderItem.Id).HasColumnName("SaleOrderItem_Id");
            this.Property(t => t.Parent).HasColumnName("Parent");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
            this.Property(t => t.UpdatedId).HasColumnName("UpdatedId");
            //// Relationships
            
            
            //this.HasRequired(t => t.SaleOrderItem)
            //    .WithMany(t => t.TaxeOrder)
            //    .HasForeignKey(d => d.SaleOrderItem_Id);
        }
    }
}
