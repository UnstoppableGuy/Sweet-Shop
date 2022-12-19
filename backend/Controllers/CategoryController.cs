using Microsoft.AspNetCore.Mvc;
using SweetShop.Database;
using SweetShop.Database.Models;
using SweetShop.ModelView;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public DataContext db = new();

        [HttpGet]
        public List<Category> Get()
        {
            return db.GetAllCategories();
        }

        [HttpPut("NewCategory")]
        public IActionResult Add(string name, string description)
        {
            try
            {
                db.AddCategory(name, description);
            }
            catch
            {
                return new BadRequestResult();
            }
            return new OkResult();
        }
    }
}
