namespace SweetShop.ModelView
{
    public class OrderView2
    {
        public Guid id { get; set; } = Guid.Empty;
        public DateTime createdat { get; set; }=DateTime.Now;
        public DateTime deliverydate { get; set; } = DateTime.Now;
        public string status { get; set; } = "";
        public decimal amount { get; set; }
        public Guid productid { get; set; }=Guid.Empty;
        public string decription { get; set; } = "";
        public string name { get; set; } = "";
        public decimal price { get; set; }
    }
}
