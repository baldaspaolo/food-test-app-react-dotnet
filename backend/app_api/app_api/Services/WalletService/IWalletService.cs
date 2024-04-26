namespace app_api.Services.WalletService
{
    public interface IWalletService
    {
        Task<Wallet> CreateAsync(Wallet wallet);

        Task<Wallet> AddFunds(int userId, Wallet wallet);
    }
}
