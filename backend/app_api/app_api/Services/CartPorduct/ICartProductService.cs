namespace app_api.Services.CartPorduct
{
    public interface ICartProductService
    {
        Task<List<CartProduct>> GetCartProducts(int cartId);

        Task<CartProduct> AddProducts(CartProduct cartProduct);

        Task<CartProduct> DeleteProductCard(int cartId, int productId);

        Task<CartProduct> AdjustQuantityProduct(int cartId, int productId, int quantity);

        Task<string> DeleteCartProducts(int cartId);



    }
}
