namespace app_api.Services.RecipeProductService
{
    public interface IRecipeProductService
    {
        Task<ReceiptProduct> AddProductToReceipt(int receiptId, int productId, int quantity);
    }
}
