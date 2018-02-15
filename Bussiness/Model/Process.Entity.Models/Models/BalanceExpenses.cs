using Arquitectura.Entity.Model.Models;
using Configuration.Entity.Models;
using System;

namespace Process.Entity.Models
{
    public partial class BalanceExpenses : BaseEntity
    {
        public String Name { set; get; }
        public String Description { set; get; }
        public Decimal Value { set; get; }
        public Month Month { set; get; }
        public TypePayment? TypePayment { set; get; }

        public bool IsPayment { set; get; }
        public virtual Expenses Expenses { set; get; }
        public virtual BalanceSheet BalanceSheet { set; get; }
    }
}
