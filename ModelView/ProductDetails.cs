using Dropbox.Api.Files;
using SweetShop.Database.Models;
using System.Collections.Generic;
using Tag = SweetShop.Database.Models.Tag;

namespace SweetShop.ModelView
{
    public class ProductDetails: ProductShort
    {
        public double rating { get; set; }
        public Shop shop { get; set; }
        public Adress address { get; set; }
        public ProductDetails(double rating, ProductShort products, Shop shop, Adress address) :
            base(products.product, products.images)
        {
            this.rating = rating;
            this.shop = shop;
            this.address = address;
        }
    }
}
