namespace SweetShop.Database.Models
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public string Status { get; set; }
        public decimal Amount { get; set; }
        public string TransactionCode { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set;}
        public Guid OrderId { get; set; }
        //public Order Order { get; set; }
        
    }
}
