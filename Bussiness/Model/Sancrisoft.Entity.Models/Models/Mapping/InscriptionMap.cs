using System.Data.Entity.ModelConfiguration;

namespace Process.Entity.Models.Mapping
{
    public class InscriptionMap : EntityTypeConfiguration<Inscriptions>
    {
        public InscriptionMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.firstName)
                .IsRequired();
            this.Property(t => t.lastName)
               .IsRequired();


            //// Table & Column Mappings
            this.ToTable("Inscriptions");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.firstName).HasColumnName("FirstName");
            this.Property(t => t.lastName).HasColumnName("LastName");
            this.Property(t => t.country).HasColumnName("Country");
            this.Property(t => t.city).HasColumnName("City");
            this.Property(t => t.address).HasColumnName("Address");
            this.Property(t => t.zip).HasColumnName("Zip");
            this.Property(t => t.state).HasColumnName("State");
            this.Property(t => t.email).HasColumnName("Email");
            this.Property(t => t.phone).HasColumnName("Phone");
            this.Property(t => t.birthDate).HasColumnName("BirthDate");
            this.Property(t => t.biography).HasColumnName("Biography");
            this.Property(t => t.description).HasColumnName("Description");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
        }
    }
}
