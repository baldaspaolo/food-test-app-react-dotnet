
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace app_api.Services.WalletService
{
    public class WalletService : IWalletService
    {
        private readonly DataContext _dbContext;

        public WalletService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Wallet> AddFunds(int userId, Wallet wallet)
        {
            var wallett = await _dbContext.Wallets.FirstOrDefaultAsync(x => x.UserId == userId);
            if (wallett == null)
            {
                return null;
            }
            wallett.Balance = wallet.Balance;
            await _dbContext.SaveChangesAsync();
            return wallett; 
        }

        public async Task<Wallet> CreateAsync(Wallet wallet)
        {
            _dbContext.Wallets.Add(wallet);
            await _dbContext.SaveChangesAsync();
            return wallet;

        }
    }
}
