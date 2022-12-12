using SweetShop.Database.Models;

namespace SweetShop.Database
{
    public class DataBaseInitializer
    {
        public DataContext dataContext = new ();
        private Guid userid { get; set;}
        private Guid categoryid { get; set;}
        private Guid tagid { get; set;}
        private Guid productid { get; set;}
        private Guid shopid { get; set;}
        private Guid cartid { get; set;}
        private Guid adressid { get; set;}
        private Guid orderid { get; set;}

        public DataBaseInitializer()
        {
            //userid = dataContext.AddUser("", "", "", "", "");
            //categoryid = dataContext.AddCategory("", "");
            //tagid = dataContext.AddTag("test1");
            //var tagid2 = dataContext.AddTag("test2");
            //var tagid3 = dataContext.AddTag("test3");
            //productid = dataContext.AddProduct("test", "test", 555.5M);
            //dataContext.AddProductTag(tagid, productid);
            //dataContext.AddProductTag(tagid2, productid);
            //dataContext.AddProductTag(tagid3, productid);
            //var user1 = Guid.Parse("9341FF42-5DF3-4950-976A-CAF882496588");
            //var product1 = Guid.Parse("B27E11AD-D884-45FC-B2E5-FE62662B3DCC");
            //var shop1 = Guid.Parse("6485C1E9-30FC-40B5-92E0-C73D76EC7165");
            //dataContext.AddProduct("test1", "test1", 2f);
            //dataContext.AddProductShop(productid, shop1);
            //dataContext.AddProductReview(user1, product1, "test1", "test1", 1f);
            //dataContext.AddProductReview(user1, product1, "test1", "test1", 4f);
            //dataContext.AddProductReview(user1, product1, "test1", "test1", 2f);
            //dataContext.AddProductReview(user1, product1, "test1", "test1", 5f);
            //dataContext.AddProductReview(user1, product1, "test1", "test1", 4f);
            //dataContext.AddProductReview(user1, product1, "test1", "test1", 4f);
            //shopid = dataContext.AddShop(userid, "", "", "");
            //cartid = dataContext.AddCart(userid);
            //adressid = dataContext.AddAddress(shopid, "", "", "", "", "");
            //orderid = dataContext.AddOrder(userid, adressid, (DateTime.UtcNow).AddDays(1),"in progress");


            //dataContext.AddComment(userid, productid, "");
            //dataContext.AddProductCategory(productid, categoryid);
            //dataContext.AddProductReview(productid, userid, "", "", 4f);
            //dataContext.AddProductShop(productid, shopid);
            //dataContext.AddOrderLine(orderid, productid, 3, 33.3f);
            //dataContext.AddTransaction(orderid, "in progress", 33.3f, "");
            //dataContext.AddProductTag(tagid, productid);
            //dataContext.AddCartItem(cartid, productid, 3);
        }
    }
}
