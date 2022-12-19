namespace SweetShop.Database.Models
{
    public class OrderLine
    {
        public Guid Id { get; set; }
        public int qty { get; set; }
        public decimal Price { get; set; }
        public Guid OrderId { get; set; }   
        public Guid Productid { get; set; } 
    }
}
