using SweetShop.Database.Models;

namespace SweetShop.ModelView
{
    public class ProductFull : ProductShort
    {
        public List<Tag> tags { get; set; }
        public List<Category> categories { get; set; }
        public ProductFull(Product product,
                           List<Image> image,
                           List<Tag> tags,
                           List<Category> categories)
            :base(product,image)
        {
            this.tags = tags;
            this.categories = categories;
        }
        public ProductFull(Product product,
                           List<Tag> tags,
                           List<Category> categories) :
            base(product)
        {
            this.tags = tags;
            this.categories = categories;
        }
        public ProductFull(Product product,
                           List<Tag> tags,
                           List<Image> images) :
            base(product,images)
        {
            this.tags = tags;
        }
    }
}
