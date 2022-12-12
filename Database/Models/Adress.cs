using System.ComponentModel.DataAnnotations.Schema;

namespace SweetShop.Database.Models
{
    public class Adress
    {
        public Guid Id { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street{ get; set; }
        public string HouseNumber { get; set; }
        public string PostalCode { get; set; }

        //[ForeignKey("User")]
        public Guid ShopId { get; set; }
        //public Shop UserShop { get; set; }

    }
}
