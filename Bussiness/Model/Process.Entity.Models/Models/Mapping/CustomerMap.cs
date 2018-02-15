using System.Data.Entity.ModelConfiguration;

namespace Process.Entity.Models.Mapping
{
    public class CustomerMap : EntityTypeConfiguration<Customer>
    {
        public CustomerMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.Document)
                .HasMaxLength(50)
                .IsRequired();

            this.Property(t => t.FirtsName)
                .HasMaxLength(250)
                .IsRequired();

            this.Property(t => t.Email)
               .HasMaxLength(50);

            this.Property(t => t.LastName)
              .HasMaxLength(250)
              .IsRequired();

            //// Table & Column Mappings
            this.ToTable("Customers");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Document).HasColumnName("Document");
            this.Property(t => t.FirtsName).HasColumnName("FirtsName");
            this.Property(t => t.LastName).HasColumnName("LastName");
            this.Property(t => t.TypeDocument).HasColumnName("TypeDocument");
            this.Property(t => t.Email).HasColumnName("Email");
            this.Property(t => t.Phone).HasColumnName("Phone");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
            this.Property(t => t.UpdatedId).HasColumnName("UpdatedId");
        }
    }
}
