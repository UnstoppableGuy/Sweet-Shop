using Microsoft.AspNetCore.Mvc;
using SweetShop.Database;
using SweetShop.Database.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        public DataContext dataContext = new();
        [HttpGet]
        public IEnumerable<Database.Models.Log> Get()
        {
            return dataContext.GetAllLogs();
        }
    }
}
