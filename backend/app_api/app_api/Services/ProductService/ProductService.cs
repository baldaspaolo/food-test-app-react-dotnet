
using app_api.Data;
using Microsoft.EntityFrameworkCore;

namespace app_api.Services.ProductService
{
    public class ProductService : IProductService
    {
        private readonly DataContext _dbContext;

        public ProductService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

       

        public async Task<List<Product>> GetAllProducts()
        {
            var products = await _dbContext.Products.Include(c=> c.Category).ToListAsync();
            return products;

        }

        public async Task<Product> GetProductById(int id)
        {
            var product = await _dbContext.Products.FindAsync(id);
            return product;
        }

      
    }
}
