using Arquitectura.Entity.Model.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Process.Entity.Models
{
    public partial class ServerOfEmails : BaseEntity
    {
        public String host { set; get; }
        public int port { set; get; }
        public bool isEnableSSl { set; get; }
        public bool isUseCredencial { set; get; }
        public bool isDefault { set; get; }
        public String user { set; get; }
        public String password { set; get; }
        public String emailAdministrator { set; get; }
        public String webSite { set; get; }
    }
}
