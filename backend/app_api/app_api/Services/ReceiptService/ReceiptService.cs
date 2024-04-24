

using Microsoft.EntityFrameworkCore;

namespace app_api.Services.ReceiptService
{
    public class ReceiptService : IReceiptService
    {
        public readonly DataContext _dbContext;

        public ReceiptService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Receipt> CreateReceipt(Receipt receipt)
        {
            _dbContext.Receipts.Add(receipt);
           await _dbContext.SaveChangesAsync();
            return receipt;
        }

        public async Task<Receipt> GetReceipt(int receiptId)
        {
            var receipt = await _dbContext.Receipts.Include(r => r.ReceiptProducts)
                .ThenInclude(rp => rp.Product)
                .FirstOrDefaultAsync(r => r.Id == receiptId);

            return receipt;
        }

        public async Task<List<Receipt>> GetReceiptList(int userId)
        {
            var receipt = await _dbContext.Receipts.Where(r => r.userId == userId).Include(r => r.ReceiptProducts).ThenInclude(rp => rp.Product).ToListAsync();
            return receipt;
        }

        public Task<Receipt> UpdateReceipt(int receiptId)
        {
            throw new NotImplementedException();
        }
    }
}
