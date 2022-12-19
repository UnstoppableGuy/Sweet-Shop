using Microsoft.AspNetCore.Mvc;
using SweetShop.Database;
using SweetShop.Database.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SweetShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        public DataContext db = new();

        [HttpGet("GetComments")]
        public List<Comment> Get(Guid id, int page=1)
        {
            return db.GetProductComments(id, page);
        }

        [HttpGet("GetMyComments")]
        public List<Comment> GetMy(Guid id, Guid productid, int page=1)
        {
            return db.GetUserComments(id, productid, page);
        }

        [HttpPost("create")]
        public IActionResult Set(Guid userid, Guid productid, string message)
        {
            db.AddComment(userid, productid, message);
            //try
            //{
            //    db.AddComment(userid, productid, message);                
            //}
            //catch
            //{
            //    return new BadRequestObjectResult("Unready");
            //}
            return new OkResult();
        }

        [HttpPut("update")]
        public void Put(Guid id, Guid userid, Guid productid, string message)
        {
            db.UpdateComment(id, productid, userid, message);
            //try
            //{
            //    db.UpdateComment(id, productid, userid, message);
            //    return new OkResult();
            //}
            //catch
            //{
            //    return new BadRequestResult();
            //}           
        }
        
    }
}
