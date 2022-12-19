using System.Data.SqlTypes;

namespace SweetShop.Database.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        //ICollection<Category> Categories { get; set; }
        //ICollection<Image> Images { get; set; }
        //ICollection<Tag> Tags { get; set; }
    }
}
