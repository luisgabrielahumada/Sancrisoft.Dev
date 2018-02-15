using Arquitectura.Bussiness.Infrastructure.Core.Repository;
using Arquitectura.Core.DomainExceptions;
using Arquitectura.Entity.Model.Models;
using Configuration.Entity.Models;
using Newtonsoft.Json;
using Process.Entity.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
namespace Process.Services.Task
{
    public class BalanceSheetService : IBalanceSheet
    {
        private IRepositoryBase<BalanceSheet> dbBalance;
        private IRepositoryBase<Income> dbIncome;
        private IRepositoryBase<Expenses> dbExpenses;

        public BalanceSheetService(IRepositoryBase<Income> _dbIncome, IRepositoryBase<Expenses> _dbExpenses, IRepositoryBase<BalanceSheet> _dbBalance)
        {
            dbBalance = _dbBalance;
            dbIncome = _dbIncome;
            dbExpenses = _dbExpenses;
        }
        public List<Year> YearBalance(Guid UpdatedId)
        {
            var queyBalance = dbBalance.GetQuery(m => m.UpdatedId == UpdatedId );

            var years = queyBalance
                .GroupBy(m => m.Year)
                .Select(arg => new Year { Id = arg.Key, Name = arg.Key.ToString() });

            return years.ToList();
        }
        public BalanceSheet Balance(int month, int year, Guid UpdatedId)
        {
            BalanceSheet q = new BalanceSheet();
            List<Income> income = new List<Income>();
            List<BalanceExpenses> balanceExpenses = new List<BalanceExpenses>();
            var queyBalance = dbBalance
                                    .GetByWhere(m => m.Month == (Month)month && m.Year == year && m.UpdatedId == UpdatedId, k => k.BalanceExpenses);
            var queryIncome = dbIncome
                                 .GetQuery(m => m.Status == true && m.UpdatedId == UpdatedId);
            var queryExpenses = dbExpenses.GetQuery(m => m.Status == true && m.UpdatedId == UpdatedId)
                                             .OrderBy(k => k.Id);
            foreach (var item in queryExpenses)
            {
                var b = item
                        .MonthsExpenses
                        .Where(t => t.Value == (Month)month);
                if (b.Count() >= 1)
                    balanceExpenses.Add(new BalanceExpenses
                    {
                        Creation = DateTime.Now,
                        Description = item.Description,
                        Expenses = new Expenses { Id = item.Id, Value = item.Value, Description = item.Description, Account=item.Account },
                        Name = item.Name,
                        Status = true,
                        Updated = DateTime.Now,
                        UpdatedId = item.UpdatedId,
                        Value = item.Value,
                        Month = (Month)month,
                        IsPayment = false
                    });
            }
            if (queyBalance != null)
            {
                var expensesId = new HashSet<Guid>(queyBalance.BalanceExpenses.Select(x => x.Expenses.Id));
                var addExpenses = balanceExpenses.Where(x => !expensesId.Contains(x.Expenses.Id));
                foreach (var item in addExpenses)
                {
                    queyBalance.BalanceExpenses.Add(new BalanceExpenses
                    {
                        Creation = item.Creation,
                        Description = item.Description,
                        IsPayment = false,
                        Expenses = item.Expenses,
                        Month = item.Month,
                        Name = item.Name,
                        Status = true,
                        Updated = item.Updated,
                        UpdatedId = item.UpdatedId,
                        Value = item.Value
                    });
                }
                var queryMonthIncomeOld = queryIncome.Where(m => (m.MonthsIncome.Where(k => k.Value == (Month)month).Count() > 0) == true);
                queyBalance.BalanceExpenses = queyBalance.BalanceExpenses;
                queyBalance.TotalIncome = queryMonthIncomeOld.Sum(m => m.Value);
                queyBalance.TotalExpenses = queyBalance
                                      .BalanceExpenses
                                      .Where(l => l.IsPayment == true)
                                      .Sum(m => m.Value);
                queyBalance.SubTotal = queyBalance.TotalIncome - queyBalance.TotalExpenses;
                return queyBalance;
            }
            var queryMonthIncomeNew = queryIncome.Where(m => (m.MonthsIncome.Where(k => k.Value == (Month)month).Count() > 0) == true);
            q = new BalanceSheet
            {
                Month = (Month)month,
                Year = year,
                BalanceExpenses = balanceExpenses,
                TotalIncome = queryMonthIncomeNew.Sum(m => m.Value),
                TotalExpenses = balanceExpenses.Sum(t => t.Value),
                SubTotal = 0
            };
            return q;


        }

        public void Apply(BalanceSheet item, Guid UpdatedId)
        {
            var Q = dbBalance.GetByWhere(m => m.Month == item.Month && m.Year == item.Year && m.UpdatedId == UpdatedId);

            //Check.IsNull(Q, $"Existen Registro para esta combinacion {item.Month} y {item.Year}.");
            if (Q == null)
            {
                item.State = ObjectState.Added;
                item.UpdatedId = UpdatedId;
                foreach (var row in item.BalanceExpenses)
                {
                    row.State = ObjectState.Added;
                    row.UpdatedId = UpdatedId;
                }
                dbBalance.Save(item);
            }
            else
            {
                Check.IsNotEquals(Q.Islock, true, $"No se pueden realizar operacion por que el mes esta cerrado {item.Month} y {item.Year}.");
                Q.Month = item.Month;
                Q.Year = item.Year;
                Q.Status = item.Status;
                Q.State = ObjectState.Modified;
               
                Q.UpdatedId = UpdatedId;
                foreach (var row in Q.BalanceExpenses)
                {
                    var k = item
                      .BalanceExpenses
                      .Where(t => t.Expenses.Id == row.Expenses.Id)
                      .FirstOrDefault();
                    if (k == null) continue;
                    row.IsPayment = k.IsPayment;
                    row.TypePayment = k.TypePayment;
                    row.Value = k.Value;
                    row.State = ObjectState.Modified;
                    row.UpdatedId = UpdatedId;
                }
                var diff = item
                           .BalanceExpenses
                           .Where(p => !Q.BalanceExpenses.Any(p2 => p2.Expenses.Id == p.Expenses.Id));
                foreach (var row in diff)
                {
                    row.State = ObjectState.Added;
                    Q.BalanceExpenses.Add(row);
                }
                dbBalance.Save(Q);
            }
        }

        public void Rejected(BalanceSheet item, Guid UpdatedId)
        {
            var Q = dbBalance.GetByWhere(m => m.Month == item.Month && m.Year == item.Year && m.UpdatedId == UpdatedId);
            Check.IsNotNull(Q, $"No Existen Registro para esta combinacion {item.Month} y {item.Year}.");
            Check.IsNotEquals(Q.Islock, true, $"No se pueden realizar operacion por que el mes esta cerrado {item.Month} y {item.Year}.");
            Q.State = ObjectState.Modified;
            Q.UpdatedId = UpdatedId;
            foreach (var row in Q.BalanceExpenses)
            {
                var k = item
                  .BalanceExpenses
                  .Where(t => t.Expenses.Id == row.Expenses.Id)
                  .FirstOrDefault();
                if (k == null) continue;
                row.IsPayment = k.IsPayment;
                row.TypePayment = null;
                row.State = ObjectState.Modified;
                row.UpdatedId = UpdatedId;
            }
            dbBalance.Save(item);
        }

        public BalanceSheet BalanceOfMonth(Guid UpdatedId)
        {
            var month = DateTimeOffset.Now.Month;
            var year = DateTimeOffset.Now.Year;
            var queyBalance = dbBalance
                                  .GetByWhere(m => m.Month == (Month)month && m.Year == year && m.UpdatedId == UpdatedId, k => k.BalanceExpenses);

            return queyBalance;
        }

        public dynamic BalanceMonthPayment(Guid UpdatedId)
        {
            var year = DateTimeOffset.Now.Year;
            var queryIncome = dbIncome
                                .GetQuery(m => m.Status == true && m.UpdatedId == UpdatedId);
            var queyBalance = dbBalance
                                  .GetQuery(m => m.Year == year && m.UpdatedId == UpdatedId, k => k.BalanceExpenses);

            var totalsMonth = new List<dynamic>();
            foreach (var sheet in queyBalance)
            {
                var queryMonthIncomeOld = queryIncome.Where(m => (m.MonthsIncome.Where(k => k.Value == (Month)sheet.Month).Count() > 0) == true);
                var totalIncome = queryMonthIncomeOld.Sum(m => m.Value);

                totalsMonth.Add(sheet.BalanceExpenses
                                .Where(m => m.IsPayment == true)
                                .GroupBy(l => l.Month)
                             .Select(g =>
                                   new
                                   {
                                       Month = g.Key,
                                       Name = g.Key.ToString(),
                                       TotalMonth = totalIncome - g.Sum(w => w.Value)
                                   }).OrderByDescending(m => m.Month));
            }
            return JsonConvert.SerializeObject(totalsMonth);
        }

        public void Lock(BalanceSheet item, Guid UpdatedId)
        {
            var Q = dbBalance.GetByWhere(m => m.Id == item.Id && m.Islock == false);
            Q.Islock = true;
            Q.State = ObjectState.Modified;
            Q.Updated = DateTime.Now;
            dbBalance.Save(Q);
        }
        public void UnLock(BalanceSheet item, Guid UpdatedId)
        {
            var Q = dbBalance.GetByWhere(m => m.Id == item.Id && m.Islock == true);
            Q.Islock = false;
            Q.State = ObjectState.Modified;
            Q.Updated = DateTime.Now;
            dbBalance.Save(Q);
        }

        public void Delete(BalanceSheet item, Guid UpdatedId)
        {
            var Q = dbBalance.GetByWhere(m => m.Month == item.Month && m.Year == item.Year && m.UpdatedId == UpdatedId);
            Check.IsNotNull(Q, $"No Existen Registro para esta combinacion {item.Month} y {item.Year}.");
            Check.IsNotEquals(Q.Islock, true, $"No se pueden realizar operacion por que el mes esta cerrado {item.Month} y {item.Year}.");
            Q.State = ObjectState.Modified;
            Q.UpdatedId = UpdatedId;
            foreach (var row in Q.BalanceExpenses)
            {
                var k = item
                  .BalanceExpenses
                  .Where(t => t.Expenses.Id == row.Expenses.Id)
                  .FirstOrDefault();
                if (k == null) continue;
                row.IsPayment = k.IsPayment;
                row.TypePayment = null;
                row.State = ObjectState.Deleted;
                row.UpdatedId = UpdatedId;
            }
            dbBalance.Delete(item);
        }
    }
}
