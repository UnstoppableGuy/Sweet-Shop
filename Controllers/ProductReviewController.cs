using Dropbox.Api.TeamLog;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SweetShop.Database;
using SweetShop.Database.Models;
using SweetShop.ModelView;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductReviewController : ControllerBase
    {
        public DataContext db = new();

        [HttpGet("GetReviews")]
        public List<ProductReview> Get(Guid productid, int page = 1)
        {
            return db.GetProductReviews(productid, page);

            // try
            // {
            //     return db.GetProductReviews(productid, page);
            // }
            // catch
            // {
            //     return new List<ProductReview>();
            // }
        }

        [HttpGet("GetMyReviews")]
        public List<ProductReview> GetMy(Guid productid, Guid userid, int page = 1)
        {
            return db.GetUserProductReview(userid, productid, page);
            //try
            //{
            //    return db.GetUserProductReview(userid, productid, page);
            //}
            //catch
            //{
            //    return new List<ProductReview>();
            //}
        }

        [HttpPost("Create")]
        public IActionResult Post(Guid productid, Guid userid, string text, string rating, string title="")
        {
            bool count = db.CheckReview(userid, productid);

            if (count==true)
            {
                Console.WriteLine($"Porduct: {productid}\nUser: {userid}\nCount:{count}");
                db.UpdateProductReview(productid, userid, text, float.Parse(rating));
                return new OkObjectResult("Update");
            }
            else
            {
                db.AddProductReview(productid, userid, title, text, float.Parse(rating));
                return new OkObjectResult("Create new"); 
            }
        }
    }
}
