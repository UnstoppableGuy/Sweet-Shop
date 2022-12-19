using System.Net.Mail;
using System.Net;

namespace SweetShop.Services
{
    public class EmailSenderService
    {

        public void Review(string from, string to, string message)
        {
            MailAddress fromuser = new MailAddress("pavel.takunov@mail.ru", $"SweetShop: Review from {from}");
            MailAddress touser = new MailAddress(to);
            MailMessage m = new MailMessage(fromuser, touser);
            m.Subject = "Review";
            m.Body = message;

            SmtpClient smtpClient = new SmtpClient("smtp.mail.ru", 587);
            smtpClient.Credentials = new NetworkCredential("pavel.takunov@mail.ru", "yBeKpF71tmeR7qwih4GA");
            smtpClient.EnableSsl = true;
            try
            {
                smtpClient.Send(m);
            }
            catch
            {

            }
        }


        public bool SendNotification(string mail, decimal amount)
        {
            MailAddress from = new MailAddress("", "SweetShop");

            MailAddress to = new MailAddress(mail);
            MailMessage m = new MailMessage(from, to);

            m.Subject = "Оплата";
            m.Body = $"Вами была совершена покупка на сумму: {amount}. Данную покупку вы можете забрать по адресу Belarus, Minsk, Pushkina St, 30";

            SmtpClient smtpClient = new SmtpClient("", 587);
            smtpClient.Credentials = new NetworkCredential("", "");
            smtpClient.EnableSsl = true;
            try
            {
                smtpClient.Send(m);
                return true;
            }
            catch
            {
                return false;
            }

        }
    }
}
