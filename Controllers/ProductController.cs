using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Net.Http.Headers;
using SweetShop.Database;
using SweetShop.Database.Models;
using SweetShop.ModelView;
using System.Diagnostics;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public DataContext db = new();

        [HttpGet]
        public IEnumerable<ProductFull> Get(int page)
        {
            var products = db.GetProducts(page);
            List<ProductFull> pfv = new();
            foreach (var product in products)
            {
                var pr = db.GetProduct(product.Id);
                var cat = db.GetCategories(pr.Id);
                var img = db.GetImages(pr.Id);
                var tags = db.GetTags(pr.Id);
                pfv.Add(new ProductFull(pr, img, tags, cat));
            }
            return pfv;
        }

        [HttpGet("Category")]
        public List<ProductFull> Get(Guid categoryid, int page)
        {
            var products = db.GetProductsById(categoryid, page);
            List<ProductFull> productsFull = new();

            foreach (var item in products)
            {
                var img = db.GetImages(item.Id);
                var tags = db.GetTags(item.Id);
                productsFull.Add(new ProductFull(item, tags, img));
            }
            return productsFull;
        }

        [HttpGet("CountInCategory")]
        public int Count(Guid id)
        {
            return db.GetCountProduct(id);
        }

        [HttpGet("Count")]
        public int GetCount()
        {
            return db.GetCountProduct();
        }
        [HttpGet("SearchBy")]
        public IEnumerable<ProductFull> Search(string text, string page)
        {
            var products = db.Search(text, page);
            List<ProductFull> pfv = new();
            foreach (var product in products)
            {
                var pr = db.GetProduct(product.Id);
                var cat = db.GetCategories(pr.Id);
                var img = db.GetImages(pr.Id);
                var tags = db.GetTags(pr.Id);
                pfv.Add(new ProductFull(pr, img, tags, cat));
            }
            return pfv;
        }
        [HttpGet("SearchCount")]
        public int GetCountElements(string text, string page)
        {
            return db.SearchCount(text, page);
        }


        [HttpGet("GetById")]
        public ProductDetails Get(Guid productid)
        {
            double rating = db.GetRaiting(productid);
            Console.WriteLine($"rating in GETBYID {rating}");
            Product product = db.GetProduct(productid);

            var ps = db.GetProductShop(productid);
            var adress = db.GetAdress(ps.ShopId);

            var images = db.GetImages(product.Id);
            Console.WriteLine(ps.ShopId);
            var shop = db.GetShop2(ps.ShopId);
            return new ProductDetails(rating, new ProductShort(product, images), shop, adress);
            //try
            //{
            //    var shop = db.GetShop(ps.ShopId);
            //    return new ProductDetails(rating, new ProductShort(product, images), shop,adress);
            //}
            //catch
            //{
            //    var shop = new Shop();
            //    return new ProductDetails(rating, new ProductShort(product, images), shop, adress);
            //}

            //var pv = new ProductDetails(rating, shorts, shop);
            //return pv;
        }

        [HttpPost("create")]
        public IActionResult Add(Guid userid, string name, string description, decimal price, string url, Guid categoryId, Guid tagsid)
        {
            try
            {
                var product = db.AddProduct(name, description, price);
                db.AddImage(url, product);
                db.AddProductCategory(product, categoryId);
                db.AddProductCategory(product, Guid.Parse("00000000-0000-0000-0000-000000000000"));
                var shopid = db.GetShopByUser(userid).Id;
                Console.WriteLine($"Shopid:{shopid}\tUserid:{userid}\tProductid:{product}");
                db.AddProductShop(product, shopid);
            }
            catch (InvalidOperationException ex)
            {
                return new BadRequestObjectResult(ex.Message);
            }
            return new OkResult();

        }

        [HttpPut("update")]
        public IActionResult Put(Guid userid, Guid productid, decimal price, string url, Guid tagsid)
        {
            var products = db.GetShopProducts(userid);
            bool access = false;
            foreach (var item in products)
            {
                if (item.Id == productid)
                    access = true;
            }
            if (access == true)
            {
                db.UpdateProduct(price, productid);
                return new OkResult();
            }
            else return new BadRequestResult();
        }
    }
}
