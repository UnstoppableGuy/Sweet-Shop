using Microsoft.AspNetCore.Mvc;
using SweetShop.Database;
using SweetShop.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public DataContext db = new();
        public EmailSenderService ess = new();

        [HttpPost]
        public void Index(Guid userid, string status, string code, decimal amount)
        {   
            //TODO testing all
            EmailSenderService ess = new();
            var orderid = db.AddOrder(userid, (DateTime.Now).AddDays(3), status);
            decimal cartamount = 0;
            db.AddTransaction(orderid, status, amount, code);
            var cart = db.GetCart(userid);
            var cartid = db.GetCartId(userid);            
            foreach (var item in cart)
            {
                db.AddOrderLine(orderid, item.productid, item.qty, item.price);
                cartamount += item.qty * item.price;
            }           
            var user = db.SelfUser(userid);
            if (status == "COMPLETED")
            {
                db.DeleteAllCartItem(cartid.Id);
                ess.SendNotification(user.Email, amount);
            }               
        }
    }
}
