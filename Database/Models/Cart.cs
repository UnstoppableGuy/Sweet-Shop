namespace SweetShop.Database.Models
{
    public class Cart
    {
        public Guid Id { get; set; }
        //public DateTime Created { get; set; }
        public Guid UserId { get; set; }
        //public User User { get; set; }//
    }
}
