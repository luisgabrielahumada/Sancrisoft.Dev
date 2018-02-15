using System.Data.Entity.ModelConfiguration;

namespace Process.Entity.Models.Mapping
{
    public class ChargeMap : EntityTypeConfiguration<Charges>
    {
        public ChargeMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.name)
               .IsRequired();


            //// Table & Column Mappings
            this.ToTable("Charges");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.name).HasColumnName("Name");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
        }
    }
}
