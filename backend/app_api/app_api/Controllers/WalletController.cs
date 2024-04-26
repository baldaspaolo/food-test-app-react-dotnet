using app_api.Services.WalletService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace app_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _walletService;

        public WalletController(IWalletService walletService)
        {
            _walletService = walletService;
        }

        [HttpPost]
        public async Task<ActionResult<Wallet>> CreateAsync(Wallet wallet)
        {
            var res = await _walletService.CreateAsync(wallet);
            if (res == null)
            {
                return BadRequest(res);
            }
            return Ok(res);

        }

        [HttpPut]
        public async Task<ActionResult<Wallet>> AddFunds(int userId, Wallet wallet)
        {
            var res = await _walletService.AddFunds(userId, wallet);
            if (res == null)
            {
                return BadRequest(res);
            }
            return Ok(res);
        }
    }
}
