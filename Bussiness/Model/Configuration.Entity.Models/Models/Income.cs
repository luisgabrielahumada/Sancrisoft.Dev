
using Arquitectura.Entity.Model.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Configuration.Entity.Models
{
    public partial class Income : BaseEntity
    {
        public Income()
        {
            this.MonthsIncome = new List<MonthsIncome>();
        }

        public String Name { set; get; }
        public String Description { set; get; }
        public Decimal Value { set; get; }
        [NotMapped]
        public Decimal Total { get { return Value * MonthsIncome.Count; } }
        public virtual ICollection<MonthsIncome> MonthsIncome { set; get; }
    }
}
