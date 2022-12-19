using Microsoft.AspNetCore.Mvc;
using SweetShop.Database;
using SweetShop.Database.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        public DataContext db = new ();

        [HttpGet]
        public IEnumerable<Tag> Get()
        {
            return db.GetAllTags();
        }

        [HttpPost]
        public void Post(string text)
        {
            db.AddTag(text);
        }

    }
}
