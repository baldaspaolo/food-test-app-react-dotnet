using app_api.Services.RecipeProductService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptProductController : ControllerBase
    {
        private readonly IRecipeProductService _receiptProductService;

        public ReceiptProductController(IRecipeProductService receiptProductService)
        {
            _receiptProductService = receiptProductService;
        }

        [HttpPost]
        public async Task<ActionResult<ReceiptProduct>> AddProductToReceipt(int receiptId, int productId, int quantity)
        {
            var res = await _receiptProductService.AddProductToReceipt(receiptId, productId, quantity); 
            if (res == null) {
            return NotFound();}
            return Ok(res);
        }
    }
}
