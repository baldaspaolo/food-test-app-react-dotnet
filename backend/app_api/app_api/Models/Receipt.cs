namespace app_api.Models
{
    public class Receipt
    {
        public int Id { get; set; }

        public decimal? Total { get; set; }

        public string? Name { get; set; }

        public string? Surname { get; set; }

        public string? Email { get; set; }

        public string? Address { get; set; }

        public string? City { get; set; }

        public string? Region { get; set; }

        public string? PostalCode { get; set; }

        public string? Country { get; set; }

        public string? Phone { get; set; }

        public string? OrderType { get; set; }


        public int userId { get; set; }

        public User? User { get; set; }

        public List<ReceiptProduct>? ReceiptProducts { get; set; }

    }
}
