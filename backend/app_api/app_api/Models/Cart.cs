namespace app_api.Models
{
    public class Cart
    {
        public int Id { get; set; }

        public int userId { get; set; }
        public User? User { get; set; }

        public List<CartProduct> CartProducts { get; set; }



    }
}
