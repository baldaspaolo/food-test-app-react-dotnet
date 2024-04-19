namespace app_api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public string? Brand { get; set; }

        public decimal Price { get; set; }

        public decimal Discount { get; set; }

        public int Quantity { get; set; }

        public Category? Category { get; set; }

        public List<CartProduct> CartProducts { get; set; }




    }
}
