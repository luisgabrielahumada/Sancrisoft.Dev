using System.Data.Entity.ModelConfiguration;

namespace Configuration.Entity.Models.Mapping
{
    public class MonthsIncomeMap : EntityTypeConfiguration<MonthsIncome>
    {
        public MonthsIncomeMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.Value)
                .IsRequired();

            //// Table & Column Mappings
            this.ToTable("MonthsIncome");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Value).HasColumnName("Month");
            //this.Property(t => t.Name).HasColumnName("Name");
            //this.Property(t => t.Income.Id).HasColumnName("Income_Id");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
            this.Property(t => t.UpdatedId).HasColumnName("UpdatedId");

            //// Relationships
            //this.HasRequired(t => t.Income)
            //    .WithMany(t => t.Product)
            //    .HasForeignKey(d => d.Provider_Id);
        }
    }
}
