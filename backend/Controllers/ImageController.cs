using Microsoft.AspNetCore.Mvc;
using SweetShop.Database;
using SweetShop.Database.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        public DataContext db = new ();

        [HttpPost("Add")]
        public void Post(string url, Guid productid)
        {
            db.AddImage(url, productid);
        }

        [HttpDelete("Delete")]
        public void Delete(Guid id)
        {
            db.DeleteImage(id);      
        }
    }
}
