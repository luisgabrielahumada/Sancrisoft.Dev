using Arquitectura.Entity.Model.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Process.Entity.Models
{
    public partial class Charges : BaseEntity
    {
        public String name { set; get; }
    }
}
