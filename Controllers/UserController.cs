using Microsoft.AspNetCore.Mvc;
using SweetShop.Database;
using SweetShop.Database.Models;
using SweetShop.Extenstions;
using SweetShop.Services;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public DataContext db = new();

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<User> Login(string email, string password)
        {
            try
            {
                var user = db.GetUser(email);
                var confirm = user.PasswordHash;
                if (CryptographyExtention.Verify(password, confirm))
                {
                    return user;
                }
                else
                {
                    return new BadRequestObjectResult(new User());
                }
            }
            catch
            {

                return new BadRequestObjectResult(new User());
            }

        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<User> Rigister(string email, string password)
        {

            var emails = db.IsFreeEmail(email);
            if (emails == true)
            {
                var id = db.AddUser("", "", email, "", password);
                db.AddCart(id);
                return db.GetUser(email);
            }
            else
            {
                return new BadRequestObjectResult(new User());
            }

        }
        [HttpPut("update")]
        public IActionResult Update(Guid id, string firstname, string lastname, string mobile)
        {
            db.UpdateUser(id, firstname, lastname, mobile);
            //try
            //{
                
            //}
            //catch (InvalidOperationException ex)
            //{
            //    return new BadRequestObjectResult(ex.Message);
            //}
            return new OkResult();
        }
    }
}
