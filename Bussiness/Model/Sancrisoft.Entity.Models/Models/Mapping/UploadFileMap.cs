using System.Data.Entity.ModelConfiguration;

namespace Process.Entity.Models.Mapping
{
    public class UploadFileMap : EntityTypeConfiguration<UploadFiles>
    {
        public UploadFileMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Table & Column Mappings
            this.ToTable("UploadFiles");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.token).HasColumnName("Token");
            this.Property(t => t.type).HasColumnName("Type");
            this.Property(t => t.body).HasColumnName("Body");
            this.Property(t => t.name).HasColumnName("Name");
            this.Property(t => t.description).HasColumnName("Description");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
        }
    }
}
