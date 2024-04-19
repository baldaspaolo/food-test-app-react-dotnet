

namespace app_api.Services.RecipeProductService
{
    public class ReceiptProductService : IRecipeProductService
    {
        private readonly DataContext _dbContext;

        public ReceiptProductService(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ReceiptProduct> AddProductToReceipt(int receiptId, int productId, int quantity)
        {
            ReceiptProduct receiptProduct = new ReceiptProduct
            {
                ReceiptId = receiptId,
                ProductId = productId,
                Quantity = quantity
            };

            _dbContext.ReceiptProducts.Add(receiptProduct);
            await _dbContext.SaveChangesAsync();

            return receiptProduct;
           
            
        }
    }
}
