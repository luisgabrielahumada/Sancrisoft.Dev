using Arquitectura.Entity.Model.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace Configuration.Entity.Models
{
    public partial class MonthsIncome : BaseEntity
    {
        public Month? Value { set; get; }
        [NotMappedAttribute]
        public String Name
        {
            get
            {
                return Value.ToString();
            }
        }
        //[ForeignKey("Income_Id")]
        public virtual Income Income { set; get; }
    }
}
