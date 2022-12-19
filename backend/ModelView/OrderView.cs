namespace SweetShop.ModelView
{
    public class OrderView
    {
        public Guid id { get; set; } = Guid.Empty;
        public DateTime createdat { get; set; } = DateTime.Now;
        public DateTime deliverydate { get; set; } = DateTime.Now;
        public string status { get; set; } = "";
        public decimal amount { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNumber { get; set; }
        public string PostalCode { get; set; }
    }
}
