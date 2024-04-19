using app_api.Services.ReceiptService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        private readonly IReceiptService _receiptservice;

        public ReceiptController(IReceiptService receiptService)
        {
            _receiptservice = receiptService;
        }

        [HttpPost]
        public async Task<ActionResult<Receipt>> CreateReceipt(int userId, decimal total)
        {
            var result = await _receiptservice.CreateReceipt(userId, total);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("{receiptId}")] 
        public async Task<ActionResult<Receipt>> GetReceipt(int receiptId)
        {
            var result = await _receiptservice.GetReceipt(receiptId);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpGet("list/{userId}")] 
        public async Task<ActionResult<List<Receipt>>> GetReceiptList(int userId)
        {
            var result = await _receiptservice.GetReceiptList(userId);
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}
