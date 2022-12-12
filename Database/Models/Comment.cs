using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SweetShop.Database.Models
{
    public class Comment
    {       
        public Guid Id { get; set; }
        public string text { get; set; }
        public DateTime PublishedAt { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        //[ForeignKey("User")]
        public string email { get; set; }
        //public Shop UserShop { get; set; }

        //[ForeignKey("Product")]
        public Guid ProductId { get; set; }
        //public Product Product { get; set; }
        
    }
}
