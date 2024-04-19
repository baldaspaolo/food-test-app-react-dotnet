namespace app_api.Services.ProductService
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProducts();

        Task<Product> GetProductById(int id);

        
    }
}
