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
        public IActionResult Index(Guid userid, string status, string code, decimal amount)
        {
            var cartid = db.GetCartId(userid);
            var user = db.SelfUser(userid);
            EmailSenderService ess = new();
            //TODO testing all


            var orderid = db.AddOrder(userid, Guid.Parse("F6D23162-EF1F-42CC-B89A-5A9FF3D9224C"), (DateTime.Now).AddDays(3), status);
            Console.WriteLine($"orderid {orderid}");
            
            var transaction = db.AddTransaction(orderid, status, amount, code);
            Console.WriteLine($"transactionid {transaction}");

            var cart = db.GetCart(userid);          
            
            foreach (var item in cart)
            {
                Console.WriteLine($"{item.productid}\t{item.qty}\t{item.price}");
                db.AddOrderLine(orderid, item.productid, item.qty, item.price);
            }
            
            if (status == "COMPLETED")
            {
                db.DeleteAllCartItem(cartid.Id);
                ess.SendNotification(user.Email, amount);
            }
            else 
            {
                return new BadRequestResult();
            }              
            return new OkResult();
        }
    }
}
