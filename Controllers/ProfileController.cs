using Microsoft.AspNetCore.Mvc;
using SweetShop.Database;
using SweetShop.Database.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Xml.Linq;
using Dropbox.Api.Users;
using SweetShop.ModelView;
using Microsoft.AspNetCore.Mvc.RazorPages;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        public DataContext db = new ();

        [HttpGet("my")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ProfileView> Get(Guid userid)
        {
            try
            {
                return db.GetShop(userid);
            }
            catch
            {
                return new BadRequestObjectResult(new ProfileView());
            }
        }

        [HttpPost]
        public IActionResult Post(Guid userid, string name, string description, string number,
            string country, string city, string street, string housenumber,string postalcode)
        {
            try
            {
                var shopid = db.AddShop(userid, name, description, number);
                db.AddAddress(shopid, country, city, street, housenumber, postalcode);
            }
            catch (InvalidOperationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
            return new OkResult();

        }

        [HttpPut("Address")]
        public void Update(Guid id, string Description, string Name)
        {            
            db.ShopUpdate(id, Description, Name);
        }


        [HttpGet("user/orders")]
        public List<OrderView> GetOrderViews(Guid userid)
        {
            try
            {
                return db.GetOrder(userid);
            }
            catch
            {
                return new List<OrderView>();
            }
        }

        [HttpGet("Products")]
        public List<ProductFull> products(Guid userid)
        {
            var products = db.GetShopProducts(userid);
            List<ProductFull> productsFull = new();
            foreach (var item in products)
            {
                var img = db.GetImages(item.Id);
                var tags = db.GetTags(item.Id);
                productsFull.Add(new ProductFull(item, tags, img));
            }
            return productsFull;
        }
        [HttpGet("Reviews")]
        public List<ProductReview> reviews(Guid userid)
        {
            var products = db.GetShopProducts(userid);
            List<ProductReview> productReviews = new ();
            foreach (var item in products)
            {
                var pr = db.GetProductReviews(item.Id, 1);
                foreach (var p in pr)
                {
                    productReviews.Add(p);
                }
            }
            return productReviews;
        }
        
        [HttpGet("OrderDetails")]
        public List<FullCartView> bought(Guid orderid)
        {          
            var cart = db.GetOrderedProducts(orderid);
            var fcv = new List<FullCartView>();
            for (int i = 0; i < cart.Count; i++)
            {
                var img = db.GetImages(cart[i].productid);
                fcv.Add(new FullCartView(cart[i], img[0]));
            }
            return fcv;
        }
    }
}
