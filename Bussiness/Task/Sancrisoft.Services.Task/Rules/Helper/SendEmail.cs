using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Sancrisoft.Services.Task.Helper
{
    public class SendEmail
    {
        MailMessage email = new MailMessage();
        public SendEmail(String to, String from, String subject, String body, bool isHtml)
        {
            email.To.Add(new MailAddress(to));
            email.From= new MailAddress(from);
            email.Subject = subject;
            email.Body = body;
            email.IsBodyHtml = isHtml;
        }
        public void SubmitEmail(String host, int port,bool isEnableSSl, bool isUseCredencial, String user, String password)
        {
            SmtpClient smtp = new SmtpClient();
            smtp.Host = host;
            smtp.Port = port;
            smtp.EnableSsl = isEnableSSl;
            smtp.UseDefaultCredentials = isUseCredencial;
            smtp.Credentials = new NetworkCredential(user, password);
            smtp.Send(email);
            email.Dispose();
        }
    }
}
