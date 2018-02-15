using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinanControl.Api.Controllers
{
    public class ViewUsers
    {
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String PasswordOld { get; set; }
        public String NewPassword { get; set; }
        public String ConfirmPassword { get; set; }
        public String Comments { get; set; }
        public String UserName { get; set; }
        public String Email { get; set; }
        public bool Status { get; set; }
    }
}