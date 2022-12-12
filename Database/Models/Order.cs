using System.ComponentModel.DataAnnotations.Schema;

namespace SweetShop.Database.Models
{
    public enum Status
    {
        Success,
        InProgress,
        Fail      
    }
    public class Order
    {
        public Guid Id { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime DeliveryDate { get; set;}

        //[ForeignKey("User")]
        public Guid UserId { get; set; }
        //public User User { get; set; }

        //[ForeignKey("Adress")]
        public Guid AdressId { get; set; }
        //public Adress Adress { get; set; }

    }
}
