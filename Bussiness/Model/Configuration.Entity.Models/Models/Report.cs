using Arquitectura.Entity.Model.Models;
using System;
using System.Collections.Generic;

namespace Configuration.Entity.Models
{
    public partial class Report : BaseEntity
    {
        public String Name { set; get; }
        public String AuthorityUri { set; get; }
        public String Url { set; get; }
        public String UserName { set; get; }
        public String Password { set; get; }
        public String ClientId { set; get; }
        public String AreaJob { set; get; }
        public bool IsDashBoard { set; get; }
    }
}
