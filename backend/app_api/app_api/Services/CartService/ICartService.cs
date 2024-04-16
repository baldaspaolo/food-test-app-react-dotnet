namespace app_api.Services.CartService
{
    public interface ICartService
    {
        Task<Cart> GetUserCart(int id);
    }
}
