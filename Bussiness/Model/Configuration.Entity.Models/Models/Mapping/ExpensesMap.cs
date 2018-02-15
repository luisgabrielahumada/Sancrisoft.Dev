using System.Data.Entity.ModelConfiguration;

namespace Configuration.Entity.Models.Mapping
{
    public class ExpensesMap : EntityTypeConfiguration<Expenses>
    {
        public ExpensesMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.Name)
                .IsRequired();

            this.Property(t => t.Description)
                .IsRequired();

            //// Table & Column Mappings
            this.ToTable("Expenses");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Description).HasColumnName("Description");
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
