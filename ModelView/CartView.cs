using SweetShop.Database.Models;

namespace SweetShop.ModelView
{
    public class CartView
    {
        public CartView(CartView cv)
        {
            this.productid = cv.productid;
            this.name = cv.name;
            this.description = cv.description;
            this.price = cv.price;
            this.qty = cv.qty;
        }
        public CartView() { }

        public Guid productid { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public decimal price { get; set; }
        public int qty { get; set; }

    }
    public class FullCartView : CartView
    {
        public Image image { get; set; }

        public FullCartView(CartView cv, Image image):
            base(cv)
        {
            this.image = image;
        }
    }
}
