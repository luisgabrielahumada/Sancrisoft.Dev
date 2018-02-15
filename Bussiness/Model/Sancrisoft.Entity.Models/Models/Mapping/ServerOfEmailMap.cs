using System.Data.Entity.ModelConfiguration;

namespace Process.Entity.Models.Mapping
{
    public class ServerOfEmailMap : EntityTypeConfiguration<ServerOfEmails>
    {
        public ServerOfEmailMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            //// Properties
            this.Property(t => t.host)
                .IsRequired();
            this.Property(t => t.port)
               .IsRequired();
            this.Property(t => t.user)
               .IsRequired();
            this.Property(t => t.password)
                .IsRequired();

            //// Table & Column Mappings
            this.ToTable("ServerOfEmails");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.host).HasColumnName("Host");
            this.Property(t => t.port).HasColumnName("Port");
            this.Property(t => t.isEnableSSl).HasColumnName("IsEnableSSl");
            this.Property(t => t.isUseCredencial).HasColumnName("IsUseCredencial");
            this.Property(t => t.isDefault).HasColumnName("IsDefault");
            this.Property(t => t.emailAdministrator).HasColumnName("EmailAdministrator");
            this.Property(t => t.webSite).HasColumnName("WebSite");
            this.Property(t => t.user).HasColumnName("User");
            this.Property(t => t.password).HasColumnName("Password");
            this.Property(t => t.Creation).HasColumnName("Creation");
            this.Property(t => t.Updated).HasColumnName("Updated");
        }
    }
}
