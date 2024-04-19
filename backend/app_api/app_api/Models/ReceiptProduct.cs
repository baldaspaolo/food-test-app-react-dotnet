namespace app_api.Models
{
    public class ReceiptProduct
    {
        public int ReceiptId { get; set; }

        public Receipt? Receipt { get; set; }

        public int ProductId { get; set; }

        public Product? Product { get; set; }

        public int Quantity { get; set; }
    }
}
