



using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace app_api.Services.CartPorduct
{
    public class CartProductService : ICartProductService
    {
        public readonly DataContext _dbContext;

        public CartProductService(DataContext dataContext)
        {
            _dbContext = dataContext;
        }

        
        public async Task<CartProduct> AddProducts(CartProduct cartProduct)
        {
            var existingCartProduct = await _dbContext.CartProducts
                .FirstOrDefaultAsync(cp => cp.CartId == cartProduct.CartId && cp.ProductId == cartProduct.ProductId);

            if (existingCartProduct != null)
            {
                // If the product already exists, increase the quantity
                existingCartProduct.Quantity += cartProduct.Quantity;
                _dbContext.CartProducts.Update(existingCartProduct);
                await _dbContext.SaveChangesAsync();
                return existingCartProduct;
            }
            else
            {   
                _dbContext.CartProducts.Add(cartProduct);
                await _dbContext.SaveChangesAsync();
                return cartProduct;
            }
        }

        public async Task<CartProduct> AdjustQuantityProduct(int cartId, int productId, int quantity)
        {
            var cartProduct = await _dbContext.CartProducts.FirstOrDefaultAsync(cp => cp.CartId == cartId && cp.ProductId == productId);
            if (cartProduct == null){
                throw new Exception("Cart and product not found!");
            }

            cartProduct.Quantity = quantity;
            await _dbContext.SaveChangesAsync();

            return cartProduct;
            

        }

        public async Task<CartProduct> DeleteProductCard(int cartId, int productId)
        {
            var cartProduct = await _dbContext.CartProducts.FirstOrDefaultAsync(cp => cp.CartId == cartId && cp.ProductId == productId);
            if (cartProduct == null) 
            {
                throw new Exception("Cart and product not found!");
            }
            _dbContext.CartProducts.Remove(cartProduct);
            await _dbContext.SaveChangesAsync();

            return cartProduct;
        }

        public async Task<List<CartProduct>> GetCartProducts(int cartId)
        {
            var cartProducts = await _dbContext.CartProducts
                                    .Include(cp => cp.Product) 
                                        .ThenInclude(p => p.Category) 
                                        .Where(cp => cp.CartId == cartId)
                                    .ToListAsync();

            return cartProducts;
        }

        
    }
}
