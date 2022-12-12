using SweetShop.Database.Models;

namespace SweetShop.ModelView
{
    public class ProductShort
    {
        public Product product { get; set; }
        public List<Image> images { get; set; }
        public ProductShort(Product product,
                            List<Image> images) 
        {
            this.product = product;
            this.images = images;
        }
        public ProductShort(Product product) 
        { 
            this.product = product;
        }
    }
}
