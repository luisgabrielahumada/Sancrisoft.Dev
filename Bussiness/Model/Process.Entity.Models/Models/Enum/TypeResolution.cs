using Arquirectura.Helper.Core.Enumumerable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public enum TypeResolution
{
    [StringValue("Invoice")]
    Invoice,
    [StringValue("Cash Receipt")]
    CashReceipt
}
