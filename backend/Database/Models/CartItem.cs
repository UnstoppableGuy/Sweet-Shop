namespace SweetShop.Database.Models
{
    public class CartItem
    {
        public Guid Id { get; set; }
        public int qty { get; set; }
        public Guid ProductId { get; set; }
        public Guid CartId { get; set; }
        //public Product Product { get; set; }
    }
}
