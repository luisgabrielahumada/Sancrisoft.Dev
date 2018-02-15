using System.Data.Entity.ModelConfiguration;

namespace Process.Entity.Models.Mapping
{
    public class BalanceSheetMap : EntityTypeConfiguration<BalanceSheet>
    {
        public BalanceSheetMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.Month)
                .IsRequired();

            this.Property(t => t.Year)
              .IsRequired();

            //// Table & Column Mappings
            this.ToTable("BalanceSheet");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Month).HasColumnName("Month");
            this.Property(t => t.Year).HasColumnName("Year");
            this.Property(t => t.Islock).HasColumnName("Islock");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
            this.Property(t => t.UpdatedId).HasColumnName("UpdatedId");

            //// Relationships
            //this.HasRequired(t => t.Provider)
            //    .WithMany(t => t.Product)
            //    .HasForeignKey(d => d.Provider_Id);
        }
    }
}
