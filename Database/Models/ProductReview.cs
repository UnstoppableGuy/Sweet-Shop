namespace SweetShop.Database.Models
{
    public class ProductReview
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public double Rating { get; set; }
        public DateTime PublishedAt { get; set; }
        public Guid ProductId { get; set; }
        //public Product Prodcut { get; set; }
        public string email { get; set;}
        //public User User{ get; set; }
    }
}
