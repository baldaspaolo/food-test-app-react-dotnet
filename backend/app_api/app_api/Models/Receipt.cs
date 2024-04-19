namespace app_api.Models
{
    public class Receipt
    {
        public int Id { get; set; }

        public decimal? Total { get; set; }

        public int userId { get; set; }

        public User? User { get; set; }

        public List<ReceiptProduct>? ReceiptProducts { get; set; }

    }
}
