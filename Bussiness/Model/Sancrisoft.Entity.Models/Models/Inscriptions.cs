using Arquitectura.Entity.Model.Models;
using System;
using System.ComponentModel.DataAnnotations;

namespace Process.Entity.Models
{
    public partial class Inscriptions : BaseEntity
    {
        [Required]
        public String firstName { set; get; }
        [Required]
        public String lastName { set; get; }
        public String country { set; get; }
        public String city { set; get; }
        public String address { set; get; }
        public String zip { set; get; }
        public String state { set; get; }
        [Required]
        public String email { set; get; }
        public String phone { set; get; }
        public DateTimeOffset birthDate { set; get; }
        public String biography { set; get; }
        public String description { set; get; }
        [Required]
        public virtual Charges charge { set; get; }
    }
}
