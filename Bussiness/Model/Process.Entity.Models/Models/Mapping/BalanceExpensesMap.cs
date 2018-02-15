using System.Data.Entity.ModelConfiguration;

namespace Process.Entity.Models.Mapping
{
    public class BalanceExpensesMap : EntityTypeConfiguration<BalanceExpenses>
    {
        public BalanceExpensesMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.Name)
                .IsRequired();

            this.Property(t => t.Description)
                .IsRequired();

            //// Table & Column Mappings
            this.ToTable("BalanceExpenses");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Value).HasColumnName("Value");
            this.Property(t => t.Month).HasColumnName("Month");
            //this.Property(t => t.Expenses.Id).HasColumnName("Expenses_Id");
            this.Property(t => t.IsPayment).HasColumnName("IsPayment");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
            this.Property(t => t.UpdatedId).HasColumnName("UpdatedId");

            //// Relationships
            //this.HasRequired(t => t.Expenses)
            //    .WithMany(t => t.Product)
            //    .HasForeignKey(d => d.Provider_Id);

            //this.HasRequired(t => t.Expenses)
            //   .WithMany()
            //   .HasForeignKey(d => d.Expenses.Id);
        }
    }
}
