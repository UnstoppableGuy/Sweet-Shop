using Microsoft.AspNetCore.Mvc;
using SweetShop.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        public EmailSenderService ess = new();

        [HttpPost]
        public void Post(string from, string to, string message)
        {
            ess.Review(from, to, message);
        }
    }
}
