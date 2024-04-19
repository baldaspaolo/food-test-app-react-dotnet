namespace app_api.Services.ReceiptService
{
    public interface IReceiptService
    {
        Task<Receipt> CreateReceipt(int userId, decimal total);

        Task<Receipt> UpdateReceipt(int receiptId);

        Task<List<Receipt>> GetReceiptList(int userId);

        Task<Receipt> GetReceipt(int receiptId);
    }
}
