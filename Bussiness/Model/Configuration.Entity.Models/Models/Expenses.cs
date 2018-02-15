using Arquitectura.Entity.Model.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Configuration.Entity.Models
{
    public partial class Expenses : BaseEntity
    {
        public Expenses()
        {
            this.MonthsExpenses = new List<MonthsExpenses>();
        }
        public String Name { set; get; }
        public String Description { set; get; }
        public Decimal Value { set; get; }
        public String Account { set; get; }
        [NotMapped]
        public Decimal Total { get { return Value * MonthsExpenses.Count; } }
        public virtual ICollection<MonthsExpenses> MonthsExpenses { set; get; }
    }
}
