using Arquitectura.Entity.Model.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Process.Entity.Models
{
    public class BalanceSheet : BaseEntity
    {
        public BalanceSheet()
        {
            this.BalanceExpenses = new List<BalanceExpenses>();
        }
        public Month? Month { set; get; }
        public int Year { set; get; }
        [NotMapped]
        public String Name
        {
            get
            {
                return Month.ToString();
            }
        }
        [NotMapped]
        public Decimal TotalIncome { set; get; }
        [NotMapped]
        public Decimal TotalExpenses { set; get; }
        [NotMapped]
        public Decimal SubTotal
        {
            set; get;
        }
        public virtual ICollection<BalanceExpenses> BalanceExpenses { set; get; }

        public bool Islock { set; get; } = false;
    }
}
