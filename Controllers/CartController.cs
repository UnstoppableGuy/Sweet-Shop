using Microsoft.AspNetCore.Mvc;
using SweetShop.Database;
using SweetShop.Database.Models;
using SweetShop.ModelView;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CartController : ControllerBase
    {
        public DataContext db = new();
        private static readonly object locker = new();
        [HttpGet("GetCartById")]
        public ActionResult<List<FullCartView>> Get(Guid userid)
        {
            try
            {
                var cart = db.GetCart(userid);
                var fcv = new List<FullCartView>();
                for (int i = 0; i < cart.Count; i++)
                {
                    var img = db.GetImages(cart[i].productid);
                    fcv.Add(new FullCartView(cart[i], img[0]));
                }
                return fcv;
            }
            catch (InvalidOperationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
        }



        [HttpPost]
        public IActionResult Update(Guid productid, int count, Guid userid)
        {
            Console.WriteLine($"Count:{count}");
            lock (locker)
            {
                try
                {
                    Console.WriteLine("here");
                    var cart = db.GetCart(userid);
                    bool exist = false;
                    foreach (var item in cart)
                    {
                        Console.WriteLine($"Exist: {exist}");
                        if (item.productid == productid)
                        {
                            var cartid = db.GetCartId(userid);
                            db.UpdateCartItem(cartid.Id, productid, count);
                            exist = true;
                            break;
                        }
                    }
                    if (exist == false)
                    {
                        Console.WriteLine($"Exist: {exist}");   
                        var cartid = db.GetCartId(userid);
                        db.AddCartItem(cartid.Id, productid, count);
                    }
                    return new OkResult();
                }
                catch
                {
                    return new BadRequestResult();
                }
            }

        }

        [HttpDelete]
        public IActionResult Delete(Guid productid, Guid userid)
        {
            try
            {
                var cartid = db.GetCartId(userid);
                db.DeleteCartItem(cartid.Id, productid);
            }
            catch (InvalidOperationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
            return new OkResult();
        }
        [HttpDelete("All")]
        public IActionResult DeleteAll(Guid userid)
        {
            try
            {
                var cartid = db.GetCartId(userid);
                db.DeleteAllCartItem(cartid.Id);
            }
            catch (InvalidOperationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
            return new OkResult();
        }
    }
}
