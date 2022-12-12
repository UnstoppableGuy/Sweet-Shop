using System.ComponentModel.DataAnnotations;

namespace SweetShop.Database.Models
{
    public class Image
    {
        public Guid Id { get; set; }
        public string URL { get; set; }
    }
}
