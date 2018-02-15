using Arquitectura.Entity.Model.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Configuration.Entity.Models
{
    public partial class MonthsExpenses : BaseEntity
    {
        public Month? Value { set; get; }
        [NotMapped]
        public String Name
        {
            get
            {
                return Value.ToString();
            }
        }
        public virtual Expenses Expenses { set; get; }
    }
}
