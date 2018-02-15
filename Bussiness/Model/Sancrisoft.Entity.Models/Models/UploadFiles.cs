using Arquitectura.Entity.Model.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Process.Entity.Models
{
    public partial class UploadFiles : BaseEntity
    {
        public Guid token { set; get; }
        public String type { set; get; }
        public String name { set; get; }
        public String description { set; get; }
        public String body { set; get; }
    }
}
