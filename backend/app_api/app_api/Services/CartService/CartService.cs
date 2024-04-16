
using Microsoft.EntityFrameworkCore;

namespace app_api.Services.CartService
{
    public class CartService : ICartService
    {
        public readonly DataContext _dbContext;

        public CartService(DataContext dataContext)
        {
            _dbContext = dataContext;
        }
        public async Task<Cart> GetUserCart(int id)
        {
            var cart = await _dbContext.Carts.FirstOrDefaultAsync(c => c.userId == id);
            return cart;
        }
    }
}
