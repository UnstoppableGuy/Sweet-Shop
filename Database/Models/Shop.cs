namespace SweetShop.Database.Models
{
    public class Shop
    {
        public Guid Id { get; set; } = Guid.Empty;
        public Guid UserId { get; set; }= Guid.Empty;
        public string Name { get; set; } = "";
        public string IPNumber { get; set; } = "";
        public string Description { get; set; } = "";

    }
}
    