using Arquitectura.Entity.Model.Models;
using System;
using System.Collections.Generic;

namespace Process.Entity.Models
{
    public partial class Customer : BaseEntity
    {
        public String FirtsName { set; get; }
        public String LastName { set; get; }
        public String TypeDocument { set; get; }
        public String Document { set; get; }
        public String Email { set; get; }
        public String Phone { set; get; }
    }
}
