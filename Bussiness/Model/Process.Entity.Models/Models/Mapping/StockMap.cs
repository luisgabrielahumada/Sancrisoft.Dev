using Process.Entity.Models;
using System.Data.Entity.ModelConfiguration;

namespace Configuration.Entity.Models.Mapping
{
    public class StockMap : EntityTypeConfiguration<Stock>
    {
        public StockMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.Product_Id)
                .IsRequired();

            //// Table & Column Mappings
            this.ToTable("Stocks");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Product_Id).HasColumnName("Product_Id");
            this.Property(t => t.StockBy).HasColumnName("StockBy");
            this.Property(t => t.StockSale).HasColumnName("StockSale");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
            this.Property(t => t.UpdatedId).HasColumnName("UpdatedId");
        }
    }
}
