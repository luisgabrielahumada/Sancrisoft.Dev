using System.Data.Entity.ModelConfiguration;

namespace Process.Entity.Models.Mapping
{
    public class ResolutionMap : EntityTypeConfiguration<Resolution>
    {
        public ResolutionMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.Prefix)
                .IsRequired();

            //// Table & Column Mappings
            this.ToTable("Resolutions");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Prefix).HasColumnName("Prefix");
            this.Property(t => t.InitialRange).HasColumnName("InitialRange");
            this.Property(t => t.FinalRange).HasColumnName("FinalRange");
            this.Property(t => t.Expiration).HasColumnName("Expiration");
            this.Property(t => t.CurrentRange).HasColumnName("CurrentRange");
            this.Property(t => t.Type).HasColumnName("Type");
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
