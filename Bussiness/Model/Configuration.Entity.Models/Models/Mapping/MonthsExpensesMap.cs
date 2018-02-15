using System.Data.Entity.ModelConfiguration;

namespace Configuration.Entity.Models.Mapping
{
    public class MonthsExpensesMap : EntityTypeConfiguration<MonthsExpenses>
    {
        public MonthsExpensesMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.Value)
                .IsRequired();


            //// Table & Column Mappings
            this.ToTable("MonthsExpenses");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Value).HasColumnName("Month");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
            this.Property(t => t.UpdatedId).HasColumnName("UpdatedId");
        }
    }
}
