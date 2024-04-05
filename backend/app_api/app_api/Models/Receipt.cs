namespace app_api.Models
{
    public class Receipt
    {
        public int Id { get; set; }
        public DateTime PurchaseDate { get; set; }
        public float TotalAmount { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public List<Product> Products { get; set; }
    }
}
